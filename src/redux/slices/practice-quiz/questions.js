import { createSlice } from "@reduxjs/toolkit";
import findQuestionById from "../../../utils/quizes/practice-quiz/findQuestionById";

const initialState = {
  questions: [],
  flatMappedQuestions: [],
  submittedQuestions: [],
  currentQuestionIdx: 0,
  currentSubQuestionIdx: null,
  answers: [],
  selectedOption: null,
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
      state.flatMappedQuestions = flattenQuestions(action.payload);
    },
    // incrementCurrentQuestionIdx: (state) => {
    //   if (state.currentQuestionIdx < state.questions.length - 1) {
    //     state.currentQuestionIdx += 1;
    //   }
    // },
    // decrementCurrentQuestionIdx: (state) => {
    //   if (state.currentQuestionIdx > 0) {
    //     state.currentQuestionIdx -= 1;
    //   }
    // },

    incrementCurrentQuestionIdx: (state) => {
      const currentItem = state.questions[state.currentQuestionIdx];

      if (currentItem.Questions && currentItem.Questions.length > 0) {
        if (state.currentSubQuestionIdx === null) {
          state.currentSubQuestionIdx = 0; // first sub-question
        } else if (
          state.currentSubQuestionIdx <
          currentItem.Questions.length - 1
        ) {
          state.currentSubQuestionIdx += 1; // move to next sub-question
        } else if (state.currentQuestionIdx < state.questions.length - 1) {
          state.currentQuestionIdx += 1;
          state.currentSubQuestionIdx = null; // reset for next item
        }
      } else if (state.currentQuestionIdx < state.questions.length - 1) {
        state.currentQuestionIdx += 1;
        state.currentSubQuestionIdx = null;
      }
    },

    decrementCurrentQuestionIdx: (state) => {
      const currentItem = state.questions[state.currentQuestionIdx];

      if (currentItem.Questions && currentItem.Questions.length > 0) {
        if (state.currentSubQuestionIdx > 0) {
          state.currentSubQuestionIdx -= 1; // move to previous sub-question
        } else if (
          state.currentSubQuestionIdx === 0 ||
          state.currentSubQuestionIdx === null
        ) {
          if (state.currentQuestionIdx > 0) {
            state.currentQuestionIdx -= 1;
            const prevItem = state.questions[state.currentQuestionIdx];

            if (prevItem.Questions && prevItem.Questions.length > 0) {
              state.currentSubQuestionIdx = prevItem.Questions.length - 1; // go to last sub-question of previous item
            } else {
              state.currentSubQuestionIdx = null;
            }
          }
        }
      } else if (state.currentQuestionIdx > 0) {
        state.currentQuestionIdx -= 1;

        const prevItem = state.questions[state.currentQuestionIdx];
        if (prevItem.Questions && prevItem.Questions.length > 0) {
          state.currentSubQuestionIdx = prevItem.Questions.length - 1;
        } else {
          state.currentSubQuestionIdx = null;
        }
      }
    },

    setCurrentQuestionIdx: (state, action) => {
      state.currentQuestionIdx = action.payload;
    },
    setCurrentSubQuestionIdx: (state, action) => {
      state.currentSubQuestionIdx = action.payload;
    },
    //updateCurrentQuestion
    updateCurrentQuestion: (state, action) => {
      const question = state.questions[state.currentQuestionIdx];

      if (!question) return;

      // If we are targeting a sub-question
      if (
        state.currentSubQuestionIdx !== null &&
        Array.isArray(question.Questions) &&
        question.Questions[state.currentSubQuestionIdx] !== undefined
      ) {
        question.Questions[state.currentSubQuestionIdx] = action.payload;
      } else {
        state.questions[state.currentQuestionIdx] = action.payload;
      }
    },
    addInAnswers: (state, action) => {
      const exists = findQuestionById(
        state.answers,
        action.payload.questionId || action.payload.id
      );
      if (!exists) {
        state.answers = [...state.answers, action.payload];
      }
    },

    addInSubmittedQuestions: (state, action) => {
      const exists = state.submittedQuestions.includes(action.payload);

      if (exists) {
        return;
      }

      state.submittedQuestions = [...state.submittedQuestions, action.payload];
    },

    setSelectedOption: (state, action) => {
      state.selectedOption = action.payload;
    },

    clearQuestionState: (state) => {
      state.currentQuestionIdx = 0;
      state.answers = [];
      state.questions = [];
      state.submittedQuestions = [];
    },
  },
});

export const {
  setQuestions,
  incrementCurrentQuestionIdx,
  decrementCurrentQuestionIdx,
  setCurrentQuestionIdx,
  setCurrentSubQuestionIdx,
  updateCurrentQuestion,
  addInAnswers,
  addInSubmittedQuestions,
  clearQuestionState,
  setSelectedOption,
} = questionsSlice.actions;

export default questionsSlice.reducer;

function flattenQuestions(data) {
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
