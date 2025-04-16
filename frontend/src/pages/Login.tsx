import  { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  Snackbar
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/useTypedRedux';
import { loginUser, clearAuthStatus } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

interface LoginFormInputs {
  username: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { error, success, loading } = useAppSelector((state) => state.auth);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const onSubmit = (data: LoginFormInputs) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (success) {
      setOpenSnackbar(true);

      const timer = setTimeout(() => {
        dispatch(clearAuthStatus());
        navigate('/dashboard');
      }, 1500); // wait 1.5 seconds then redirect

      return () => clearTimeout(timer);
    }
  }, [success, dispatch, navigate]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            {...register('username')}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            {...register('password')}
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          message="Login successful! Redirecting..."
        />
      </Box>
    </Container>
  );
};

export default Login;
