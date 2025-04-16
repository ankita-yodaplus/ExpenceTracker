import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addIncome } from '../features/income/incomeSlice';
import { fetchCategories } from '../features/categories/categorySlice';
import { RootState, AppDispatch } from '../app/store'; // Import AppDispatch
import { Category } from '../types/category';

const IncomeForm = () => {
  const dispatch = useDispatch<AppDispatch>(); // Type the dispatch with AppDispatch
  const categories = useSelector((state: RootState) => state.categories.categories);
  const loading = useSelector((state: RootState) => state.income.loading);

  const [amount, setAmount] = useState<string>(''); // Amount as string for input handling
  const [source, setSource] = useState<string>(''); // Source as string
  const [date, setDate] = useState<string>(''); // Date as string
  const [category, setCategory] = useState<number | null>(null); // Category can be number or null

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount && source && date && category !== null) {
      // Dispatch addIncome action
      dispatch(addIncome({ amount, source, date, category }));
      setAmount('');
      setSource('');
      setDate('');
      setCategory(null);
    }
  };

  return (
    <div>
      <h2>Create Income</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <select
          value={category ?? ''}
          onChange={(e) => setCategory(Number(e.target.value))}
          required
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((cat: Category) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Income'}
        </button>
      </form>
    </div>
  );
};

export default IncomeForm;
