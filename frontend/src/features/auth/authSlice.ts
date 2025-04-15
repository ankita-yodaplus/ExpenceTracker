import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/users/';

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('accessToken'),
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (data: { username: string; password: string }, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}login/`, data);
      localStorage.setItem('accessToken', res.data.access);
      return res.data.access;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data: { username: string; email: string; password: string }, thunkAPI) => {
    try {
      await axios.post(`${BASE_URL}register/`, data);
      return;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail || 'Registration failed');
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const refresh = localStorage.getItem('refreshToken');
    await axios.post(`${BASE_URL}logout/`, { refresh });
    localStorage.clear();
  } catch (error: any) {
    return thunkAPI.rejectWithValue('Logout failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
