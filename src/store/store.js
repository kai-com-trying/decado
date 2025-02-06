import { configureStore } from '@reduxjs/toolkit';
import singleStocksReducer from '../features/stockDetailSlice';
import searchReducer from '../features/searchSlice';
import allStocksReducer from '../features/allStocksSlice';
import stockSOCFReducer from '../features/stockSOCFSlice';
import stockSOPLReducer from '../features/stockSOPLSlice';
import stockSOFPReducer from '../features/stockSOFPSlice';
import stockPriceReducer from '../features/stockPriceSlice';

export const store = configureStore({
  reducer: {
    stockDetail: singleStocksReducer,
    stockPrice: stockPriceReducer,
    search: searchReducer,
    allStocks: allStocksReducer,
    socf: stockSOCFReducer,
    sopl: stockSOPLReducer,
    sofp: stockSOFPReducer,
  },
});
