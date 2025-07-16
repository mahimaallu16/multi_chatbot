import React from 'react';
import { Box, Typography, Container, Grid, Link } from '@mui/material';

const LandingFooter = () => {
  const footerLinks = {
    Products: [
      'Features',
      'Pricing',
      'API',
      'Integrations',
      'Changelog'
    ],
    Company: [
      'About',
      'Blog',
      'Careers',
      'Press',
      'Contact'
    ],
    Resources: [
      'Documentation',
      'Help Center',
      'Community',
      'Tutorials',
      'Support'
    ],
    Legal: [
      'Privacy Policy',
      'Terms of Service',
      'Cookie Policy',
      'GDPR',
      'Security'
    ]
  };

  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        backgroundColor: '#111827',
        color: '#ffffff',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: '#ffffff',
              }}
            >
              Chatbot
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#9ca3af',
                lineHeight: 1.6,
                mb: 3,
              }}
            >
              The all-in-one AI platform that transforms how you work, 
              create, and communicate with intelligent AI assistance.
            </Typography>
          </Grid>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <Grid item xs={6} md={2} key={category}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  color: '#ffffff',
                  fontSize: '0.875rem',
                }}
              >
                {category}
              </Typography>
              <Box>
                {links.map((link, index) => (
                  <Link
                    key={index}
                    href="#"
                    sx={{
                      display: 'block',
                      color: '#9ca3af',
                      textDecoration: 'none',
                      mb: 1.5,
                      fontSize: '0.875rem',
                      transition: 'color 0.2s ease',
                      '&:hover': {
                        color: '#ffffff',
                      },
                    }}
                  >
                    {link}
                  </Link>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            mt: 6,
            pt: 4,
            borderTop: '1px solid #374151',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: '#9ca3af',
              fontSize: '0.875rem',
            }}
          >
            © 2024 Chatbot. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingFooter; 