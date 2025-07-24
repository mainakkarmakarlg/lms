import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allSubjects: [],
  allTopics: [],
  allPoints: [],
  filteredSubjects: [],
  filteredTopics: [],
  filteredPoints: [],
};

export const doubtForumsubjects = createSlice({
  name: "doubtForumsubjects",
  initialState,
  reducers: {
    setAllSubjects: (state, action) => {
      state.allSubjects = action.payload;
      state.filteredSubjects = action.payload;
    },

    setAllTopics: (state, action) => {
      state.allTopics = action.payload;
      state.filteredTopics = action.payload;
    },

    setAllPoints: (state, action) => {
      state.allPoints = action.payload;
      state.filteredPoints = action.payload;
    },

    setFilteredSubjects: (state, action) => {
      state.filteredSubjects = action.payload;
    },

    setFilteredTopics: (state, action) => {
      state.filteredTopics = action.payload;
    },

    setFilteredPoints: (state, action) => {
      state.filteredPoints = action.payload;
    },

    filterTopicsBySubject: (state, action) => {
      const { subjectId, allSubjects } = action.payload;
      const exists = allSubjects.find((s) => s.id === subjectId);

      if (exists) {
        state.filteredTopics = exists.Subjects;
      }
    },
    filterPointsByTopic: (state, action) => {
      const { topicId, allTopics } = action.payload;
      const exists = allTopics.find((t) => t.id === topicId);
      if (exists) {
        state.filteredPoints = exists.Subjects;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAllSubjects,
  setAllTopics,
  setAllPoints,
  setFilteredSubjects,
  setFilteredTopics,
  setFilteredPoints,
  filterTopicsBySubject,
  filterPointsByTopic,
} = doubtForumsubjects.actions;

export default doubtForumsubjects.reducer;
