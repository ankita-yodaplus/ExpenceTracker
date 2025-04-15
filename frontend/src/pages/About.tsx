import React from 'react';
import { Box, Typography } from '@mui/material';

const About: React.FC = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4">About Us</Typography>
    <Typography>
      This is an expense tracking app built using React and Django.
    </Typography>
  </Box>
);

export default About;
