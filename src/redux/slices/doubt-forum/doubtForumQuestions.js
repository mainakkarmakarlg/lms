import { createSlice } from "@reduxjs/toolkit";
// import { dtQuestions } from "../../../dummy/doubtForumQuestions";

const initialState = {
  questions: [],
  page: 0,
  hasMore: false,
};

export const doubtForumQuestions = createSlice({
  name: "doubtForumQuestions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
      // state.questions = dtQuestions;
    },

    appendQuestions: (state, action) => {
      state.questions = [...state.questions, ...action.payload];
    },

    addInQuestions: (state, action) => {
      state.questions = [action.payload, ...state.questions];
    },

    viewQuestion: (state, action) => {
      const questionId = action.payload;
      const questions = JSON.parse(JSON.stringify(state.questions));

      const questionIdx = questions.findIndex(
        (question) => question.id === questionId
      );
      questions[questionIdx].viewCount += 1;
      questions[questionIdx].Views = [
        {
          questionId: questionId,
        },
      ];
      state.questions = [...questions];
    },

    setPage: (state, action) => {
      state.page = action.payload;
    },

    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },

    deleteFromAllQuestions: (state, action) => {
      state.questions = state.questions.filter(
        (question) => question.id !== action.payload
      );
    },

    likeDisLikeQuestionFromQuestions: (state, action) => {
      const questions = JSON.parse(JSON.stringify(state.questions));
      const { questionId, type } = action.payload;
      const questionIdx = state.questions.findIndex(
        (question) => question.id === questionId
      );

      const question = questions[questionIdx];

      if (type === "like") {
        if (question?.Likes?.length > 0) {
          if (question.Likes[0].liked === false) {
            question.Likes[0].liked = true;
            question.likeCount += 1;
            question.dislikeCount -= 1;
          }
        } else {
          question.Likes = [
            {
              questionId: questionId,
              liked: true,
            },
          ];
          question.likeCount += 1;
        }
      } else if (type === "dislike") {
        if (question?.Likes?.length > 0) {
          if (question.Likes[0].liked === true) {
            question.Likes[0].liked = false;
            question.dislikeCount += 1;
            question.likeCount -= 1;
          }
        } else {
          question.Likes = [
            {
              questionId: questionId,
              liked: false,
            },
          ];
          question.dislikeCount += 1;
        }
      }

      state.questions = [...questions];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setQuestions,
  setPage,
  setHasMore,
  addInQuestions,
  appendQuestions,
  deleteFromAllQuestions,
  viewQuestion,
  likeDisLikeQuestionFromQuestions,
} = doubtForumQuestions.actions;

export default doubtForumQuestions.reducer;
