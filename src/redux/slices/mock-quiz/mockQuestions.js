import { createSlice } from "@reduxjs/toolkit";
import shuffleArray from "../../../utils/mock-quiz/suffleArray";

const initialState = {
  questions: [],
  currentQuestionIdx: 0,
  currentSubQuestionIdx: null,
  courseId: null,
  createdAt: null,
  hasSubmitted: null,
  id: null,
  platFormId: null,
  quizId: null,
  timeTaken: null,
  updatedAt: null,
  userId: null,
  watchQuiestionId: null,
};

export const mockQuestionsSlice = createSlice({
  name: "mockQuestions",
  initialState,
  reducers: {
    setMockQuestions: (state, action) => {
      state.questions = addQuestionIndexes(action.payload?.Quiz?.Questions);
      state.courseId = action.payload?.courseId;
      state.createdAt = action.payload?.createdAt;
      state.hasSubmitted = action.payload?.hasSubmitted;
      state.id = action.payload?.id;
      state.platFormId = action.payload?.platFormId;
      state.quizId = action.payload?.quizId;
      state.timeTaken = action.payload?.timeTaken;
      state.updatedAt = action.payload?.updatedAt;
      state.userId = action.payload?.userId;
    },
    resetAll: (state) => {
      //reset to initial state
      state = initialState;
      return state;
    },
    clearMockQuestions: (state) => {
      //reset to initial state
      state = initialState;
      return state;
    },
    setWatchQuestionId: (state, action) => {
      state.watchQuiestionId = action.payload;
    },

    setCurrentQuestionIdx(state, action) {
      state.currentQuestionIdx = action.payload;
      state.currentSubQuestionIdx = null; // reset subQuestion when switching main question
    },
    setCurrentSubQuestionIdx(state, action) {
      state.currentSubQuestionIdx = action.payload; // just the number (e.g., 0, 1, 2)
    },
    updateAnswer: (state, action) => {
      const { questionId, updatedAnswer } = action.payload;

      const update = (questions) => {
        for (let question of questions) {
          if (question.id === questionId) {
            if (question.Answers && question.Answers.length > 0) {
              question.Answers[0] = { ...updatedAnswer };
            } else {
              question.Answers = [{ ...updatedAnswer }];
            }
            return true; // updated successfully
          }

          if (question.Questions && question.Questions.length > 0) {
            const found = update(question.Questions); // recursively update children
            if (found) return true;
          }
        }
        return false;
      };

      update(state.questions);
    },
    updateReport: (state, action) => {
      const { questionId, updatedReport } = action.payload;

      const update = (questions) => {
        for (let question of questions) {
          if (question.id === questionId) {
            if (!Array.isArray(question.UserReports)) {
              question.UserReports = [];
            }
            question.UserReports.push({ ...updatedReport });
            return true;
          }

          if (question.Questions && question.Questions.length > 0) {
            const found = update(question.Questions);
            if (found) return true;
          }
        }
        return false;
      };

      update(state.questions);
    },

    updateFlagged: (state, action) => {
      const { questionId, updatedFlagged } = action.payload;

      const update = (questions) => {
        for (let question of questions) {
          if (question.id === questionId) {
            if (updatedFlagged === null) {
              // Remove the flagged object from the UserFlags array
              question.UserFlags = [];
            } else if (question.UserFlags && question.UserFlags.length > 0) {
              question.UserFlags[0] = { ...updatedFlagged };
            } else {
              //i need to replace the object in the array
              question.UserFlags = [{ ...updatedFlagged }];
            }
            return true; // updated successfully
          }

          if (question.Questions && question.Questions.length > 0) {
            const found = update(question.Questions); // recursively update children
            if (found) return true;
          }
        }
        return false;
      };

      update(state.questions);
    },

    updateOptions: (state, action) => {
      const { questionId, updatedOptions } = action.payload;

      const update = (questions) => {
        for (let question of questions) {
          if (question.id === questionId) {
            question.Option = [...updatedOptions];
            return true; // updated successfully
          }

          if (question.Questions && question.Questions.length > 0) {
            const found = update(question.Questions); // recursively update children
            if (found) return true;
          }
        }
        return false;
      };

      update(state.questions);
    },

    updateMockQuestions: (state, action) => {
      const { questionId, updatedQuestion } = action.payload;
      const questionIndex = state.questions.findIndex(
        (question) => question.id === questionId
      );
      if (questionIndex !== -1) {
        state.questions[questionIndex] = {
          ...state.questions[questionIndex],
          ...updatedQuestion,
        };
      }
    },
    setHasSubmitted: (state, action) => {
      state.hasSubmitted = action.payload;
    },
  },
});
export const {
  setMockQuestions,
  clearMockQuestions,
  updateMockQuestions,
  setCurrentQuestionIdx,
  setCurrentSubQuestionIdx,
  updateAnswer,
  updateReport,
  updateFlagged,
  updateOptions,
  setWatchQuestionId,
  setHasSubmitted,
  resetAll,
} = mockQuestionsSlice.actions;
export default mockQuestionsSlice.reducer;

const addQuestionIndexes = (questions) => {
  const addIndexRecursively = (questionList, parentIndex = "") => {
    return questionList.map((question, i) => {
      const indexStr = parentIndex ? `${parentIndex}.${i + 1}` : `${i + 1}`;
      const optionsWithRightOption = question?.Option?.map((option) => {
        if (option?.RightOption?.optionId) {
          option?.Explaination?.push(question?.Explaination);
        }
        return option;
      });
      // console.log("optionsWithRightOption", optionsWithRightOption);
      const newQuestion = {
        ...question,
        questionIndex: indexStr,
        Option: question?.Option ? shuffleArray(optionsWithRightOption) : [],
      };
      // console.log("newQuestion", newQuestion);

      if (question?.Questions?.length > 0) {
        newQuestion.Questions = addIndexRecursively(
          question.Questions,
          indexStr
        );
      }

      return newQuestion;
    });
  };

  return addIndexRecursively(questions);
};
