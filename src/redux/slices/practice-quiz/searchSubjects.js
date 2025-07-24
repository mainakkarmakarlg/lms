import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResults: [],
  selectedSearchId: null,
};

export const searchSubjectsSlice = createSlice({
  name: "searchSubjects",
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },

    setSelectedSearchId: (state, action) => {
      state.selectedSearchId = action.payload;
    },
  },
});

export const { setSearchResults, setSelectedSearchId } =
  searchSubjectsSlice.actions;

export default searchSubjectsSlice.reducer;
