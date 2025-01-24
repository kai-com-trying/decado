import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiKey = process.env.REACT_APP_POLYGON_API_KEY;

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
        const response = await axios.get(`https://api.polygon.io/v2/reference/tickers?sort=ticker&perpage=5&page=1&search=${searchQuery}&apiKey=${apiKey}`);
        return response.data.results;
        } catch (error) {
        return rejectWithValue(error.response.data);
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
  },
  extraReducers: {
    [fetchSearchResults.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [fetchSearchResults.fulfilled]: (state, action) => {
      state.loading = false;
      state.searchResults = action.payload;
      state.error = false;
    },
    [fetchSearchResults.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
  }
});

export const { setSearchQuery, setSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
