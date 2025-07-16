import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, Button } from '@mui/material';
import { 
  Psychology as BrainIcon,
  AutoAwesome as SparklesIcon,
  Diamond as DiamondIcon 
} from '@mui/icons-material';

const TechStackSection = ({ onGetStarted }) => {
  const technologies = [
    {
      icon: <BrainIcon sx={{ fontSize: 48, color: '#6366f1' }} />,
      title: 'Gemini',
      description: 'Advanced language model for intelligent conversations and document analysis.'
    },
    {
      icon: <SparklesIcon sx={{ fontSize: 48, color: '#ef4444' }} />,
      title: 'GPT-4',
      description: 'State-of-the-art AI model for complex reasoning and creative tasks.'
    },
    {
      icon: <DiamondIcon sx={{ fontSize: 48, color: '#3b82f6' }} />,
      title: 'Claude 3',
      description: 'Powerful AI assistant for detailed analysis and comprehensive responses.'
    }
  ];

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
          Built on the latest state-of-the-art AI technologies
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
          Our platform leverages cutting-edge AI models to provide you with the most intelligent 
          and accurate responses for all your needs.
        </Typography>

        <Grid container spacing={4} justifyContent="center" sx={{ mb: 8 }}>
          {technologies.map((tech, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 3,
                  borderRadius: 3,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ mb: 3 }}>
                    {tech.icon}
                  </Box>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 2, 
                      fontWeight: 600,
                      color: '#1a1a1a',
                    }}
                  >
                    {tech.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#6b7280',
                      lineHeight: 1.6,
                    }}
                  >
                    {tech.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
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

export default TechStackSection; 