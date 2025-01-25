import { configureStore } from '@reduxjs/toolkit';
import singleStocksReducer from '../features/singleStocksSlice';
import searchReducer from '../features/searchSlice';

export const store = configureStore({
  reducer: {
    stocks: singleStocksReducer,
    search: searchReducer,
  },
});
