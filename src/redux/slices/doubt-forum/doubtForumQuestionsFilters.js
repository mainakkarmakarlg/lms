import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSubjects: [],
  selectedTopics: [],
  selectedPoints: [],
  questionType: "all",
  sortOption: "",
  searchType: "by-question",
  searchText: "",
};

export const doubtForumQuestionsFilters = createSlice({
  name: "doubtForumQuestionsFilters",
  initialState,
  reducers: {
    setSelectedSubjects: (state, action) => {
      state.selectedSubjects = action.payload;
    },

    setSelectedTopics: (state, action) => {
      state.selectedTopics = action.payload;
    },

    setSelectedPoints: (state, action) => {
      state.selectedPoints = action.payload;
    },

    setQuestionType: (state, action) => {
      state.questionType = action.payload;
    },

    setSearchType: (state, action) => {
      state.searchType = action.payload;
    },

    setSortOptions: (state, action) => {
      state.sortOption = action.payload;
    },

    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setQuestionType,
  setSelectedSubjects,
  setSelectedTopics,
  setSelectedPoints,
  setSearchType,
  setSearchText,
  setSortOptions,
} = doubtForumQuestionsFilters.actions;

export default doubtForumQuestionsFilters.reducer;
