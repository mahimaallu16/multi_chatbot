import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ChatInput from "../components/ChatInput";
import CircularProgress from '@mui/material/CircularProgress';
import ChatMessage from "../components/ChatMessage";
import { Box, Typography, Paper, IconButton, useTheme, useMediaQuery, Tooltip, Button } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { connectSocket, disconnectSocket, sendMessage, onStreamResponse, offStreamResponse } from "../services/api";

const suggestedQuestions = [
  "Summarize this notebook.",
  "What does this code cell do?",
  "Find errors in my notebook."
];

export default function NotebookBot({ mode, setMode }) {
  const [selectedSegment, setSelectedSegment] = useState(4);
  const [messages, setMessages] = useState([]);
  const [notebookFile, setNotebookFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [showScrollDown, setShowScrollDown] = useState(false);

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

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNotebookFile(e.target.files[0]);
      setMessages([]);
    }
  };

  const handleSend = async (input) => {
    if (!input.trim() || !notebookFile) return;
    const userMessage = {
      id: Date.now() + Math.random(),
      role: 'user',
      text: input,
      botType: 'notebook',
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    await sendMessage('notebook', input, notebookFile);
    setLoading(false);
  };

  // Welcome and file upload
  if (!notebookFile) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Sidebar selectedSegment={selectedSegment} onSegmentSelect={setSelectedSegment} mode={mode} setMode={setMode} />
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', p: 3 }}>
          <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 4, bgcolor: 'background.paper', boxShadow: '0 4px 32px 0 rgba(99,102,241,0.10)', mb: 4, textAlign: 'center', maxWidth: 480 }}>
            <Typography variant="h3" fontWeight={800} sx={{ mb: 1 }}>
              Welcome to <Box component="span" sx={{ color: '#10b981', bgcolor: '#d1fae5', px: 1.5, borderRadius: 2, ml: 1 }}>Notebook Bot</Box>
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
              Please upload a Jupyter Notebook file to start chatting.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{ px: 4, py: 1.5, fontWeight: 700, borderRadius: 3 }}
              component="label"
            >
              Upload Notebook
              <input
                type="file"
                accept=".ipynb"
                hidden
                onChange={handleFileUpload}
              />
            </Button>
          </Paper>
        </Box>
      </Box>
    );
  }

  // Welcome and suggested questions
  if (messages.length === 0) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Sidebar selectedSegment={selectedSegment} onSegmentSelect={setSelectedSegment} mode={mode} setMode={setMode} />
        <Box sx={{ flex: 1, display: 'flex', flexDirection: isMobile ? 'column' : 'row', height: '100vh', bgcolor: 'background.default' }}>
          {/* Left: Notebook preview/context */}
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
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center', opacity: 0.6 }}>
              (Notebook preview coming soon)
            </Typography>
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
            {/* Chat messages */}
            <Box sx={{ flex: 1, overflowY: 'auto', mb: 2, px: 1, position: 'relative', bgcolor: 'rgba(209, 250, 229, 0.7)', borderRadius: 4, boxShadow: '0 4px 32px 0 rgba(16,185,129,0.08)', backdropFilter: 'blur(2px)', border: '1.5px solid #6ee7b7' }}>
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
                Start asking questions about your notebook! Try one of these:
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2, mt: 2, alignItems: 'center' }}>
                {suggestedQuestions.map((q, i) => (
                  <Button key={i} variant="outlined" color="secondary" sx={{ justifyContent: 'flex-start', fontWeight: 600, borderRadius: 2, boxShadow: '0 2px 8px 0 rgba(16,185,129,0.04)', minWidth: 320 }} onClick={() => handleSend(q)}>
                    {q}
                  </Button>
                ))}
              </Box>
            </Box>
            {/* Chat input */}
            <Box sx={{ borderTop: '1.5px solid', borderColor: 'divider', pt: 2, pb: 1, px: 1, bgcolor: '#fff', borderRadius: 4, boxShadow: '0 2px 12px 0 rgba(16,185,129,0.08)', position: 'sticky', bottom: 0, zIndex: 10, mt: 1 }}>
              <ChatInput 
                onSend={handleSend} 
                onFileUpload={handleFileUpload} 
                disabled={loading}
                placeholder="Ask me to analyze your Jupyter notebook..."
              />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  // Main chat interface
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Sidebar selectedSegment={selectedSegment} onSegmentSelect={setSelectedSegment} mode={mode} setMode={setMode} />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: isMobile ? 'column' : 'row', height: '100vh', bgcolor: 'background.default' }}>
        {/* Left: Notebook preview/context */}
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
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center', opacity: 0.6 }}>
            (Notebook preview coming soon)
          </Typography>
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
          {/* Chat messages */}
          <Box sx={{ flex: 1, overflowY: 'auto', mb: 2, px: 1, position: 'relative', bgcolor: 'rgba(209, 250, 229, 0.7)', borderRadius: 4, boxShadow: '0 4px 32px 0 rgba(16,185,129,0.08)', backdropFilter: 'blur(2px)', border: '1.5px solid #6ee7b7' }}>
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
                      background: '#10b981',
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
                  sx={{ position: 'absolute', bottom: 24, right: 24, bgcolor: '#fff', boxShadow: '0 4px 24px 0 #10b98144', border: '2px solid #10b981', color: '#10b981', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: '0 8px 32px 0 #10b98166', bgcolor: '#d1fae5' } }}
                  onClick={() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <ArrowDownwardIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
          {/* Chat input */}
          <Box sx={{ borderTop: '1.5px solid', borderColor: 'divider', pt: 2, pb: 1, px: 1, bgcolor: '#fff', borderRadius: 4, boxShadow: '0 2px 12px 0 rgba(16,185,129,0.08)', position: 'sticky', bottom: 0, zIndex: 10, mt: 1 }}>
            <ChatInput 
              onSend={handleSend} 
              onFileUpload={handleFileUpload} 
              disabled={loading}
              placeholder="Ask me to analyze your Jupyter notebook..."
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
