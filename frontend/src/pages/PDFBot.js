import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ChatInput from "../components/ChatInput";
import CircularProgress from '@mui/material/CircularProgress';
import ChatMessage from "../components/ChatMessage";
import { Box, Typography, Button, Paper, IconButton, useTheme, useMediaQuery, Tooltip } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Document, Page, pdfjs } from 'react-pdf';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// Use local worker file for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.js`;

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function PDFViewerTabs({ files, onRemove, onDownload }) {
  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState({});

  const handleTabChange = (e, newTab) => {
    setTab(newTab);
    setPage(1);
  };

  const file = files[tab];

  return (
    <Box>
      <Tabs value={tab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
        {files.map((f, idx) => (
          <Tab key={f.name} label={f.name} />
        ))}
      </Tabs>
      <Box sx={{ p: 2 }}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <InsertDriveFileIcon color="primary" />
          <Typography variant="subtitle1" fontWeight={700}>{file.name}</Typography>
          <Typography variant="body2" color="text.secondary">{formatFileSize(file.size)}</Typography>
          {numPages[file.name] && (
            <Typography variant="body2" color="text.secondary">
              ({numPages[file.name]} pages)
            </Typography>
          )}
          <Tooltip title="Remove file">
            <IconButton size="small" onClick={() => onRemove(file)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <IconButton
            size="small"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography>
            Page{' '}
            <input
              type="number"
              min={1}
              max={numPages[file.name] || 1}
              value={page}
              onChange={(e) => setPage(Number(e.target.value))}
              style={{ width: 40, textAlign: 'center' }}
            />{' '}
            / {numPages[file.name] || 1}
          </Typography>
          <IconButton
            size="small"
            onClick={() => setPage((p) => Math.min(numPages[file.name] || 1, p + 1))}
            disabled={page >= (numPages[file.name] || 1)}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Box>
        <Box sx={{ border: '1px solid #eee', borderRadius: 2, p: 1, minHeight: 320, bgcolor: 'grey.50' }}>
          <Document
            file={file.file}
            onLoadSuccess={({ numPages: n }) =>
              setNumPages((prev) => ({ ...prev, [file.name]: n }))
            }
            loading={<Typography>Loading PDF...</Typography>}
          >
            <Page pageNumber={page} width={220} />
          </Document>
        </Box>
      </Box>
    </Box>
  );
}

const suggestedQuestions = [
  "Summarize this guide for building AI agents",
  "What skills do I need to start creating AI agents?",
  "How do AI agents differ from traditional software?"
];

export default function PDFBot({ mode, setMode }) {
  const [selectedSegment, setSelectedSegment] = useState(1);
  const [messages, setMessages] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
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

  const handleSend = async (input) => {
    if (!input.trim() || uploadedFiles.length === 0) return;
    const userMessage = {
      id: Date.now() + Math.random(),
      role: 'user',
      text: input,
      botType: 'pdf',
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setError(null);
    // Simulate bot response for demo
    setTimeout(() => {
      setMessages(prev => [...prev, {
          id: Date.now() + Math.random(),
          role: 'bot',
        text: `This is a sample answer to: "${input}"`,
          botType: 'pdf',
        timestamp: new Date().toISOString(),
          isStreaming: false
      }]);
    setLoading(false);
    }, 1200);
  };

  const handleFileUpload = (files) => {
    if (!files || files.length === 0) return;
        const newFiles = Array.from(files).map(file => ({
          file: file,
          name: file.name,
          size: file.size,
          uploadedAt: new Date().toISOString()
        }));
        setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (fileToRemove) => {
    setUploadedFiles(prev => prev.filter(f => f.name !== fileToRemove.name));
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

  // Upload area before any files are uploaded
    if (uploadedFiles.length === 0) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Sidebar selectedSegment={selectedSegment} onSegmentSelect={setSelectedSegment} mode={mode} setMode={setMode} />
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', p: 3 }}>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h3" fontWeight={800} sx={{ mb: 1 }}>
              Chat with any <Box component="span" sx={{ color: '#a259ff', bgcolor: '#f3e8ff', px: 1.5, borderRadius: 2, ml: 1 }}>PDF</Box>
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
              Join millions of <Box component="span" sx={{ color: '#f59e42', fontWeight: 600 }}>students, researchers and professionals</Box> to instantly answer questions and understand research with AI
            </Typography>
          </Box>
          <Paper
            elevation={dragActive ? 8 : 3}
            sx={{
              border: '2px dashed',
              borderColor: dragActive ? '#a259ff' : 'primary.light',
              bgcolor: dragActive ? '#faf5ff' : 'background.paper',
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
            <CloudUploadIcon sx={{ fontSize: 56, color: dragActive ? '#a259ff' : 'primary.main', mb: 2 }} />
            <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
              Click to upload, or drag PDF here
        </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Drag & drop your PDF file here
        </Typography>
        <Button
          variant="contained"
              color="secondary"
              size="large"
              sx={{ px: 4, py: 1.5, fontWeight: 700, borderRadius: 3 }}
              onClick={() => fileInputRef.current?.click()}
            >
              Upload PDF
        </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
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
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Sidebar selectedSegment={selectedSegment} onSegmentSelect={setSelectedSegment} mode={mode} setMode={setMode} />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: isMobile ? 'column' : 'row', height: '100vh', bgcolor: 'background.default' }}>
        {/* Left: PDF Viewer */}
        <Box
          sx={{
            flex: isMobile ? 'none' : '0 0 40%',
            width: isMobile ? '100%' : '40%',
            minWidth: 0,
            maxWidth: isMobile ? '100%' : '480px',
            borderRight: isMobile ? 'none' : '1.5px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
          }}
        >
          <PDFViewerTabs files={uploadedFiles} onRemove={handleRemoveFile} />
        </Box>
        {/* Right: Chat Interface */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            maxWidth: isMobile ? '100%' : '800px',
            p: { xs: 1, md: 3 },
            bgcolor: 'background.default',
            margin: isMobile ? 0 : '0 auto',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          {/* File context */}
        {uploadedFiles.length > 0 && (
            <Paper elevation={0} sx={{ p: 1.5, mb: 2, borderRadius: 2, bgcolor: 'background.paper', display: 'flex', alignItems: 'center', gap: 1, boxShadow: '0 2px 12px 0 rgba(99,102,241,0.06)' }}>
              <InsertDriveFileIcon color="primary" />
              <Typography variant="body2" fontWeight={600} sx={{ mr: 1 }}>
                Chatting about: {uploadedFiles.map(f => f.name).join(', ')}
              </Typography>
            </Paper>
          )}
          {/* Welcome and suggested questions */}
          {messages.length === 0 && (
            <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, mb: 2, borderRadius: 3, bgcolor: 'background.paper', boxShadow: '0 2px 12px 0 rgba(99,102,241,0.06)' }}>
              <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
                Welcome!
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Upload a PDF and ask any question about its content. Try one of these:
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                {suggestedQuestions.map((q, i) => (
                  <Button key={i} variant="outlined" color="secondary" sx={{ justifyContent: 'flex-start', fontWeight: 600, borderRadius: 2, boxShadow: '0 2px 8px 0 rgba(99,102,241,0.04)' }} onClick={() => handleSend(q)}>
                    {q}
                  </Button>
                ))}
            </Box>
          </Paper>
        )}
          {/* Chat messages */}
          <Box sx={{ flex: 1, overflowY: 'auto', mb: 2, px: 1, position: 'relative', bgcolor: 'rgba(243, 244, 255, 0.7)', borderRadius: 4, boxShadow: '0 4px 32px 0 rgba(99,102,241,0.08)', backdropFilter: 'blur(2px)', border: '1.5px solid #e0e7ff' }}>
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
                      background: '#a259ff',
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
                  sx={{ position: 'absolute', bottom: 24, right: 24, bgcolor: '#fff', boxShadow: '0 4px 24px 0 #a259ff44', border: '2px solid #a259ff', color: '#a259ff', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: '0 8px 32px 0 #a259ff66', bgcolor: '#f3e8ff' } }}
                  onClick={() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <ArrowDownwardIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
          {/* Chat input */}
          <Box sx={{ borderTop: '1.5px solid', borderColor: 'divider', pt: 2, pb: 1, px: 1, bgcolor: '#fff', borderRadius: 4, boxShadow: '0 2px 12px 0 rgba(99,102,241,0.08)', position: 'sticky', bottom: 0, zIndex: 10, mt: 1 }}>
            <ChatInput 
              onSend={handleSend} 
              onFileUpload={handleFileUpload} 
              disabled={loading}
              placeholder="Ask any question about your PDF..."
            />
          </Box>
        </Box>
      </Box>
            </Box>
  );
}
