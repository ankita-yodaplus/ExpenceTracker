// src/pages/Home.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Expense Tracker 💰
      </Typography>
      <Typography variant="body1">
        Track your income and expenses with ease.
      </Typography>
    </Box>
  );
};

export default Home;
