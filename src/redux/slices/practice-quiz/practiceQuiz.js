import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hasSubmitted: null,
  reviewEnabled: false,
  showConfirmSubmit: false,
  isAttempted: false,
  courseWatched: false,
};

export const practiceQuizSlice = createSlice({
  name: "practiceQuiz",
  initialState,
  reducers: {
    setHasSubmitted: (state, action) => {
      state.hasSubmitted = action.payload;
    },
    setReviewEnabled: (state, action) => {
      state.reviewEnabled = action.payload;
    },

    setIsAttempted: (state, action) => {
      state.isAttempted = action.payload;
    },

    setCourseWatched: (state, action) => {
      state.courseWatched = action.payload;
    },

    openConfirmSubmit: (state) => {
      state.showConfirmSubmit = true;
    },

    closeConfirmSubmit: (state) => {
      state.showConfirmSubmit = false;
    },

    clearQuizState: (state) => {
      state.hasSubmitted = false;
      state.reviewEnabled = false;
    },
  },
});

export const {
  clearQuizState,
  setHasSubmitted,
  setIsAttempted,
  setReviewEnabled,
  setCourseWatched,
  openConfirmSubmit,
  closeConfirmSubmit,
} = practiceQuizSlice.actions;

export default practiceQuizSlice.reducer;
