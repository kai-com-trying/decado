import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiKey = import.meta.env.VITE_POLYGON_API_KEY;

const initialState = {
    stocks: [],
    loading: false,
    error: false, // Initialize error as false
};

export const fetchStocks = createAsyncThunk(
    'stocks/fetchStocks',
    async (symbol, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?apiKey=${apiKey}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const singleStocksSlice = createSlice({
    name: 'stocks',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchStocks.pending, (state) => {
                state.loading = true;
                state.error = false; // Set error to false when loading
            })
            .addCase(fetchStocks.fulfilled, (state, action) => {
                state.loading = false;
                state.stocks = action.payload;
                state.error = false; // Set error to false when successful
            })
            .addCase(fetchStocks.rejected, (state) => {
                state.loading = false;
                state.error = true; // Set error to true when failed
            });
    },
});

export default singleStocksSlice.reducer;
