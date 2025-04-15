import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/useTypedRedux';
import { registerUser } from '../features/auth/authSlice';

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
  const { error } = useAppSelector((state) => state.auth);

  // Setup form and validations using react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  /**
   * Handles form submission and dispatches registerUser action.
   * @param data - Form data (username, email, password)
   */
  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>

        {/* Show API or validation error */}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

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
          >
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
