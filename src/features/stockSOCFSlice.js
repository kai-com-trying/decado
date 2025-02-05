import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const AVApiKey = import.meta.env.VITE_ALPHAVANTAGE_API_KEY;

// Initial state
const initialState = {
    socf: [],
    loading: null,
    error: null,
};

// Async thunk for fetching SOCF data
export const fetchSOCF = createAsyncThunk(
    'socf/fetchSOCF', 
    async (symbol, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://www.alphavantage.co/query', {
                params: {
                    function: 'CASH_FLOW',
                    symbol: symbol,
                    apikey: AVApiKey,
                },
            });
            if (!response.data) {
                throw new Error("No data received");
            }
            return response.data.annualReports;
        } catch (error) {
            console.error("Error fetching SOCF data:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || { error: "Unknown error occurred" });
        }
    }
);

const stockSOCFSlice = createSlice({
    name: 'socf',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSOCF.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSOCF.fulfilled, (state, action) => {
                state.loading = null;
                state.socf = action.payload;
                state.error = null;
            })
            .addCase(fetchSOCF.rejected, (state, action) => {
                state.loading = null;
                state.error = action.payload?.error || action.error.message;
            });
    },
});

export default stockSOCFSlice.reducer;