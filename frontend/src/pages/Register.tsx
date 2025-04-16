import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { 
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  CircularProgress // ✅ CHANGED: Added loading spinner (optional)
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/useTypedRedux';
import { registerUser, clearAuthStatus } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

/**
 * Interface for the registration form input fields.
 */
interface RegisterFormInputs {
  username: string;
  email: string;
  password: string;
}

/**
 * Register component allowing users to create a new account.
 * Includes field validation and error handling.
 */
const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { error, success, loading } = useAppSelector((state) => state.auth); // ✅ CHANGED: Include loading state

  // Setup form and validations using react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  /**
   * Handles form submission and dispatches registerUser action.
   * @param data - Form data (username, email, password)
   */
  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    dispatch(registerUser(data));
  };

  // Reset form and redirect if success
  useEffect(() => {
    if (success) {
      reset();
      const timer = setTimeout(() => {
        navigate('/login');
        dispatch(clearAuthStatus());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, reset, navigate, dispatch]);

  // ✅ CHANGED: Clear auth state on unmount
  useEffect(() => {
    return () => {
      dispatch(clearAuthStatus());
    };
  }, [dispatch]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>

        {/* Show API or validation error */}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {/* Show success message */}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Registration successful! Redirecting to login...
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Username Field */}
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters long',
              },
            })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />

          {/* Email Field */}
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Enter a valid email address',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          {/* Password Field */}
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long',
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*\d).+$/,
                message: 'Password must include an uppercase letter and a number',
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          {/* Submit Button */}
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            sx={{ mt: 3 }}
            disabled={loading} // ✅ CHANGED: Disable button when loading
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'} {/* ✅ CHANGED */}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
