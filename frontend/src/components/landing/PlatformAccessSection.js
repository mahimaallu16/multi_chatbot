import React from 'react';
import { Box, Typography, Container, Grid, Paper, Button } from '@mui/material';
import {
  Star as StarIcon,
  Add as AddIcon,
  Psychology as BrainIcon,
  Description as DocIcon,
  Settings as SettingsIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';

const PlatformAccessSection = ({ onGetApp }) => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#fafafa' }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* Left side - Features */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              sx={{
                mb: 3,
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '2.5rem' },
                color: '#1a1a1a',
              }}
            >
              Explore more features in Chatbot App
            </Typography>
            
            <Typography
              variant="h6"
              sx={{
                mb: 6,
                color: '#6b7280',
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              Discover advanced features designed to enhance your AI experience. 
              From personalized settings to powerful integrations, everything you need is just a tap away.
            </Typography>

            {/* Feature Icons */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
              {[
                { icon: <StarIcon sx={{ fontSize: 24, color: '#f59e0b' }} />, label: 'Favorites' },
                { icon: <AddIcon sx={{ fontSize: 24, color: '#10b981' }} />, label: 'Quick Add' },
                { icon: <BrainIcon sx={{ fontSize: 24, color: '#6366f1' }} />, label: 'AI Models' },
                { icon: <DocIcon sx={{ fontSize: 24, color: '#ef4444' }} />, label: 'Documents' },
                { icon: <SettingsIcon sx={{ fontSize: 24, color: '#6b7280' }} />, label: 'Settings' }
              ].map((feature, index) => (
                <Grid item xs={6} sm={4} key={index}>
                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      textAlign: 'center',
                      backgroundColor: '#ffffff',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      }
                    }}
                  >
                    <Box sx={{ mb: 1 }}>
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 500,
                        color: '#1a1a1a',
                        fontSize: '0.75rem',
                      }}
                    >
                      {feature.label}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Right side - Mobile Mockup */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Paper
                elevation={4}
                sx={{
                  width: 280,
                  height: 500,
                  borderRadius: 4,
                  backgroundColor: '#1a1a1a',
                  p: 2,
                  position: 'relative',
                }}
              >
                {/* Phone Screen */}
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 2,
                    backgroundColor: '#ffffff',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Header */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                      Chatbot
                    </Typography>
                    <PhoneIcon sx={{ color: '#6366f1', fontSize: 20 }} />
                  </Box>

                  {/* Chat Interface */}
                  <Box sx={{ flex: 1, backgroundColor: '#f9fafb', borderRadius: 2, p: 2, mb: 2 }}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>You:</Typography>
                      <Typography variant="body2" sx={{ backgroundColor: '#6366f1', color: '#ffffff', p: 1.5, borderRadius: 2, fontSize: '0.75rem' }}>
                        "Hello, how can you help me?"
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>AI:</Typography>
                      <Typography variant="body2" sx={{ backgroundColor: '#e5e7eb', p: 1.5, borderRadius: 2, fontSize: '0.75rem' }}>
                        "I can help you with writing, analysis, coding, and much more!"
                      </Typography>
                    </Box>
                  </Box>

                  {/* Input Area */}
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Box
                      sx={{
                        flex: 1,
                        height: 40,
                        backgroundColor: '#f3f4f6',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        px: 2,
                      }}
                    >
                      <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                        Type a message...
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: '#6366f1',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="caption" sx={{ color: '#ffffff', fontWeight: 600 }}>
                        →
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PlatformAccessSection; 