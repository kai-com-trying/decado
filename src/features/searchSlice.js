import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiKey = import.meta.env.VITE_ALPHAVANTAGE_API_KEY;

const initialState = {
  searchQuery: '',
  searchResults: [],
  loading: false,
  error: false,
};

export const fetchSearchResults = createAsyncThunk(
  'search/fetchSearchResults',
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://www.alphavantage.co/query', {
        params: {
          function: 'SYMBOL_SEARCH',
          keywords: searchQuery,
          apikey: apiKey,
        }
      });

      console.log('api: ', response.data)

      if(!response.data.bestMatches || response.data.bestMatches.length === 0) {
        throw new Error("No matches found");
      }
      return response.data.bestMatches;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message ||"Unknown API Error");
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchQuery = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
        state.error = false;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchQuery, clearSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
