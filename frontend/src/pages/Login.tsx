// import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Container, TextField, Typography, Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/useTypedRedux';
import { loginUser } from '../features/auth/authSlice';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.auth);

  const onSubmit = (data: any) => {
    dispatch(loginUser(data));
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4">Login</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField fullWidth label="Username" margin="normal" {...register('username')} />
          <TextField fullWidth label="Password" type="password" margin="normal" {...register('password')} />
          {error && <Alert severity="error">{error}</Alert>}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
