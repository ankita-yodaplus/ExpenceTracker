import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import expenseReducer from '../features/expenses/expenseSlice';
import incomeReducer from '../features/income/incomeSlice';
import categoryReducer from '../features/categories/categorySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expenseReducer,
    income: incomeReducer,
    categories: categoryReducer,
  },
});

// This infers the RootState type from the store
export type RootState = ReturnType<typeof store.getState>;

// This type will be used to type the dispatch function and ensure correct async thunk handling
export type AppDispatch = typeof store.dispatch;

export default store;
