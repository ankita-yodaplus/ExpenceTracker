import React from 'react';
import { Box, Typography, TextField, Button, Container, Paper } from '@mui/material';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // For now, just log or simulate sending
    alert('Thank you for reaching out! 🚀');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Contact Us 📬
        </Typography>
        <Typography variant="body1" gutterBottom>
          Have questions or feedback? We'd love to hear from you.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Message"
            name="message"
            multiline
            rows={4}
            required
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Send Message
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Contact;
