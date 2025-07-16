import React from 'react';
import { Box, Typography, Container, Grid, Paper, Button } from '@mui/material';
import { 
  Check as CheckIcon,
  Refresh as RefreshIcon,
  Mic as MicIcon,
  ContentCopy as CopyIcon,
  ThumbUp as ThumbUpIcon,
  Share as ShareIcon,
  Save as SaveIcon
} from '@mui/icons-material';

const FeatureHighlightsSection = ({ onGetStarted }) => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#ffffff' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            mb: 3,
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '2.5rem' },
            color: '#1a1a1a',
          }}
        >
          Affordable Pricing & Amazing Features
        </Typography>
        
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            mb: 8,
            color: '#6b7280',
            maxWidth: '600px',
            mx: 'auto',
            lineHeight: 1.6,
            fontWeight: 400,
          }}
        >
          Get access to powerful AI features at competitive prices. 
          Everything you need to boost your productivity and creativity.
        </Typography>

        <Grid container spacing={3} sx={{ mb: 8 }}>
          {/* Top Row - Pricing Table */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: '#ffffff',
                height: '100%',
              }}
            >
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#1a1a1a' }}>
                Model Pricing
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, pb: 2, borderBottom: '1px solid #e5e7eb' }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>Model</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>Price</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>Tokens</Typography>
              </Box>
              {[
                { model: 'GPT-4', price: '$0.03', tokens: '1K' },
                { model: 'Claude 3', price: '$0.02', tokens: '1K' },
                { model: 'Gemini', price: '$0.01', tokens: '1K' }
              ].map((item, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">{item.model}</Typography>
                  <Typography variant="body2">{item.price}</Typography>
                  <Typography variant="body2">{item.tokens}</Typography>
                </Box>
              ))}
            </Paper>
          </Grid>

          {/* Top Row - Chat Interface */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: '#f9fafb',
                height: '100%',
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>User:</Typography>
                <Typography variant="body2" sx={{ backgroundColor: '#ffffff', p: 2, borderRadius: 2 }}>
                  "What's the weather like today?"
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>AI:</Typography>
                <Typography variant="body2" sx={{ backgroundColor: '#e5e7eb', p: 2, borderRadius: 2, mb: 2 }}>
                  "I don't have access to real-time weather data..."
                </Typography>
                <Typography variant="caption" sx={{ color: '#6b7280' }}>
                  706 tokens used
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Middle Row */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: '#f9fafb',
                height: '100%',
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>User:</Typography>
                <Typography variant="body2" sx={{ backgroundColor: '#ffffff', p: 2, borderRadius: 2 }}>
                  "Explain quantum computing"
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <RefreshIcon sx={{ color: '#6b7280', fontSize: 20, cursor: 'pointer' }} />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: '#f9fafb',
                height: '100%',
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>User:</Typography>
                <Typography variant="body2" sx={{ backgroundColor: '#ffffff', p: 2, borderRadius: 2 }}>
                  "Write a poem about AI"
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: '#3b82f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <MicIcon sx={{ color: '#ffffff', fontSize: 18 }} />
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: '#f9fafb',
                height: '100%',
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>User:</Typography>
                <Typography variant="body2" sx={{ backgroundColor: '#ffffff', p: 2, borderRadius: 2 }}>
                  "Summarize this article"
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <CopyIcon sx={{ color: '#6b7280', fontSize: 20, cursor: 'pointer' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Bottom Row */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: '#f9fafb',
                height: '100%',
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>User:</Typography>
                <Typography variant="body2" sx={{ backgroundColor: '#ffffff', p: 2, borderRadius: 2 }}>
                  "Help me debug this code"
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <ThumbUpIcon sx={{ color: '#10b981', fontSize: 20, cursor: 'pointer' }} />
                <ThumbUpIcon sx={{ color: '#6b7280', fontSize: 20, cursor: 'pointer', transform: 'rotate(180deg)' }} />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: '#f9fafb',
                height: '100%',
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>User:</Typography>
                <Typography variant="body2" sx={{ backgroundColor: '#ffffff', p: 2, borderRadius: 2 }}>
                  "Create a business plan"
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ShareIcon sx={{ color: '#6b7280', fontSize: 20, cursor: 'pointer' }} />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: '#f9fafb',
                height: '100%',
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>User:</Typography>
                <Typography variant="body2" sx={{ backgroundColor: '#ffffff', p: 2, borderRadius: 2 }}>
                  "Analyze this data"
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <SaveIcon sx={{ color: '#6b7280', fontSize: 20, cursor: 'pointer' }} />
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={onGetStarted}
            sx={{
              px: 4,
              py: 2,
              fontSize: '1.125rem',
              fontWeight: 600,
              borderRadius: 2,
              backgroundColor: '#1a1a1a',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(26, 26, 26, 0.3)',
              '&:hover': {
                backgroundColor: '#000000',
                boxShadow: '0 6px 20px rgba(26, 26, 26, 0.4)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Try Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FeatureHighlightsSection; 