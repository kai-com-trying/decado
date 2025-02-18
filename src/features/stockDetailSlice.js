import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const AVApiKey = import.meta.env.VITE_ALPHAVANTAGE_API_KEY;

const initialState = {
    detail: {},
    loading: false,
    error: null,
};

export const fetchStockDetails = createAsyncThunk(
    'stockDetail/fetchStockDetails',
    async (symbol, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://www.alphavantage.co/query', {
                params: {
                    function: 'OVERVIEW',
                    symbol: symbol,
                    apikey: AVApiKey,
                },
            });
            if (!response.data) {
                throw new Error("No data received");
            }
            const formattedData = Object.keys(response.data).reduce((acc, key) => {
                const value = response.data[key];

                // Check if the value is a string that represents a number
                if (!isNaN(value) && value.trim() !== "") {
                    acc[key] = parseFloat(value); // Convert to a number
                } else {
                    acc[key] = value; // Keep non-numeric values as they are
                }
                
                return acc;
            }, {});

            return formattedData;
        } catch (error) {
            console.error("Error fetching stock details:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || { error: "Unknown error occurred" });
        }
    }
);

const stockDetailSlice = createSlice({
    name: 'stockDetail',
    initialState,
    reducers: {
        resetDetails: (state) => {
            state.detail = {};
            state.loading = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStockDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStockDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.detail = action.payload;
                state.error = null;
            })
            .addCase(fetchStockDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error || action.error.message;
            });
    },
});

export const { resetDetails } = stockDetailSlice.actions;
export default stockDetailSlice.reducer;
