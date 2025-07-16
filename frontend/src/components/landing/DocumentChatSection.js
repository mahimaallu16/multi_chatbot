import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import {
  PictureAsPdf as PdfIcon,
  Description as WordIcon,
  TableChart as ExcelIcon,
  Code as CodeIcon,
  Slideshow as PresentationIcon,
  InsertDriveFile as FileIcon
} from '@mui/icons-material';

const DocumentChatSection = () => {
  const documentTypes = [
    { icon: <PdfIcon sx={{ fontSize: 32, color: '#888' }} />, name: 'PDF Files' },
    { icon: <WordIcon sx={{ fontSize: 32, color: '#444' }} />, name: 'Word Docs' },
    { icon: <ExcelIcon sx={{ fontSize: 32, color: '#888' }} />, name: 'Excel Sheets' },
    { icon: <CodeIcon sx={{ fontSize: 32, color: '#444' }} />, name: 'Code Files' },
    { icon: <PresentationIcon sx={{ fontSize: 32, color: '#888' }} />, name: 'Presentations' },
    { icon: <FileIcon sx={{ fontSize: 32, color: '#444' }} />, name: 'CSV Files' }
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
          Chat with Any Document
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
          Upload any document and start a conversation. Our AI understands the content 
          and provides intelligent insights, summaries, and answers to your questions.
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {documentTypes.map((docType, index) => (
            <Grid item xs={6} sm={4} md={2} key={index}>
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
                  {docType.icon}
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: '#1a1a1a',
                    fontSize: '0.875rem',
                  }}
                >
                  {docType.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Upload Area Mockup */}
        <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
          <Paper
            elevation={2}
            sx={{
              p: 4,
              borderRadius: 3,
              backgroundColor: '#f9fafb',
              border: '2px dashed #d1d5db',
              textAlign: 'center',
              maxWidth: '400px',
              width: '100%',
            }}
          >
            <Box sx={{ mb: 2 }}>
              <FileIcon sx={{ fontSize: 48, color: '#6b7280' }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 600,
                color: '#1a1a1a',
              }}
            >
              Upload Your Document
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#6b7280',
                lineHeight: 1.6,
              }}
            >
              Drag and drop your file here, or click to browse. 
              Supports PDF, Word, Excel, and more.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default DocumentChatSection; 