import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiKey = process.env.REACT_APP_POLYGON_API_KEY;

const initialState = {
    stocks: [],
    loading: false,
    error: false, // Initialize error as false
};

export const fetchStocks = createAsyncThunk(
    'stocks/fetchStocks',
    async (_, { rejectWithValue }) => {
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
    extraReducers: {
        [fetchStocks.pending]: (state) => {
            state.loading = true;
            state.error = false; // Set error to false when loading
        },
        [fetchStocks.fulfilled]: (state, action) => {
            state.loading = false;
            state.stocks = action.payload;
            state.error = false; // Set error to false when successful
        },
        [fetchStocks.rejected]: (state, action) => {
            state.loading = false;
            state.error = true; // Set error to true when failed
        },
    },
});

export default singleStocksSlice.reducer;
