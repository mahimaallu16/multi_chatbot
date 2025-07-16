import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Benefits", href: "#benefits" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleNavClick = (href) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(href);
    }
    setDrawerOpen(false);
  };

  return (
    <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider', zIndex: 1201 }}>
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: 72 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => navigate('/')}> 
          <Box sx={{
            bgcolor: 'primary.main',
            width: 40,
            height: 40,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 1
          }}>
            <Typography variant="h5" sx={{ color: '#fff', fontWeight: 800, letterSpacing: 1 }}>A</Typography>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 1, color: 'primary.main' }}>Amura</Typography>
        </Box>
        {isMobile ? (
          <>
            <IconButton edge="end" color="primary" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
              <Box sx={{ width: 220, p: 2 }}>
                <List>
                  {navLinks.map((link) => (
                    <ListItem button key={link.label} onClick={() => handleNavClick(link.href)}>
                      <ListItemText primary={link.label} />
                    </ListItem>
                  ))}
                  <ListItem button onClick={() => { navigate('/home'); setDrawerOpen(false); }}>
                    <ListItemText primary="Try Now" />
                  </ListItem>
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {navLinks.map((link) => (
              <Button key={link.label} color="primary" sx={{ fontWeight: 600 }} onClick={() => handleNavClick(link.href)}>
                {link.label}
              </Button>
            ))}
            <Button variant="contained" color="primary" sx={{ ml: 2, fontWeight: 700, px: 3, borderRadius: 2 }} onClick={() => navigate('/home')}>
              Try Now
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
} 