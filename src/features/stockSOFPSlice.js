import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const AVApiKey = import.meta.env.VITE_ALPHAVANTAGE_API_KEY;

// Initial state
const initialState = {
    sofp: [],
    loading: null,
    error: null,
};

// Async thunk for fetching SOFP data
export const fetchSOFP = createAsyncThunk(
    'sofp/fetchSOFP', 
    async (symbol, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://www.alphavantage.co/query', {
                params: {
                    function: 'BALANCE_SHEET',
                    symbol: symbol,
                    apikey: AVApiKey,
                },
            });
            if (!response.data) {
                throw new Error("No data received");
            }
            return response.data.annualReports;
        } catch (error) {
            console.error("Error fetching SOFP data:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || { error: "Unknown error occurred" });
        }
    }
);

const stockSOFPSlice = createSlice({
    name: 'sofp',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSOFP.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSOFP.fulfilled, (state, action) => {
                state.loading = null;
                state.sofp = action.payload;
                state.error = null;
            })
            .addCase(fetchSOFP.rejected, (state, action) => {
                state.loading = null;
                state.error = action.payload?.error || action.error.message;
            });
    },
});

export default stockSOFPSlice.reducer;