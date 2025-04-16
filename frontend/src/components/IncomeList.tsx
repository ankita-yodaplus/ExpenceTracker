import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIncomes } from '../features/income/incomeSlice'; // Import the fetchIncomes thunk
import { RootState, AppDispatch } from '../app/store'; // Import AppDispatch type
import { Income } from '../types/income';

const IncomeList = () => {
  // Use the typed dispatch function
  const dispatch = useDispatch<AppDispatch>();

  // Selector to get the incomes and loading state from Redux store
  const incomes = useSelector((state: RootState) => state.income.incomes);
  const loading = useSelector((state: RootState) => state.income.loading);

  // Fetch incomes on component mount
  useEffect(() => {
    dispatch(fetchIncomes()); // Dispatch the async thunk
  }, [dispatch]);

  return (
    <div>
      <h2>Income List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {incomes.map((income: Income) => (
            <li key={income.id}>
              {income.amount} - {income.source} - {income.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IncomeList;