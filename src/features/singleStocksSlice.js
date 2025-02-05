import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiKey = import.meta.env.VITE_POLYGON_API_KEY;
const yahooApiKey = import.meta.env.VITE_YAHOO_API_KEY;

const initialState = {
    detail: null,
    financialData: [],
    loading: false,
    error: false, // Initialize error as false
};

export const fetchStocksDetails = createAsyncThunk(
    'stocks/fetchStocksDetails',
    async (ticker, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=${apiKey}`);
            if (!response.data) {
                throw new Error("No data received");
              }
              
            return response.data;
        } catch (error) {
            console.error("Error fetching stocks:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || { error: "Unknown error occurred" });
        }
    }
);

export const fetchFinancialData = createAsyncThunk(
    'stocks/fetchFinancialData',
    async (ticker, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://api.polygon.io/vX/reference/financials?ticker=${ticker}&limit=100&apiKey=${apiKey}`);
            if (!response.data) {
                throw new Error("No data received");
              }
              
            return response.data;
        } catch (error) {
            console.error("Error fetching stocks:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || { error: "Unknown error occurred" });
        }
    }
);

const singleStocksSlice = createSlice({
    name: 'stocks',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchStocksDetails.pending, (state) => {
                state.loading = true;
                state.error = false; // Set error to false when loading
            })
            .addCase(fetchStocksDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.detail = action.payload;
                state.error = false; // Set error to false when successful
            })
            .addCase(fetchStocksDetails.rejected, (state) => {
                state.loading = false;
                state.error = true; // Set error to true when failed
            })
            .addCase(fetchFinancialData.pending, (state) => {
                state.loading = true;
                state.error = false; // Set error to false when loading
            })
            .addCase(fetchFinancialData.fulfilled, (state, action) => {
                state.loading = false;
                state.financialData = action.payload;
                state.error = false; // Set error to false when successful
            })
            .addCase(fetchFinancialData.rejected, (state) => {
                state.loading = false;
                state.error = true; // Set error to true when failed
            });
    },
});

export default singleStocksSlice.reducer;
