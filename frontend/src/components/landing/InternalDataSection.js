import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import { AccountTree as NetworkIcon } from '@mui/icons-material';

const InternalDataSection = () => {
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
          Connect your Internal company data
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
          Securely integrate with your company's internal databases, APIs, and data sources. 
          Get AI-powered insights from your own business data while maintaining complete privacy.
        </Typography>

        {/* Data Flow Visualization */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
          <Paper
            elevation={2}
            sx={{
              p: 4,
              borderRadius: 3,
              backgroundColor: '#ffffff',
              maxWidth: '600px',
              width: '100%',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <NetworkIcon sx={{ fontSize: 48, color: '#6366f1' }} />
            </Box>
            
            {/* Data Flow Diagram */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              {/* Data Sources */}
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 2,
                    backgroundColor: '#10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  DB
                </Box>
                <Typography variant="caption" sx={{ color: '#6b7280' }}>
                  Database
                </Typography>
              </Box>

              {/* Connection Line */}
              <Box
                sx={{
                  flex: 1,
                  height: 2,
                  backgroundColor: '#e5e7eb',
                  mx: 2,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    right: 0,
                    top: -3,
                    width: 0,
                    height: 0,
                    borderLeft: '8px solid #e5e7eb',
                    borderTop: '4px solid transparent',
                    borderBottom: '4px solid transparent',
                  }
                }}
              />

              {/* AI Processing */}
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 2,
                    backgroundColor: '#6366f1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  AI
                </Box>
                <Typography variant="caption" sx={{ color: '#6b7280' }}>
                  AI Processing
                </Typography>
              </Box>

              {/* Connection Line */}
              <Box
                sx={{
                  flex: 1,
                  height: 2,
                  backgroundColor: '#e5e7eb',
                  mx: 2,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    right: 0,
                    top: -3,
                    width: 0,
                    height: 0,
                    borderLeft: '8px solid #e5e7eb',
                    borderTop: '4px solid transparent',
                    borderBottom: '4px solid transparent',
                  }
                }}
              />

              {/* Results */}
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 2,
                    backgroundColor: '#f59e0b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  📊
                </Box>
                <Typography variant="caption" sx={{ color: '#6b7280' }}>
                  Insights
                </Typography>
              </Box>
            </Box>

            {/* Additional Data Sources */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              {[
                { color: '#ef4444', label: 'APIs' },
                { color: '#8b5cf6', label: 'Files' },
                { color: '#06b6d4', label: 'Cloud' }
              ].map((source, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 2,
                    backgroundColor: source.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                  }}
                >
                  {source.label}
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>

        {/* Features List */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ maxWidth: '500px', textAlign: 'center' }}>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontWeight: 600,
                color: '#1a1a1a',
              }}
            >
              Secure & Private Integration
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#6b7280',
                lineHeight: 1.6,
                mb: 2,
              }}
            >
              • End-to-end encryption for all data transfers
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#6b7280',
                lineHeight: 1.6,
                mb: 2,
              }}
            >
              • SOC 2 Type II compliance
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#6b7280',
                lineHeight: 1.6,
                mb: 2,
              }}
            >
              • No data retention beyond processing
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#6b7280',
                lineHeight: 1.6,
              }}
            >
              • Enterprise-grade security protocols
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default InternalDataSection; 