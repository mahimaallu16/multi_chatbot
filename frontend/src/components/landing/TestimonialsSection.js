import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, Avatar } from '@mui/material';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "This AI chatbot has completely transformed how I work. The document analysis feature is incredible!",
      name: "Sarah Johnson",
      title: "Product Manager",
      company: "TechCorp",
      avatar: "SJ"
    },
    {
      quote: "The ability to switch between different AI models is a game-changer. I get the best results for every task.",
      name: "Michael Chen",
      title: "Data Scientist",
      company: "DataFlow Inc",
      avatar: "MC"
    },
    {
      quote: "Finally, an AI tool that understands context and provides relevant, accurate answers consistently.",
      name: "Emily Rodriguez",
      title: "Content Creator",
      company: "Creative Studios",
      avatar: "ER"
    },
    {
      quote: "The pricing is fair and the features are exactly what I need. Highly recommended for professionals.",
      name: "David Kim",
      title: "Software Engineer",
      company: "InnovateTech",
      avatar: "DK"
    },
    {
      quote: "I use this for everything from code reviews to content creation. It's like having a brilliant assistant.",
      name: "Lisa Thompson",
      title: "Full Stack Developer",
      company: "WebSolutions",
      avatar: "LT"
    },
    {
      quote: "The interface is intuitive and the AI responses are always helpful. It's become my go-to tool.",
      name: "Alex Morgan",
      title: "Marketing Director",
      company: "GrowthCo",
      avatar: "AM"
    }
  ];

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#fafafa' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            mb: 8,
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '2.5rem' },
            color: '#1a1a1a',
          }}
        >
          What Our Users Say
        </Typography>

        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 3,
                      fontSize: '1.125rem',
                      lineHeight: 1.6,
                      color: '#1a1a1a',
                      fontStyle: 'italic',
                    }}
                  >
                    "{testimonial.quote}"
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      sx={{
                        width: 48,
                        height: 48,
                        backgroundColor: '#6366f1',
                        color: '#ffffff',
                        fontWeight: 600,
                        mr: 2,
                      }}
                    >
                      {testimonial.avatar}
                    </Avatar>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          color: '#1a1a1a',
                          mb: 0.5,
                        }}
                      >
                        {testimonial.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#6b7280',
                          fontSize: '0.875rem',
                        }}
                      >
                        {testimonial.title}, {testimonial.company}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TestimonialsSection; 