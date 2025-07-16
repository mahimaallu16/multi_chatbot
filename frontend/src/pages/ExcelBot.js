import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ChatInput from "../components/ChatInput";
import CircularProgress from '@mui/material/CircularProgress';
import ChatMessage from "../components/ChatMessage";
import { Box, Typography, Button, Paper, IconButton, useTheme, useMediaQuery, Tooltip, Tabs, Tab, Select, MenuItem } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TableChartIcon from '@mui/icons-material/TableChart';
import { connectSocket, disconnectSocket, sendMessage, onStreamResponse, offStreamResponse, sendExcelAnalytics, sendExcelCleaning } from "../services/api";

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function ExcelViewerTabs({ files, onRemove, onDownload, onSheetChange, sheetSelections, sheetData }) {
  const [tab, setTab] = useState(0);
  const handleTabChange = (e, newTab) => {
    setTab(newTab);
    if (onSheetChange && files[newTab]?.sheets?.length) {
      onSheetChange(files[newTab].name, files[newTab].sheets[0]);
    }
  };
  const file = files[tab];
  const selectedSheet = sheetSelections[file?.name] || file?.sheets?.[0];
  return (
    <Box>
      <Tabs value={tab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
        {files.map((f, idx) => (
          <Tab key={f.name} label={f.name} />
        ))}
      </Tabs>
      {file && (
        <Box sx={{ p: 2 }}>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <TableChartIcon color="primary" />
            <Typography variant="subtitle1" fontWeight={700}>{file.name}</Typography>
            <Typography variant="body2" color="text.secondary">{formatFileSize(file.size)}</Typography>
            <Typography variant="body2" color="text.secondary">({file.sheets?.length || 1} sheets)</Typography>
            <Tooltip title="Remove file">
              <IconButton size="small" onClick={() => onRemove(file)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Typography variant="body2">Sheet:</Typography>
            <Select
              size="small"
              value={selectedSheet}
              onChange={e => onSheetChange(file.name, e.target.value)}
              sx={{ minWidth: 120 }}
            >
              {file.sheets?.map(sheet => (
                <MenuItem key={sheet} value={sheet}>{sheet}</MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{ border: '1px solid #eee', borderRadius: 2, p: 1, minHeight: 220, bgcolor: 'grey.50', overflowX: 'auto' }}>
            {/* Simple table preview of sheetData[file.name][selectedSheet] */}
            {sheetData[file.name] && sheetData[file.name][selectedSheet] ? (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
                <tbody>
                  {sheetData[file.name][selectedSheet].map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td key={j} style={{ border: '1px solid #e0e7ff', padding: 6, background: i === 0 ? '#f3e8ff' : '#fff', fontWeight: i === 0 ? 700 : 400 }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <Typography color="text.secondary">No data to display.</Typography>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}

const suggestedQuestions = [
  "Summarize this spreadsheet",
  "What are the key trends in the data?",
  "Find anomalies or outliers in the sheet"
];

export default function ExcelBot({ mode, setMode }) {
  const [selectedSegment, setSelectedSegment] = useState(3);
  const [messages, setMessages] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [sheetSelections, setSheetSelections] = useState({});
  const [sheetData, setSheetData] = useState({});
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [showScrollDown, setShowScrollDown] = useState(false);

  useEffect(() => {
    const chatBox = chatEndRef.current?.parentElement;
    if (chatBox) {
      const handleScroll = () => {
        setShowScrollDown(chatBox.scrollHeight - chatBox.scrollTop - chatBox.clientHeight > 120);
      };
      chatBox.addEventListener('scroll', handleScroll);
      return () => chatBox.removeEventListener('scroll', handleScroll);
    }
  }, [messages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    connectSocket();
    onStreamResponse((data) => {
      if (data.role === 'bot') {
        setMessages(prev => {
          const updated = [...prev];
          const lastMessage = updated[updated.length - 1];
          if (lastMessage && lastMessage.role === 'bot') {
            lastMessage.text = data.content;
            lastMessage.isStreaming = !data.is_complete;
          } else {
            const newMessage = {
              id: Date.now() + Math.random(),
              role: data.role,
              text: data.content,
              botType: data.bot_type,
              isStreaming: !data.is_complete
            };
            updated.push(newMessage);
          }
          return updated;
        });
      }
    });
    return () => {
      offStreamResponse();
      disconnectSocket();
    };
  }, []);

  const handleSend = async (input) => {
    if (!input.trim() || uploadedFiles.length === 0 || loading) return;
    // For multi-file, send the currently selected file (first tab)
    const selectedFileObj = uploadedFiles[0]?.file;
    const userMessage = {
      id: Date.now() + Math.random(),
      role: 'user',
      text: input,
      botType: 'excel',
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    await sendMessage('excel', input, selectedFileObj);
      setLoading(false);
  };

  const handleFileUpload = (files) => {
    if (!files || files.length === 0) return;
    // For demo, fake sheets and data
    const newFiles = Array.from(files).map(file => ({
      file: file,
      name: file.name,
      size: file.size,
      sheets: ["Sheet1", "Sheet2"],
      uploadedAt: new Date().toISOString()
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
    // Fake sheet data
    setSheetData(prev => {
      const newData = { ...prev };
      newFiles.forEach(f => {
        newData[f.name] = {
          Sheet1: [["A", "B", "C"], [1, 2, 3], [4, 5, 6]],
          Sheet2: [["X", "Y"], [7, 8], [9, 10]]
        };
      });
      return newData;
    });
    setSheetSelections(prev => {
      const newSel = { ...prev };
      newFiles.forEach(f => { newSel[f.name] = f.sheets[0]; });
      return newSel;
    });
  };

  const handleRemoveFile = (fileToRemove) => {
    setUploadedFiles(prev => prev.filter(f => f.name !== fileToRemove.name));
    setSheetData(prev => {
      const newData = { ...prev };
      delete newData[fileToRemove.name];
      return newData;
    });
    setSheetSelections(prev => {
      const newSel = { ...prev };
      delete newSel[fileToRemove.name];
      return newSel;
    });
  };

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    if (files) {
      handleFileUpload(files);
    }
    event.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleSheetChange = (fileName, sheetName) => {
    setSheetSelections(prev => ({ ...prev, [fileName]: sheetName }));
  };

  // Add analytics and cleaning triggers
  const handleAnalytics = () => {
    if (!uploadedFiles.length) return;
    const file = uploadedFiles[0];
    const sheet = sheetSelections[file.name] || file.sheets[0];
    setLoading(true);
    setMessages(prev => [...prev, {
      id: Date.now() + Math.random(),
      role: 'user',
      text: `Run analytics on sheet: ${sheet}`,
      botType: 'excel',
      timestamp: new Date().toISOString()
    }]);
    sendExcelAnalytics(sheet, 'comprehensive');
  };
  const handleCleaning = () => {
    if (!uploadedFiles.length) return;
    const file = uploadedFiles[0];
    const sheet = sheetSelections[file.name] || file.sheets[0];
    setLoading(true);
    setMessages(prev => [...prev, {
      id: Date.now() + Math.random(),
      role: 'user',
      text: `Clean data on sheet: ${sheet}`,
      botType: 'excel',
      timestamp: new Date().toISOString()
    }]);
    // Example: remove duplicates and fill missing values
    sendExcelCleaning(['remove_duplicates', 'fill_missing_values'], sheet);
  };

  // Upload area before any files are uploaded
  if (uploadedFiles.length === 0) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Sidebar selectedSegment={selectedSegment} onSegmentSelect={setSelectedSegment} mode={mode} setMode={setMode} />
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', p: 3 }}>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h3" fontWeight={800} sx={{ mb: 1 }}>
              Chat with any <Box component="span" sx={{ color: '#22d3ee', bgcolor: '#e0f2fe', px: 1.5, borderRadius: 2, ml: 1 }}>Excel</Box>
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
              Instantly analyze, summarize, and chat with your spreadsheets using AI
            </Typography>
          </Box>
          <Paper
            elevation={dragActive ? 8 : 3}
            sx={{
              border: '2px dashed',
              borderColor: dragActive ? '#22d3ee' : 'primary.light',
              bgcolor: dragActive ? '#e0f2fe' : 'background.paper',
              borderRadius: 4,
              p: 6,
              minWidth: { xs: 320, sm: 420, md: 540 },
              textAlign: 'center',
              transition: 'all 0.2s',
              position: 'relative',
              mb: 2
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <CloudUploadIcon sx={{ fontSize: 56, color: dragActive ? '#22d3ee' : 'primary.main', mb: 2 }} />
            <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
              Click to upload, or drag Excel file here
        </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Drag & drop your Excel file here
        </Typography>
        <Button
          variant="contained"
              color="secondary"
              size="large"
              sx={{ px: 4, py: 1.5, fontWeight: 700, borderRadius: 3 }}
          onClick={() => fileInputRef.current?.click()}
        >
              Upload Excel
        </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xls,.xlsx,.csv"
              multiple
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
            />
          </Paper>
        </Box>
      </Box>
    );
  }

  // Main chat interface after upload
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'row', bgcolor: 'background.default' }}>
      {/* Sidebar */}
      <Sidebar selectedSegment={selectedSegment} onSegmentSelect={setSelectedSegment} mode={mode} setMode={setMode} />
      {/* Left: Excel Data Panel */}
      <Box
        sx={{
          flex: '0 0 40%',
          width: '40%',
          minWidth: 0,
          maxWidth: '480px',
          borderRight: '1.5px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          height: '100vh',
          overflowY: 'auto',
        }}
      >
        <ExcelViewerTabs files={uploadedFiles} onRemove={handleRemoveFile} onSheetChange={handleSheetChange} sheetSelections={sheetSelections} sheetData={sheetData} />
              </Box>
      {/* Right: Chat Bot UI */}
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          maxWidth: '100%',
          p: { xs: 1, md: 3 },
          bgcolor: 'background.default',
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        {/* Analytics & Cleaning Controls */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Button variant="contained" color="info" onClick={handleAnalytics} disabled={loading || !uploadedFiles.length}>
            Run Analytics
          </Button>
          <Button variant="contained" color="success" onClick={handleCleaning} disabled={loading || !uploadedFiles.length}>
            Clean Data
          </Button>
            </Box>
        {/* File context */}
        {uploadedFiles.length > 0 && (
          <Paper elevation={0} sx={{ p: 1.5, mb: 2, borderRadius: 2, bgcolor: 'background.paper', display: 'flex', alignItems: 'center', gap: 1, boxShadow: '0 2px 12px 0 rgba(34,211,238,0.06)' }}>
            <TableChartIcon color="primary" />
            <Typography variant="body2" fontWeight={600} sx={{ mr: 1 }}>
              Chatting about: {uploadedFiles.map(f => f.name).join(', ')}
                </Typography>
          </Paper>
        )}
        {/* Welcome and suggested questions */}
        {messages.length === 0 && (
          <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, mb: 2, borderRadius: 3, bgcolor: 'background.paper', boxShadow: '0 2px 12px 0 rgba(34,211,238,0.06)' }}>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
              Welcome!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Upload an Excel file and ask any question about its content. Try one of these:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
              {suggestedQuestions.map((q, i) => (
                <Button key={i} variant="outlined" color="secondary" sx={{ justifyContent: 'flex-start', fontWeight: 600, borderRadius: 2, boxShadow: '0 2px 8px 0 rgba(34,211,238,0.04)' }} onClick={() => handleSend(q)}>
                  {q}
                </Button>
              ))}
            </Box>
          </Paper>
        )}
        {/* Chat messages */}
        <Box sx={{ flex: 1, overflowY: 'auto', mb: 2, px: 1, position: 'relative', bgcolor: 'rgba(224, 242, 254, 0.7)', borderRadius: 4, boxShadow: '0 4px 32px 0 rgba(34,211,238,0.08)', backdropFilter: 'blur(2px)', border: '1.5px solid #bae6fd' }}>
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              role={msg.role}
              text={msg.text}
              isStreaming={msg.isStreaming}
              timestamp={msg.timestamp}
            />
          ))}
            {loading && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
              <Box sx={{ display: 'inline-block', width: 32, height: 16, position: 'relative' }}>
                {[0, 1, 2].map(i => (
                  <Box key={i} sx={{
                    display: 'inline-block',
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#22d3ee',
                    position: 'absolute',
                    left: `${i * 12}px`,
                    animation: `typing-bounce 1.2s infinite ${i * 0.2}s`
                  }} />
                ))}
              </Box>
              <Typography variant="body2" color="text.secondary">The bot is thinking...</Typography>
              </Box>
            )}
            <div ref={chatEndRef} />
          {showScrollDown && (
            <Tooltip title="Scroll to latest">
              <IconButton
                sx={{ position: 'absolute', bottom: 24, right: 24, bgcolor: '#fff', boxShadow: '0 4px 24px 0 #22d3ee44', border: '2px solid #22d3ee', color: '#22d3ee', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: '0 8px 32px 0 #22d3ee66', bgcolor: '#e0f2fe' } }}
                onClick={() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })}
              >
                <ArrowDownwardIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        {/* Chat input */}
        <Box sx={{ borderTop: '1.5px solid', borderColor: 'divider', pt: 2, pb: 1, px: 1, bgcolor: '#fff', borderRadius: 4, boxShadow: '0 2px 12px 0 rgba(34,211,238,0.08)', position: 'sticky', bottom: 0, zIndex: 10, mt: 1 }}>
            <ChatInput 
              onSend={handleSend} 
              onFileUpload={handleFileUpload} 
            disabled={loading}
            placeholder="Ask any question about your Excel..."
            />
        </Box>
      </Box>
    </Box>
  );
}
