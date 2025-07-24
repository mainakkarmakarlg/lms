import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flaggedQuestions: [],
  showFlagPopup: false,
};

export const flaggedQuestionSlice = createSlice({
  name: "flaggedQuestions",
  initialState,
  reducers: {
    openFlagPopup: (state) => {
      state.showFlagPopup = true;
    },

    closeFlagPopup: (state) => {
      state.showFlagPopup = false;
    },
  },
});

export const { openFlagPopup, closeFlagPopup } = flaggedQuestionSlice.actions;

export default flaggedQuestionSlice.reducer;
