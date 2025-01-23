import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        padding: '20px 0',
        marginTop: 'auto',
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: 'center', marginBottom: '0px' }}>
        <Typography variant="h6" gutterBottom>
          ShopKart
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: '10px' }}>
          © {new Date().getFullYear()} ShopKart. All rights reserved.
        </Typography>
        <Box>
          <Link
            href="/terms"
            color="inherit"
            underline="hover"
            sx={{ margin: '0 10px' }}
          >
            Terms of Service
          </Link>
          <Link
            href="/privacy"
            color="inherit"
            underline="hover"
            sx={{ margin: '0 10px' }}
          >
            Privacy Policy
          </Link>
          <Link
            href="/contact"
            color="inherit"
            underline="hover"
            sx={{ margin: '0 10px' }}
          >
            Contact Us
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
