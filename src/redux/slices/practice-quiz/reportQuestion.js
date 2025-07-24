import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reportedQuestions: [],
  showReportPopup: false,
};

export const reportedQuestionSlice = createSlice({
  name: "reportedQuestions",
  initialState,
  reducers: {
    addInReportedQuestions: (state, action) => {
      const exists = state.reportedQuestions.includes(action.payload);

      if (exists) {
        return;
      }

      state.reportedQuestions = [...state.reportedQuestions, action.payload];
    },

    setReportedQuestions: (state, action) => {
      state.reportedQuestions = action.payload;
    },

    openReportPopup: (state) => {
      state.showReportPopup = true;
    },

    closeReportPopup: (state) => {
      state.showReportPopup = false;
    },
  },
});

export const {
  addInReportedQuestions,
  closeReportPopup,
  openReportPopup,
  setReportedQuestions,
} = reportedQuestionSlice.actions;

export default reportedQuestionSlice.reducer;
