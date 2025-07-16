import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import landingTheme from '../theme/landingTheme';

import Navbar from '../components/Navbar';
// Import all landing page sections
import HeroSection from '../components/landing/HeroSection';
import TechStackSection from '../components/landing/TechStackSection';
import ModeSwitcherSection from '../components/landing/ModeSwitcherSection';
import FeatureHighlightsSection from '../components/landing/FeatureHighlightsSection';
import AllToolsSection from '../components/landing/AllToolsSection';
import PlatformAccessSection from '../components/landing/PlatformAccessSection';
import DocumentChatSection from '../components/landing/DocumentChatSection';
import InternalDataSection from '../components/landing/InternalDataSection';
import FAQSection from '../components/landing/FAQSection';
import FinalCTASection from '../components/landing/FinalCTASection';
import LandingFooter from '../components/landing/LandingFooter';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/home');
  };

  const handleGetApp = () => {
    // Handle app download or redirect
    console.log('Get App clicked');
  };

  return (
    <ThemeProvider theme={landingTheme}>
      <CssBaseline />
      <div style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        {/* Navbar Section */}
        <Navbar />
        {/* Hero Section */}
        <HeroSection onGetStarted={handleGetStarted} />
        {/* Tech Stack Section */}
        <TechStackSection onGetStarted={handleGetStarted} />
        {/* Mode Switcher Section */}
        <ModeSwitcherSection />
        {/* Feature Highlights Section */}
        <FeatureHighlightsSection onGetStarted={handleGetStarted} />
        {/* All Tools Section */}
        <AllToolsSection />
        {/* Platform Access Section */}
        <PlatformAccessSection onGetApp={handleGetApp} />
        {/* Document Chat Section */}
        <DocumentChatSection />
        {/* Internal Data Section */}
        <InternalDataSection />
        {/* FAQ Section */}
        <FAQSection />
        {/* Final CTA Section */}
        <FinalCTASection onGetStarted={handleGetStarted} />
        {/* Landing Footer */}
        <LandingFooter />
      </div>
    </ThemeProvider>
  );
} 