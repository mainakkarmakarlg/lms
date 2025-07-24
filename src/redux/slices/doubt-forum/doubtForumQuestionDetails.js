import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedQuestion: null,
  question: null,
  showQuestionDetails: false,
};

export const doubtForumQuestionDetails = createSlice({
  name: "doubtForumQuestionDetails",
  initialState,
  reducers: {
    setSelectedQuestion: (state, action) => {
      state.selectedQuestion = action.payload;
    },

    openQuestionDetails: (state) => {
      state.showQuestionDetails = true;
    },

    closeQuestionDetails: (state) => {
      state.showQuestionDetails = false;
    },

    setQuestion: (state, action) => {
      state.question = action.payload;
    },

    appendAnswerInQuestion: (state, action) => {
      const temp = JSON.parse(JSON.stringify(state.question));

      temp.Answers = [action.payload, ...temp.Answers];
      state.question = { ...temp };
    },

    likeCurrentQuestion: (state) => {
      const question = JSON.parse(JSON.stringify(state.question));
      if (question?.Likes?.length > 0) {
        if (question.Likes[0].liked === false) {
          question.likeCount += 1;
          question.dislikeCount -= 1;
          question.Likes[0].liked = true;
        } else {
          question.likeCount -= 1;
          question.Likes = [];
        }
      } else {
        question.likeCount += 1;
        const likeObj = {
          questionId: question?.id,
          liked: true,
        };

        question?.Likes.push(likeObj);
      }

      state.question = { ...question };
    },

    dislikeCurrentQuestion: (state) => {
      const question = JSON.parse(JSON.stringify(state.question));
      if (question?.Likes?.length > 0) {
        if (question.Likes[0].liked === true) {
          question.likeCount -= 1;
          question.dislikeCount += 1;
          question.Likes[0].liked = false;
        } else {
          question.dislikeCount -= 1;
          question.Likes = [];
        }
      } else {
        question.dislikeCount += 1;
        const likeObj = {
          questionId: question?.id,
          liked: false,
        };

        question?.Likes.push(likeObj);
      }

      state.question = { ...question };
    },

    pinCurrentQuestion: (state) => {
      const question = JSON.parse(JSON.stringify(state.question));
      if (question?.Pinned?.length > 0) {
        question.Pinned = [];
      } else {
        const pinObbj = {
          questionId: question?.id,
        };
        question?.Pinned.push(pinObbj);
      }

      state.question = { ...question };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSelectedQuestion,
  openQuestionDetails,
  closeQuestionDetails,
  setQuestion,
  appendAnswerInQuestion,
  likeCurrentQuestion,
  dislikeCurrentQuestion,
  pinCurrentQuestion,
} = doubtForumQuestionDetails.actions;

export default doubtForumQuestionDetails.reducer;
