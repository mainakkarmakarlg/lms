import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedQuestionCount: 0,
  timeLimit: 0,
  customCount: 0,
  showAnswerAfterEachQuestion: false,
  errorForValidCombination: "",
  selectedQuestionsTypes: [
    { name: "flagged", value: false },
    { name: "incorrect", value: false },
    { name: "unattempted", value: true },
    { name: "other", value: true },
  ],
  dificultyLevel: [
    { name: "easy", value: false, lebel: "Easy" },
    { name: "medium", value: false, lebel: "Standard" },
    { name: "hard", value: false, lebel: "Challenging" },
  ],
  customInputValue: "",
};

export const customizeOptionsSlice = createSlice({
  name: "customizeOptions",
  initialState,
  reducers: {
    setSelectedQuestionCount: (state, action) => {
      state.selectedQuestionCount = action.payload;
    },
    setTimeLimit: (state, action) => {
      state.timeLimit = action.payload;
    },
    setShowAnswerAfterEachQuestion: (state, action) => {
      state.showAnswerAfterEachQuestion = action.payload;
    },
    setCustomInputValue: (state, action) => {
      state.customInputValue = action.payload;
    },
    setSelectedQuestionsTypes: (state, action) => {
      const { name, value } = action.payload;

      // Check if the name already exists in the state
      const existingIndex = state.selectedQuestionsTypes.findIndex(
        (item) => item.name === name
      );

      if (existingIndex !== -1) {
        // Update the existing value
        state.selectedQuestionsTypes[existingIndex].value = value;
      } else {
        // Add a new entry
        state.selectedQuestionsTypes.push({ name, value });
      }
    },
    setDificultyLevel: (state, action) => {
      //check if the name already exists in the state
      const { name, value } = action.payload;
      const existingIndex = state.dificultyLevel.findIndex(
        (item) => item.name === name
      );
      if (existingIndex !== -1) {
        // Update the existing value
        state.dificultyLevel[existingIndex].value = value;
      } else {
        // Add a new entry
        state.dificultyLevel.push(action.payload);
      }
    },
    setCustomCount: (state, action) => {
      state.customCount = action.payload;
    },
    resetCustomizeOptions: (state) => {
      state.selectedQuestionCount = 0;
      state.timeLimit = 0;
      state.customCount = 0;
      state.showAnswerAfterEachQuestion = false;
      state.selectedQuestionsTypes = [
        { name: "flagged", value: false },
        { name: "incorrect", value: false },
        { name: "unattempted", value: true },
      ];
      state.dificultyLevel = [
        { name: "easy", value: false, lebel: "Easy" },
        { name: "medium", value: false, lebel: "Standard" },
        { name: "hard", value: false, lebel: "Challenging" },
      ];
    },
    setErrorForValidCombination: (state, action) => {
      state.errorForValidCombination = action.payload;
    },
  },
});

export const {
  setSelectedQuestionCount,
  setTimeLimit,
  setShowAnswerAfterEachQuestion,
  setSelectedQuestionsTypes,
  setDificultyLevel,
  setCustomCount,
  setCustomInputValue,
  resetCustomizeOptions,
  setErrorForValidCombination,
} = customizeOptionsSlice.actions;

export default customizeOptionsSlice.reducer;
