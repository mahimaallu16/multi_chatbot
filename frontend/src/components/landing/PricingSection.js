import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, Button, Chip } from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';

const PricingSection = ({ onGetStarted }) => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        'Unlimited chats',
        'Basic AI models',
        'Standard support',
        '5 document uploads/month',
        'Community forum access'
      ],
      buttonText: 'Get Started',
      popular: false
    },
    {
      name: 'Pro',
      price: '$19',
      period: 'month',
      description: 'For professionals and teams',
      features: [
        'Everything in Free',
        'Advanced AI models',
        'Priority support',
        'Higher token limits',
        'Unlimited document uploads',
        'Custom integrations',
        'Analytics dashboard'
      ],
      buttonText: 'Get Started',
      popular: true
    },
    {
      name: 'Ultimate',
      price: '$49',
      period: 'month',
      description: 'For enterprises and power users',
      features: [
        'Everything in Pro',
        'All AI models',
        'Dedicated support',
        'Highest token limits',
        'Custom integrations',
        'White-label options',
        'API access',
        'SLA guarantees'
      ],
      buttonText: 'Get Started',
      popular: false
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
          Choose a plan that's right for you
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
          Start free and upgrade as you grow. All plans include our core features 
          with different levels of access and support.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {plans.map((plan, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  boxShadow: plan.popular ? '0 8px 30px rgba(99, 102, 241, 0.3)' : '0 1px 3px rgba(0,0,0,0.1)',
                  border: plan.popular ? '2px solid #6366f1' : '1px solid #e5e7eb',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: plan.popular ? '0 12px 40px rgba(99, 102, 241, 0.4)' : '0 8px 30px rgba(0,0,0,0.15)',
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  {plan.popular && (
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      <Chip
                        label="Most Popular"
                        sx={{
                          backgroundColor: '#6366f1',
                          color: '#ffffff',
                          fontWeight: 600,
                        }}
                      />
                    </Box>
                  )}
                  
                  <Typography
                    variant="h4"
                    sx={{
                      textAlign: 'center',
                      mb: 1,
                      fontWeight: 700,
                      color: '#1a1a1a',
                    }}
                  >
                    {plan.name}
                  </Typography>
                  
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        color: '#1a1a1a',
                        display: 'inline',
                      }}
                    >
                      {plan.price}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#6b7280',
                        display: 'inline',
                        ml: 1,
                      }}
                    >
                      /{plan.period}
                    </Typography>
                  </Box>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: 'center',
                      mb: 4,
                      color: '#6b7280',
                      lineHeight: 1.6,
                    }}
                  >
                    {plan.description}
                  </Typography>
                  
                  <Box sx={{ mb: 4 }}>
                    {plan.features.map((feature, featureIndex) => (
                      <Box
                        key={featureIndex}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 2,
                        }}
                      >
                        <CheckIcon
                          sx={{
                            color: '#10b981',
                            fontSize: 20,
                            mr: 2,
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#1a1a1a',
                            lineHeight: 1.5,
                          }}
                        >
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  
                  <Button
                    variant={plan.popular ? 'contained' : 'outlined'}
                    fullWidth
                    onClick={onGetStarted}
                    sx={{
                      py: 1.5,
                      fontWeight: 600,
                      borderRadius: 2,
                      backgroundColor: plan.popular ? '#1a1a1a' : 'transparent',
                      color: plan.popular ? '#ffffff' : '#1a1a1a',
                      borderColor: '#1a1a1a',
                      '&:hover': {
                        backgroundColor: plan.popular ? '#000000' : '#1a1a1a',
                        color: '#ffffff',
                        transform: 'translateY(-1px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default PricingSection; 