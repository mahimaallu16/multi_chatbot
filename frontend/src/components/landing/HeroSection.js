import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';

const HeroSection = ({ onGetStarted }) => {
  return (
    <Box
      sx={{
        pt: { xs: 8, md: 12 },
        pb: { xs: 8, md: 16 },
        textAlign: 'center',
        position: 'relative',
        background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', md: '4rem' },
            fontWeight: 800,
            color: '#1a1a1a',
            mb: 3,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          All-in-One AI Chatbot
        </Typography>
        
        <Typography
          variant="h5"
          sx={{
            color: '#6b7280',
            mb: 6,
            maxWidth: '600px',
            mx: 'auto',
            lineHeight: 1.6,
            fontWeight: 400,
            fontSize: { xs: '1.125rem', md: '1.25rem' },
          }}
        >
          Experience the future of AI-powered conversations. Chat with documents, analyze data, 
          and get intelligent answers to all your questions with our advanced AI capabilities.
        </Typography>
        
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
          endIcon={<ArrowForwardIcon />}
        >
          Try Now
        </Button>
      </Container>
    </Box>
  );
};

export default HeroSection; 