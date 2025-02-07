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
                    symbol: 'IBM',
                    apikey: 'demo',
                },
            });

            if (!response.data) {
                throw new Error("No data received");
            }
            
            const formattedData = response.data.annualReports.map(report => {
                return Object.keys(report).reduce((acc, key) => {
                    const value = report[key];

                    // Convert to number if it's a numeric string
                    if (!isNaN(value) && value.trim() !== "" && value !== "None") {
                        acc[key] = parseFloat(value);
                    } else {
                        acc[key] = value; // Keep non-numeric values as is
                    }
                    
                    return acc;
                }, {});
            });

            return formattedData;
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