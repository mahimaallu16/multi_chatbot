import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import {
  AutoAwesome as TextGenIcon,
  Image as ImageGenIcon,
  Code as CodeIcon,
  Translate as TranslateIcon,
  Summarize as SummarizeIcon,
  Psychology as BrainIcon,
  Analytics as AnalyticsIcon,
  School as LearnIcon,
  Work as WorkIcon,
  Chat as ChatIcon,
  Description as DocIcon,
  Search as SearchIcon
} from '@mui/icons-material';

const AllToolsSection = () => {
  const tools = [
    { icon: <TextGenIcon sx={{ fontSize: 32, color: '#444' }} />, name: 'Text Generation' },
    { icon: <ImageGenIcon sx={{ fontSize: 32, color: '#888' }} />, name: 'Image Generation' },
    { icon: <CodeIcon sx={{ fontSize: 32, color: '#444' }} />, name: 'Code Assistant' },
    { icon: <TranslateIcon sx={{ fontSize: 32, color: '#888' }} />, name: 'Translation' },
    { icon: <SummarizeIcon sx={{ fontSize: 32, color: '#444' }} />, name: 'Summarization' },
    { icon: <BrainIcon sx={{ fontSize: 32, color: '#888' }} />, name: 'AI Analysis' },
    { icon: <AnalyticsIcon sx={{ fontSize: 32, color: '#444' }} />, name: 'Data Analytics' },
    { icon: <LearnIcon sx={{ fontSize: 32, color: '#888' }} />, name: 'Learning Assistant' },
    { icon: <WorkIcon sx={{ fontSize: 32, color: '#444' }} />, name: 'Work Automation' },
    { icon: <ChatIcon sx={{ fontSize: 32, color: '#888' }} />, name: 'Conversational AI' },
    { icon: <DocIcon sx={{ fontSize: 32, color: '#444' }} />, name: 'Document Processing' },
    { icon: <SearchIcon sx={{ fontSize: 32, color: '#888' }} />, name: 'Smart Search' }
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
          All the AI Tools You Need in One Place
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
          From text generation to image creation, code assistance to data analysis - 
          everything you need to boost your productivity and creativity.
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {tools.map((tool, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Paper
                elevation={1}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  textAlign: 'center',
                  backgroundColor: '#fafafa',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                  }
                }}
              >
                <Box sx={{ mb: 2 }}>
                  {tool.icon}
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: '#1a1a1a',
                    fontSize: '0.875rem',
                  }}
                >
                  {tool.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AllToolsSection; 