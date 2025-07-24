import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subjects: [],
};

export const quizSubjectsSlice = createSlice({
  name: "quizSubjects",
  initialState,
  reducers: {
    setSubjects: (state, action) => {
      state.subjects = action.payload;
    },
    addTopicInSubject: (state, action) => {
      //i got an object {array of topics, subjectId} and you need to check subj
      state.subjects = state.subjects.map((subject) => {
        if (subject.id === action.payload.subjectId) {
          return {
            ...subject,
            Subjects: [...action.payload.topics],
          };
        }
        return subject;
      });
    },
    updateSubject: (state, action) => {
      state.subjects = state.subjects.map((subject) => {
        if (subject.id === action.payload.id) {
          return action.payload;
        }
        return subject;
      });
    },
    updateSubjectTopics: (state, action) => {
      state.subjects = state.subjects.map((subject) => {
        if (subject.id === action.payload.subjectId) {
          return {
            ...subject,
            Subjects: action.payload.topics,
          };
        }
        return subject;
      });
    },

    updateTopic: (state, action) => {
      const { subjectId, topicId, topic } = action.payload;
      state.subjects = state.subjects.map((subject) => {
        if (subject.id === subjectId) {
          return {
            ...subject,
            Subjects: subject.Subjects.map((t) => {
              if (t.id === topicId) {
                return topic;
              }
              return t;
            }),
          };
        }
        return subject;
      });
    },
  },
});

export const {
  setSubjects,
  addTopicInSubject,
  updateSubject,
  updateSubjectTopics,
  updateTopic,
} = quizSubjectsSlice.actions;
export default quizSubjectsSlice.reducer;
