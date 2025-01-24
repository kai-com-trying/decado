import { configureStore } from '@reduxjs/toolkit';
import singleStockReducer from './features/singleStockSlice';
import searchReducer from './features/searchSlice';

export const store = configureStore({
  reducer: {
    stocks: singleStockReducer,
    search: searchReducer,
  },
});
