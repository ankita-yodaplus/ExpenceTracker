import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const BASE_URL = 'http://localhost:8000/api/users/';

interface AuthState {
  token: string | null;
  username: string | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem('accessToken'),
  username: null,
  loading: false,
  error: null,
  success: false,
};


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (data: { username: string; password: string }, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}login/`, data);
      const { access, username } = res.data; // Destructure the response to get the username
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', res.data.refresh); // Store the refresh token if needed
      return { access, username }; // Return both the token and username
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.detail || 'Login failed');
      }
      return thunkAPI.rejectWithValue('Login failed');
    }
  }
);


export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data: { username: string; email: string; password: string }, thunkAPI) => {
    try {
      console.log("Sending data to backend:", data);
      await axios.post(`${BASE_URL}register/`, data);
      return { success: true };
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Registration error:", error.response?.data);
        return thunkAPI.rejectWithValue(error.response.data.detail || JSON.stringify(error.response?.data) || 'Registration failed');
      }
      return thunkAPI.rejectWithValue('Registration failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      const refresh = localStorage.getItem('refreshToken');
      await axios.post(`${BASE_URL}logout/`, { refresh });
      localStorage.clear();
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.detail || 'Logout failed');
      }
      return thunkAPI.rejectWithValue('Logout failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.token = null;
      state.username = null; 
    },
    clearAuthStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.access;
        state.username = action.payload.username; 
        state.loading = false;
        state.success = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true; 
        state.error = null;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true; 
        state.success = false;
        state.error = null;
      })
  },
});

export const { logout,clearAuthStatus } = authSlice.actions;
export default authSlice.reducer;
