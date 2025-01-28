import { configureStore } from '@reduxjs/toolkit';
import singleStocksReducer from '../features/singleStocksSlice';
import searchReducer from '../features/searchSlice';
import allStocksReducer from '../features/allStocksSlice';

export const store = configureStore({
  reducer: {
    stocks: singleStocksReducer,
    search: searchReducer,
    allStocks: allStocksReducer,
  },
});
