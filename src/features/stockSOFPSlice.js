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
            
            const formattedData = response.data.annualReports.map(report => {
                return Object.keys(report).reduce((acc, key) => {
                    const value = report[key];

                    // Convert to number if it's a numeric string
                    if (typeof value === 'string' && !Number.isNaN(Number(value)) && value.trim() !== "" && value !== "None") {
                        acc[key] = Number(value);
                    } else {
                        acc[key] = value; // Keep non-numeric values as is
                    }
                    
                    return acc;
                }, {});
            });
            console.log(formattedData)
            return formattedData;
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