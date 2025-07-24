import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  answers: [],
  answerSortOption: "all",
  selectedAnswer: null,
};

export const doubtForumQuestionDetailsAnswer = createSlice({
  name: "doubtForumQuestionDetailsAnswer",
  initialState,
  reducers: {
    setSelectedQuestionAnswers: (state, action) => {
      state.answers = action.payload;
    },

    addInAnswers: (state, action) => {
      const answers = {
        ...action.payload,
        Likes: [],
        likeCount: 0,
        dislikeCount: 0,
      };
      state.answers = [answers, ...state.answers];
    },

    setSelectedAnswer: (state, action) => {
      state.selectedAnswer = action.payload;
    },

    deleteFromAnswers: (state, action) => {
      const answerId = action.payload;
      state.answers = state.answers.filter((answer) => answer.id !== answerId);
    },

    editAnswer: (state, action) => {
      const answers = JSON.parse(JSON.stringify(state.answers));
      const answerIdx = answers.findIndex(
        (answer) => answer.id === action.payload.id
      );
      const likes = answers[answerIdx].Likes;
      answers[answerIdx] = action.payload;
      answers[answerIdx].Likes = likes;
      state.answers = [...answers];
    },

    setAnswerSortOption: (state, action) => {
      state.answerSortOption = action.payload;
      const tempAnswers = JSON.parse(JSON.stringify(state.answers));
      const answers = sortAnswers(tempAnswers, action.payload);
      state.answers = [...answers];
    },

    likeAnswer: (state, action) => {
      const answerId = action.payload;
      const answers = JSON.parse(JSON.stringify(state.answers));

      const answerIdx = answers.findIndex((answer) => answer.id === answerId);
      const answer = answers[answerIdx];
      if (answer?.Likes?.length > 0) {
        if (answer.Likes[0].liked === false) {
          answer.likeCount += 1;
          answer.dislikeCount -= 1;
          answer.Likes[0].liked = true;
        } else {
          answer.likeCount -= 1;
          answer.Likes = [];
        }
      } else {
        answer.likeCount += 1;
        const likeObj = {
          answerId: answer?.id,
          liked: true,
        };

        answer?.Likes.push(likeObj);
      }

      answers[answerIdx] = { ...answer };
      state.answers = [...answers];
    },

    disLikeAnswer: (state, action) => {
      const answerId = action.payload;
      const answers = JSON.parse(JSON.stringify(state.answers));

      const answerIdx = answers.findIndex((answer) => answer.id === answerId);
      const answer = answers[answerIdx];
      if (answer?.Likes?.length > 0) {
        if (answer.Likes[0].liked === true) {
          answer.likeCount -= 1;
          answer.dislikeCount += 1;
          answer.Likes[0].liked = false;
        } else {
          answer.dislikeCount -= 1;
          answer.Likes = [];
        }
      } else {
        answer.dislikeCount += 1;
        const likeObj = {
          answerId: answer?.id,
          liked: false,
        };

        answer?.Likes.push(likeObj);
      }

      answers[answerIdx] = { ...answer };
      state.answers = [...answers];
    },
  },
});

const sortAnswers = (answers, answerSortOption) => {
  switch (answerSortOption) {
    case "all": {
      return answers;
    }
    case "recommended": {
      return answers.sort((a, b) => b.likeCount - a.likeCount);
    }

    case "recent": {
      return answers.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    case "oldest":
      return answers.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    default: {
      return answers;
    }
  }
};
// Action creators are generated for each case reducer function
export const {
  setSelectedQuestionAnswers,
  addInAnswers,
  disLikeAnswer,
  likeAnswer,
  setAnswerSortOption,
  editAnswer,
  setSelectedAnswer,
  deleteFromAnswers,
} = doubtForumQuestionDetailsAnswer.actions;

export default doubtForumQuestionDetailsAnswer.reducer;
