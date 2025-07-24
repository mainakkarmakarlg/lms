import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  defaultQuizes: [],
  showDisclaimer: false,
  quizes: [],
  attempt: null,
  reviewAnswerEnabled: false,
  startQuizId: null,
};

export const mockQuizesSlice = createSlice({
  name: "mockQuizes",
  initialState,
  reducers: {
    setMockQuizes: (state, action) => {
      state.quizes = action.payload;
    },
    setDefaultQuizes: (state, action) => {
      state.defaultQuizes = action.payload;
    },
    clearMockQuizes: (state) => {
      state.quizes = null;
    },
    setAttempt: (state, action) => {
      state.attempt = action.payload;
    },
    clearAttempt: (state) => {
      state.attempt = null;
    },
    setReviewAnswerEnabled: (state, action) => {
      state.reviewAnswerEnabled = action.payload;
    },
    setShowDisclaimer: (state, action) => {
      state.showDisclaimer = action.payload;
    },
    setStartQuizId: (state, action) => {
      state.startQuizId = action.payload;
    },
  },
});

export const {
  setMockQuizes,
  clearMockQuizes,
  setAttempt,
  setDefaultQuizes,
  clearAttempt,
  setReviewAnswerEnabled,
  setShowDisclaimer,
  setStartQuizId,
} = mockQuizesSlice.actions;
export default mockQuizesSlice.reducer;
