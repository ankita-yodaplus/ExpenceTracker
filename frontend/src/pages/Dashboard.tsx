import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchIncomes } from '../features/income/incomeSlice';
import { fetchExpenses } from '../features/expenses/expenseSlice';
import { fetchCategories } from '../features/categories/categorySlice';
import { logout } from '../features/auth/authSlice';
import { RootState, AppDispatch } from '../app/store';
import {
  Container,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  CircularProgress,
} from '@mui/material';

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { username, token } = useSelector((state: RootState) => state.auth);
  const { incomes, loading: incomesLoading } = useSelector((state: RootState) => state.income);
  const { expenses, loading: expensesLoading } = useSelector((state: RootState) => state.expenses);
  const { categories, loading: categoriesLoading } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    dispatch(fetchIncomes());
    dispatch(fetchExpenses());
    dispatch(fetchCategories());
  }, [dispatch, token, navigate]);

  // 🛑 Prevent render if no token yet
  if (!token) return null;

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/');
  };

  const isLoading = incomesLoading || expensesLoading || categoriesLoading;

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="space-between" alignItems="center" my={4}>
        <Typography variant="h4">Welcome, {username || 'User'} 👋</Typography>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      {isLoading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Incomes */}
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Incomes</Typography>
            <List>
              {(Array.isArray(incomes) ? incomes : []).map((income) => (
                <ListItem key={income.id} disableGutters>
                  <ListItemText
                    primary={`${income.source} - $${income.amount}`}
                    secondary={income.date}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Expenses */}
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Expenses</Typography>
            <List>
              {(Array.isArray(expenses) ? expenses : []).map((expense) => (
                <ListItem key={expense.id} disableGutters>
                  <ListItemText
                    primary={`${expense.title} - $${expense.amount}`}
                    secondary={expense.date}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Categories */}
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Categories</Typography>
            <List>
              {(Array.isArray(categories) ? categories : []).map((cat) => (
                <ListItem key={cat.id} disableGutters>
                  <ListItemText primary={cat.name} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </>
      )}
    </Container>
  );
};


export default Dashboard;
