// src/components/CategoryList.tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../features/categories/categorySlice'; // Import the fetchCategories thunk
import { RootState, AppDispatch } from '../app/store'; // Import AppDispatch type
import { Category } from '../types/category';

const CategoryList = () => {
  // Use the typed dispatch function
  const dispatch = useDispatch<AppDispatch>(); 

  // Selector to get the categories and loading state from Redux store
  const categories = useSelector((state: RootState) => state.categories.categories);
  const loading = useSelector((state: RootState) => state.categories.loading);

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(fetchCategories()); // Dispatch the async thunk
  }, [dispatch]);

  return (
    <div>
      <h2>Category List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {categories.map((category: Category) => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryList;
