import { createSlice } from "@reduxjs/toolkit";
import extractQuestionFromchild from "../../../utils/mock-quiz/extractQuestionFromchild";

const initialState = {
  navigatorCollapsed: true,
  showFlagged: false,
  showAttempted: false,
  showUnattempted: false,
  showCorrected: false,
  showInCorrected: false,
  filteredQuestions: [],
  flaggedQuestions: [],
  expandedNavigatorQuestions: [],
};

export const mockQuestionNavigatorSlice = createSlice({
  name: "mockQuestionNavigator",
  initialState,
  reducers: {
    toggleQuestionNavigator: (state) => {
      state.navigatorCollapsed = !state.navigatorCollapsed;
    },
    toggleFlagged: (state) => {
      const newFilteredQuestions = getFilteredQuestions(
        state.expandedNavigatorQuestions,
        {
          showFlagged: !state.showFlagged,
          showAttempted: state.showAttempted,
          showUnattempted: state.showUnattempted,
          showCorrected: state.showCorrected,
          showInCorrected: state.showInCorrected,
        }
      );
      state.filteredQuestions = [...newFilteredQuestions];
      state.showFlagged = !state.showFlagged;
    },
    toggleAttempted: (state) => {
      const newFilteredQuestions = getFilteredQuestions(
        state.expandedNavigatorQuestions,
        {
          showFlagged: state.showFlagged,
          showAttempted: !state.showAttempted,
          showUnattempted: state.showUnattempted,
          showCorrected: state.showCorrected,
          showInCorrected: state.showInCorrected,
        }
      );
      state.showAttempted = !state.showAttempted;
      state.filteredQuestions = [...newFilteredQuestions];
    },
    toggleUnattempted: (state) => {
      const newFilteredQuestions = getFilteredQuestions(
        state.expandedNavigatorQuestions,
        {
          showFlagged: state.showFlagged,
          showAttempted: state.showAttempted,
          showUnattempted: !state.showUnattempted,
          showCorrected: state.showCorrected,
          showInCorrected: state.showInCorrected,
        }
      );
      state.showUnattempted = !state.showUnattempted;
      state.filteredQuestions = [...newFilteredQuestions];
    },
    toggleCorrected: (state) => {
      const newFilteredQuestions = getFilteredQuestions(
        state.expandedNavigatorQuestions,
        {
          showFlagged: state.showFlagged,
          showAttempted: state.showAttempted,
          showUnattempted: !state.showUnattempted,
          showCorrected: state.showCorrected,
          showInCorrected: state.showInCorrected,
        }
      );
      state.showCorrected = !state.showCorrected;
      state.filteredQuestions = [...newFilteredQuestions];
    },
    toggleInCorrected: (state) => {
      const newFilteredQuestions = getFilteredQuestions(
        state.expandedNavigatorQuestions,
        {
          showFlagged: state.showFlagged,
          showAttempted: state.showAttempted,
          showUnattempted: !state.showUnattempted,
          showCorrected: state.showCorrected,
          showInCorrected: state.showInCorrected,
        }
      );
      state.showInCorrected = !state.showInCorrected;
      state.filteredQuestions = [...newFilteredQuestions];
    },
    setFilteredQuestions: (state, action) => {
      const newExpandedNavigatorQuestions = extractQuestionFromchild(
        action.payload
      );
      state.expandedNavigatorQuestions = [...newExpandedNavigatorQuestions];
      state.filteredQuestions = [...newExpandedNavigatorQuestions];
    },
    setExpandedNavigatorQuestions: (state, action) => {
      const newExpandedNavigatorQuestions = extractQuestionFromchild(
        action.payload
      );

      state.expandedNavigatorQuestions = [...newExpandedNavigatorQuestions];
    },
    resetNavigator: (state) => {
      state.navigatorCollapsed = true;
      state.showFlagged = false;
      state.showAttempted = false;
      state.showUnattempted = false;
      state.showCorrected = false;
      state.showInCorrected = false;
      state.filteredQuestions = [];
      state.flaggedQuestions = [];
      state.expandedNavigatorQuestions = [];
    },
  },
});

export const {
  toggleQuestionNavigator,
  toggleFlagged,
  toggleAttempted,
  toggleUnattempted,
  toggleCorrected,
  toggleInCorrected,
  setFilteredQuestions,
  setExpandedNavigatorQuestions,
  resetNavigator,
} = mockQuestionNavigatorSlice.actions;

export default mockQuestionNavigatorSlice.reducer;

// const getFilteredQuestions = (questions, filterOptions) => {
//   const {
//     showFlagged,
//     showAttempted,
//     showUnattempted,
//     // showCorrected,
//     // showInCorrected,
//   } = filterOptions;

//   const newFilteredQuestions = [];

//   // const filterRecursively = (questionList) => {
//   questions?.forEach((question) => {
//     const isFlagged = question.UserFlags?.length > 0;
//     const isAttempted = question.Answers?.[0]?.optionId;
//     // const isCorrected = question.Answers?.[0]?.isCorrected;
//     // const isInCorrected = question.Answers?.[0]?.isInCorrected;

//     const matchesFilter =
//       (showFlagged && isFlagged) ||
//       (showAttempted && isAttempted) ||
//       (showUnattempted && !isAttempted);
//     // || (showCorrected && isCorrected)
//     // || (showInCorrected && isInCorrected);

//     if (matchesFilter) {
//       newFilteredQuestions.push(question);
//     }

//     // Recursive call for sub-questions
//     // if (question?.Questions?.length > 0) {
//     //   filterRecursively(question.Questions);
//     // }
//   });
//   // };

//   // filterRecursively(questions);

//   return newFilteredQuestions;
// };

const getFilteredQuestions = (questions, filterOptions) => {
  const {
    showFlagged,
    showAttempted,
    showUnattempted,
    // showCorrected,
    // showInCorrected,
  } = filterOptions;

  const allFiltersOff = !showFlagged && !showAttempted && !showUnattempted;
  // &&
  // !showCorrected &&
  // !showInCorrected;

  const newFilteredQuestions = [];

  questions?.forEach((question) => {
    const isFlagged = question.UserFlags?.length > 0;
    const isAttempted = !!question.Answers?.[0]?.optionId;
    // const userAttemptId = question.Answers?.[0]?.attemptId;
    // const correctId = question?.Option?.find(
    //   (option) => option?.RightOption?.optionId
    // );
    // console.log(
    //   "correctId",
    //   JSON.parse(JSON.stringify(question.Option)),
    //   correctId
    // );
    // const isCorrected = correctId === userAttemptId;
    // const isInCorrected = !isCorrected;

    if (allFiltersOff) {
      newFilteredQuestions.push(question);
      return;
    }

    const matchesFilter =
      (showFlagged && isFlagged) ||
      (showAttempted && isAttempted) ||
      (showUnattempted && !isAttempted);
    // || (showCorrected && isCorrected)
    // || (showInCorrected && isInCorrected);

    if (matchesFilter) {
      newFilteredQuestions.push(question);
    }
  });

  return newFilteredQuestions;
};
