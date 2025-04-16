import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { Expense } from '../../types/expense';

export const fetchExpenses = createAsyncThunk('expenses/fetch', async () => {
  const res = await axios.get('expenses/');
  return res.data;
});


interface ExpenseState {
  expenses: Expense[];              
  loading: boolean;
  error: string | null;     
}

const initialState: ExpenseState = {
  expenses: [],
  loading: false,
  error: null,
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch expenses'  ;
      });
  },
});

export default expenseSlice.reducer;
