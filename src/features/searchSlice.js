import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
  searchResults: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  }
});

export const { setSearchQuery, setSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
