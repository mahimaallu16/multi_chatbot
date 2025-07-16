import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails 
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

const FAQSection = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqs = [
    {
      question: "What is Chatbot?",
      answer: "Chatbot is an all-in-one AI platform that combines multiple advanced AI models to provide intelligent conversations, document analysis, code assistance, and much more. It's designed to boost your productivity and creativity."
    },
    {
      question: "How does Chatbot work?",
      answer: "Chatbot uses state-of-the-art AI models including GPT-4, Claude 3, and Gemini. You can upload documents, ask questions, or start conversations, and our AI will provide intelligent, contextual responses based on the latest information and your specific needs."
    },
    {
      question: "Is Chatbot secure?",
      answer: "Yes, Chatbot prioritizes security and privacy. We use end-to-end encryption, SOC 2 Type II compliance, and enterprise-grade security protocols. Your data is never stored beyond processing and is always protected."
    },
    {
      question: "What file types does Chatbot support?",
      answer: "Chatbot supports a wide range of file types including PDF, Word documents, Excel spreadsheets, PowerPoint presentations, CSV files, and various code files. You can upload and chat with any of these document types."
    },
    {
      question: "Can I switch between different AI models?",
      answer: "Absolutely! Chatbot allows you to easily switch between different AI models like GPT-4, Claude 3, and Gemini. Each model has its strengths, and you can choose the best one for your specific task."
    },
    {
      question: "What are the pricing plans?",
      answer: "We offer three plans: Free (basic features), Pro ($19/month for advanced features), and Ultimate ($49/month for enterprise features). All plans include our core AI capabilities with different levels of access and support."
    },
    {
      question: "Do you offer customer support?",
      answer: "Yes, we provide comprehensive customer support. Free users get community forum access, Pro users get priority support, and Ultimate users get dedicated support with SLA guarantees."
    },
    {
      question: "Can I integrate Chatbot with my company's data?",
      answer: "Yes, Chatbot offers secure integration with your internal company data, APIs, and databases. We maintain complete privacy and security while providing AI-powered insights from your business data."
    }
  ];

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#fafafa' }}>
      <Container maxWidth="md">
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
          In case you missed anything
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
          Have questions? We've got answers. Check out our frequently asked questions 
          to learn more about Chatbot and how it can help you.
        </Typography>

        <Box>
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              sx={{
                mb: 2,
                borderRadius: 2,
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                '&:before': {
                  display: 'none',
                },
                '&.Mui-expanded': {
                  margin: '16px 0',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  '& .MuiAccordionSummary-content': {
                    margin: '16px 0',
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: '#1a1a1a',
                    fontSize: '1rem',
                  }}
                >
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#6b7280',
                    lineHeight: 1.6,
                  }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FAQSection; 