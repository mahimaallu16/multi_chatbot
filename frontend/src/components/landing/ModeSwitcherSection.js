import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';

const ModeSwitcherSection = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#fafafa' }}>
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
          Switch between different AI models, easily.
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
          Choose the perfect AI model for your specific needs. Switch seamlessly between 
          different models to get the best results for any task.
        </Typography>

        {/* Visual Mockup */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Paper
            elevation={2}
            sx={{
              p: 4,
              borderRadius: 3,
              backgroundColor: '#ffffff',
              maxWidth: '500px',
              width: '100%',
            }}
          >
            {/* Model Selector */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'center' }}>
              {[
                { color: '#ef4444', label: 'GPT-4' },
                { color: '#f59e0b', label: 'Claude' },
                { color: '#10b981', label: 'Gemini' },
                { color: '#3b82f6', label: 'Custom' }
              ].map((model, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 2,
                    backgroundColor: model.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    }
                  }}
                >
                  {model.label}
                </Box>
              ))}
            </Box>

            {/* Chat Interface Mockup */}
            <Box
              sx={{
                border: '1px solid #e5e7eb',
                borderRadius: 2,
                p: 3,
                backgroundColor: '#f9fafb',
                minHeight: '120px',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: '#6b7280',
                  fontStyle: 'italic',
                  textAlign: 'center',
                  lineHeight: 1.6,
                }}
              >
                Type your message here...
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default ModeSwitcherSection; 