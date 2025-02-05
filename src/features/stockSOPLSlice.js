import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const AVApiKey = import.meta.env.VITE_ALPHAVANTAGE_API_KEY;

// Initial state
const initialState = {
    sopl: [],
    loading: null,
    error: null,
};

// Async thunk for fetching SOPL data
export const fetchSOPL = createAsyncThunk(
    'sopl/fetchSOPL', 
    async (symbol, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://www.alphavantage.co/query', {
                params: {
                    function: 'INCOME_STATEMENT',
                    symbol: symbol,
                    apikey: AVApiKey,
                },
            });
            if (!response.data) {
                throw new Error("No data received");
            }
            return response.data.annualReports;
        } catch (error) {
            console.error("Error fetching SOPL data:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || { error: "Unknown error occurred" });
        }
    }
);

const stockSOPLSlice = createSlice({
    name: 'sopl',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSOPL.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSOPL.fulfilled, (state, action) => {
                state.loading = null;
                state.sopl = action.payload;
                state.error = null;
            })
            .addCase(fetchSOPL.rejected, (state, action) => {
                state.loading = null;
                state.error = action.payload?.error || action.error.message;
            });
    },
});

export default stockSOPLSlice.reducer;