
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Income } from '../../types/income';

// Fetch incomes from the backend
export const fetchIncomes = createAsyncThunk('income/fetchIncomes', async () => {
  const response = await axios.get('/api/income/');
  return response.data;
});

// Add new income
export const addIncome = createAsyncThunk(
  'income/addIncome',
  async (incomeData: { amount: string; source: string; date: string; category: number }) => {
    const response = await axios.post('/api/income/', incomeData);
    return response.data;
  }
);

interface IncomeState {
  incomes: Income[];
  loading: boolean;
  error: string | null;
}

const initialState: IncomeState = {
  incomes: [],
  loading: false,
  error: null,
};

const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncomes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIncomes.fulfilled, (state, action) => {
        state.loading = false;
        state.incomes = action.payload;
      })
      .addCase(fetchIncomes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch incomes';
      })
      .addCase(addIncome.pending, (state) => {
        state.loading = true;
      })
      .addCase(addIncome.fulfilled, (state, action) => {
        state.loading = false;
        state.incomes.push(action.payload);
      })
      .addCase(addIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add income';
      });
  },
});

export default incomeSlice.reducer;
