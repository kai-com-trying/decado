import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const rapidApiKey = import.meta.env.VITE_YAHOO_API_KEY;

const initialState = {
    stocks: [],
    loading: false,
    error: false, // Initialize error as false
};

export const fetchStocks = createAsyncThunk(
    'allStocks/fetchStocks',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://yahoo-finance15.p.rapidapi.com/api/v2/markets/tickers', {
                params: {
                    page: '1',
                    type: 'STOCKS'
                },
                headers: {
                'x-rapidapi-key': rapidApiKey,
                'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com'
                }
            });
            if (!response.data) {
                throw new Error("No data received");
            }
            console.log(response.data);
            return response.data.body; // Adjust based on the actual response structure
        } catch (error) {
            console.error("Error fetching stocks:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || { error: "Unknown error occurred" });
        }
    }
);

const allStocksSlice = createSlice({
    name: 'allStocks',
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
            .addCase(fetchStocks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Set error to true when failed
            });
    },
});

export default allStocksSlice.reducer;