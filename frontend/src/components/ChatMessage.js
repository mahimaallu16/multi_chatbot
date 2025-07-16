import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Avatar,
  IconButton, 
  Tooltip,
  CircularProgress,
  Fade
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

function formatTimestamp(ts) {
  if (!ts) return '';
  const date = new Date(ts);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function ChatMessage({ role, text, isStreaming, timestamp }) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const isUser = role === 'user';
  const align = isUser ? 'flex-end' : 'flex-start';
  // Use only CSS classes for avatar and bubble colors
  const avatar = isUser ? (
    <Avatar className="user-avatar" sx={{ width: 40, height: 40, boxShadow: 2 }}>
      <PersonIcon />
    </Avatar>
  ) : (
    <Avatar className="bot-avatar" sx={{ width: 40, height: 40, boxShadow: 2 }}>
      <SmartToyIcon />
    </Avatar>
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <Fade in={visible} timeout={600}>
      <Box display="flex" flexDirection="column" alignItems={align} mb={2}>
        <Box display="flex" flexDirection={isUser ? 'row-reverse' : 'row'} alignItems="flex-end" gap={1}>
          {avatar}
          <Box>
            <Box
              className={isUser ? 'user-bubble chat-bubble' : 'bot-bubble chat-bubble'}
              sx={{
                px: 3,
                py: 2,
                borderRadius: isUser ? '22px 22px 6px 22px' : '22px 22px 22px 6px',
                maxWidth: { xs: '90vw', sm: 520 },
                minWidth: 80,
                boxShadow: '0 4px 24px 0 rgba(34,34,34,0.08)',
                wordBreak: 'break-word',
                position: 'relative',
                fontSize: 18,
                fontWeight: 500,
                transition: 'box-shadow 0.2s',
                border: isUser ? 'none' : '1.5px solid #ececf1',
                mb: 0.5,
              }}
            >
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line', fontSize: 18, fontWeight: 500 }}>
                {text}
                {isStreaming && (
                  <CircularProgress size={18} sx={{ ml: 1, verticalAlign: 'middle' }} />
                )}
              </Typography>
              <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 0.5 }}>
                <Tooltip title={copied ? 'Copied!' : 'Copy'} placement="top">
                  <IconButton size="small" onClick={handleCopy} sx={{ color: isUser ? '#fff' : '#222', bgcolor: 'transparent', boxShadow: 1 }}>
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={liked ? 'Liked' : 'Like'} placement="top">
                  <IconButton size="small" color={liked ? 'primary' : 'default'} onClick={() => { setLiked(!liked); setDisliked(false); }} sx={{ bgcolor: 'transparent', boxShadow: 1 }}>
                    <ThumbUpAltIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={disliked ? 'Disliked' : 'Dislike'} placement="top">
                  <IconButton size="small" color={disliked ? 'error' : 'default'} onClick={() => { setDisliked(!disliked); setLiked(false); }} sx={{ bgcolor: 'transparent', boxShadow: 1 }}>
                    <ThumbDownAltIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, ml: isUser ? 'auto' : 0, display: 'block', textAlign: isUser ? 'right' : 'left', opacity: 0.7 }}>
              {formatTimestamp(timestamp)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
} 