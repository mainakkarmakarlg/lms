import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navigatorCollapsed: true,
  showFlagged: false,
  showAttempted: false,
  showUnattempted: false,
  showCorrected: false,
  showInCorrected: false,
  filteredQuestions: [],
  questions: [],
  flaggedQuestions: [],
};

export const questionNavigatorSlice = createSlice({
  name: "questionNavigator",
  initialState,
  reducers: {
    toggleQuestionNavigator: (state) => {
      state.navigatorCollapsed = !state.navigatorCollapsed;
      if (!state.navigatorCollapsed) {
        const flatMappedQuestions = flattenQuestions(state.filteredQuestions);
        state.filteredQuestions = flatMappedQuestions;
      } else {
        state.showAttempted = false;
        state.showUnattempted = false;
        state.showFlagged = false;
        state.showCorrected = false;
        state.showInCorrected = false;
        state.filteredQuestions = state.questions;
      }
    },

    toggleFlagged: (state, action) => {
      state.showFlagged = !state.showFlagged;
      const answers = action.payload;
      const questions = filterQuestions(
        state.questions,
        state.flaggedQuestions,
        answers,
        state.showFlagged,
        state.showAttempted,
        state.showUnattempted,
        state.showCorrected,
        state.showInCorrected
      );

      state.filteredQuestions = questions;
    },

    toggleAttempted: (state, action) => {
      state.showAttempted = !state.showAttempted;
      const answers = action.payload;
      const questions = filterQuestions(
        state.questions,
        state.flaggedQuestions,
        answers,
        state.showFlagged,
        state.showAttempted,
        state.showUnattempted,
        state.showCorrected,
        state.showInCorrected
      );

      state.filteredQuestions = questions;
    },

    toggleUnattempted: (state, action) => {
      state.showUnattempted = !state.showUnattempted;
      const answers = action.payload;
      const questions = filterQuestions(
        state.questions,
        state.flaggedQuestions,
        answers,
        state.showFlagged,
        state.showAttempted,
        state.showUnattempted,
        state.showCorrected,
        state.showInCorrected
      );

      state.filteredQuestions = questions;
    },

    toggleCorrected: (state, action) => {
      state.showCorrected = !state.showCorrected;
      const answers = action.payload;
      const questions = filterQuestions(
        state.questions,
        state.flaggedQuestions,
        answers,
        state.showFlagged,
        state.showAttempted,
        state.showUnattempted,
        state.showCorrected,
        state.showInCorrected
      );

      state.filteredQuestions = questions;
    },

    toggleInCorrected: (state, action) => {
      state.showInCorrected = !state.showInCorrected;
      const answers = action.payload;
      const questions = filterQuestions(
        state.questions,
        state.flaggedQuestions,
        answers,
        state.showFlagged,
        state.showAttempted,
        state.showUnattempted,
        state.showCorrected,
        state.showInCorrected
      );

      state.filteredQuestions = questions;
    },

    setFilteredQuestions: (state, action) => {
      state.filteredQuestions = action.payload;
      state.questions = action.payload;
    },

    addInFlaggedQuestions: (state, action) => {
      const exists = state.flaggedQuestions.find((question) => {
        return question.questionId === action.payload.questionId;
      });

      if (exists) {
        return;
      }

      state.flaggedQuestions = [...state.flaggedQuestions, action.payload];
    },

    removeFromFlaggedQuestions: (state, action) => {
      state.flaggedQuestions = state.flaggedQuestions.filter((question) => {
        return question.questionId !== action.payload;
      });
    },

    setFlaggedQuestions: (state, action) => {
      state.flaggedQuestions = action.payload;
    },

    // updateCurrentNavigatorQuestion: (state, action) => {
    //   const questionId = action.payload?.Question?.id;
    //   const filteredQuestionsIndex = state.filteredQuestions.findIndex(
    //     (q) => q.Question?.id === questionId
    //   );
    //   console.log("action.payload", action.payload);

    //   //if i got 2 from questionInex then i will get 1 from filteredQuestionsIndex and if i got 2.2 then i will get 2.1 from filteredQuestionsIndex

    //   //   state.questions.findIndex(
    //   //   (q) => q.Question?.id === questionId
    //   // );

    //   if (filteredQuestionsIndex !== -1) {
    //     state.filteredQuestions[filteredQuestionsIndex] = action.payload;
    //   }

    //   // if (questionsIndex !== -1) {
    //   //   state.questions[questionsIndex] = action.payload;
    //   // }

    //   const questionIndex = action.payload?.questionIndex;
    //   const parentId = Number(questionIndex?.split(".")?.[0] || "") - 1;
    //   const childId = Number(questionIndex?.split(".")?.[1] || "") - 1;
    //   if (parentId && childId) {
    //     state.questions[parentId].Questions[childId] = [
    //       ...state.questions[parentId].Questions,
    //       action.payload,
    //     ];
    //   } else if (parentId && !childId) {
    //     state.questions[parentId] = action.payload;
    //   }
    // },

    updateCurrentNavigatorQuestion: (state, action) => {
      const questionIndex = action.payload?.questionIndex;

      // Parse index like "2" or "2.1"
      const [parentStr, childStr] = questionIndex?.split(".") || [];
      const parentId = Number(parentStr) - 1;
      const childId = childStr !== undefined ? Number(childStr) - 1 : null;
      const questionId = action.payload?.Question?.id;
      const filteredQuestionsIndex = state.filteredQuestions.findIndex(
        (q) => q.Question?.id === questionId
      );

      if (!isNaN(parentId) && parentId >= 0) {
        if (childId !== null && !isNaN(childId) && childId >= 0) {
          // Nested update
          if (
            state.questions[parentId]?.Questions &&
            state.questions[parentId].Questions[childId]
          ) {
            // deep copy of above state.questions[parentId].Questions[childId]
            const updatedQuestion = JSON.parse(JSON.stringify(state.questions));
            updatedQuestion[parentId].Questions[childId] = action.payload;
            if (state.navigatorCollapsed) {
              state.filteredQuestions = updatedQuestion;
            } else {
              if (filteredQuestionsIndex !== -1) {
                state.filteredQuestions[filteredQuestionsIndex] =
                  action.payload;
              }
              state.questions[parentId].Questions[childId] = action.payload;
            }
            state.questions = updatedQuestion;
          }
        } else {
          // Top-level update
          state.questions[parentId] = action.payload;
          if (state.navigatorCollapsed) {
            state.filteredQuestions = state.questions;
          } else {
            if (filteredQuestionsIndex !== -1) {
              state.filteredQuestions[filteredQuestionsIndex] = action.payload;
            }
          }
        }
      }
    },

    resetQuestionNavigator: (state) => {
      state.showFlagged = false;
      state.navigatorCollapsed = true;
      state.showAttempted = false;
      state.showUnattempted = false;
      state.filteredQuestions = [];
      state.questions = [];
    },
  },
});

const filterQuestions = (
  questions,
  flaggedQuestions,
  answers,
  showFlagged,
  showAttempted,
  showUnattempted,
  showCorrected,
  showInCorrect
) => {
  const flatMappedQuestions = flattenQuestions(questions);
  if (
    !showAttempted &&
    !showFlagged &&
    !showUnattempted &&
    !showCorrected &&
    !showInCorrect
  ) {
    return flatMappedQuestions;
  }

  const flaggedSet = new Set(flaggedQuestions?.map((q) => q.questionId));
  return flatMappedQuestions.filter((question) => {
    const isAttempted =
      question?.optionId !== null && question?.optionId !== undefined;
    const isUnattempted = question?.optionId == null;
    const isFlagged = flaggedSet.has(question?.Question?.id);

    let isCorrect = false;
    let isInCorrect = false;

    const isCorrected = answers?.find((a) => a.id === question?.Question?.id)
      ?.answer?.Option?.RightOption;

    if (isCorrected) {
      isCorrect = true;
    } else {
      isInCorrect = true;
    }

    // const incorrect = question?.optionId !== correctOptionId?.id;

    return (
      (showAttempted && isAttempted) ||
      (showUnattempted && isUnattempted) ||
      (showFlagged && isFlagged) ||
      (showCorrected && isCorrect) ||
      (showInCorrect && isInCorrect && isAttempted)
    );
  });
};

export const {
  toggleQuestionNavigator,
  toggleFlagged,
  toggleAttempted,
  toggleUnattempted,
  setFilteredQuestions,
  resetQuestionNavigator,
  updateCurrentNavigatorQuestion,
  addInFlaggedQuestions,
  removeFromFlaggedQuestions,
  setFlaggedQuestions,
  toggleCorrected,
  toggleInCorrected,
} = questionNavigatorSlice.actions;

export default questionNavigatorSlice.reducer;

function flattenQuestions(data) {
  console.log("flattenQuestions", data);
  return data.flatMap((item) => {
    // If the parent has Questions array and it's non-empty, return only children Questions
    if (item.Questions && item.Questions.length > 0) {
      // Return each child question object inside Questions
      return item.Questions.map((child) => child);
    } else {
      // No children, return the parent Question as a single element array
      return [item];
    }
  });
}
