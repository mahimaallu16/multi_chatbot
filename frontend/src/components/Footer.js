import React from "react";
import { Box, Typography, Link, IconButton, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Benefits", href: "#benefits" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <Box component="footer" sx={{
      py: 4,
      px: 2,
      mt: 8,
      borderTop: '1px solid',
      borderColor: 'divider',
      bgcolor: 'background.paper',
      textAlign: 'center'
    }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 1 }}>
        {navLinks.map(link => (
          <Link key={link.label} href={link.href} underline="hover" color="primary" sx={{ fontWeight: 600, fontSize: 15 }}>
            {link.label}
          </Link>
        ))}
      </Stack>
      <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 1 }}>
        <IconButton color="primary" href="https://github.com/" target="_blank" rel="noopener"><GitHubIcon /></IconButton>
        <IconButton color="primary" href="https://twitter.com/" target="_blank" rel="noopener"><TwitterIcon /></IconButton>
        <IconButton color="primary" href="https://linkedin.com/" target="_blank" rel="noopener"><LinkedInIcon /></IconButton>
      </Stack>
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Amura. All rights reserved.
      </Typography>
    </Box>
  );
} 