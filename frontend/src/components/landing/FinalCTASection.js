import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';

const FinalCTASection = ({ onGetStarted }) => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              mb: 4,
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' },
              color: '#ffffff',
              lineHeight: 1.2,
            }}
          >
            Join hundreds of millions of users and try Chatbot App today.
          </Typography>
          
          <Button
            variant="contained"
            size="large"
            onClick={onGetStarted}
            sx={{
              px: 6,
              py: 2,
              fontSize: '1.125rem',
              fontWeight: 600,
              borderRadius: 2,
              backgroundColor: '#ffffff',
              color: '#1a1a1a',
              boxShadow: '0 4px 12px rgba(255, 255, 255, 0.3)',
              '&:hover': {
                backgroundColor: '#f3f4f6',
                boxShadow: '0 6px 20px rgba(255, 255, 255, 0.4)',
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

export default FinalCTASection; 