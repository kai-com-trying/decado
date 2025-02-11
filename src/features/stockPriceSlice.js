import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const AVApiKey = import.meta.env.VITE_ALPHAVANTAGE_API_KEY;

const initialState = {
    price: {},
    loading: false,
    error: null,
};

export const fetchStockPrice = createAsyncThunk(
    'stockPrice/fetchStockPrice',
    async (symbol, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://www.alphavantage.co/query', {
                params: {
                    function: 'GLOBAL_QUOTE',
                    symbol: 'IBM',
                    apikey: 'demo',
                },
            });

            const data = response.data?.["Global Quote"];
            if (!data || !data["05. price"]) {
                throw new Error("No price data received");
            }

            return {
                symbol: data["01. symbol"],
                price: parseFloat(data["05. price"]),
                change: parseFloat(data["09. change"]),
                changePercent: data["10. change percent"]
            };
        } catch (error) {
            console.error("Error fetching stock price:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || { error: "Unknown error occurred" });
        }
    }
);

const stockPriceSlice = createSlice({
    name: 'stockPrice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStockPrice.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStockPrice.fulfilled, (state, action) => {
                state.loading = false;
                state.price = action.payload;
                state.error = null;
            })
            .addCase(fetchStockPrice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error || action.error.message;
            });
    },
});

export default stockPriceSlice.reducer;
