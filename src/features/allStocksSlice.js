import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const polygonApiKey = import.meta.env.VITE_POLYGON_API_KEY;

const initialState = {
  stocks: [],
  loading: false,
  error: null, // Initialize error as null
};

export const fetchStocks = createAsyncThunk(
  'allStocks/fetchStocks',
  async (_, { rejectWithValue }) => {
    try {
      const parameter = {
        apiKey: polygonApiKey,
        type: 'CS',
        market: 'stocks',
        active: 'true',
        limit: 100, // Fetch only 100 stocks
      };

      const response = await axios.get('https://api.polygon.io/v3/reference/tickers', { params: parameter });

      if (!response.data || !response.data.results) {
        throw new Error("No data received");
      }

      console.log(response.data.results);
      return response.data.results; // Return the results
    } catch (error) {
      console.error("Error fetching stocks:",  error.response?.data?.error || error.response?.data);
      return rejectWithValue(error.response?.data?.error || { error: "Unknown error occurred" });
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
        state.error = null; // Set error to null when loading
      })
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.loading = false;
        // Filter out duplicates based on the ticker property
        const uniqueStocks = [];
        const tickers = new Set();

        action.payload.forEach((stock) => {
          if (!tickers.has(stock.ticker)) {
            tickers.add(stock.ticker);
            uniqueStocks.push(stock);
          }
        });

        state.stocks = uniqueStocks; // Set stocks to the filtered results array
        state.error = null; // Set error to null when successful
      })
      .addCase(fetchStocks.rejected, (state, action) => {
        state.loading = false;
        state.stocks = []; // Ensure stocks is an array even if the fetch fails
        state.error = action.payload; // Capture the error message
      });
  },
});

export default allStocksSlice.reducer;