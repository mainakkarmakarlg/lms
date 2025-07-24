import { createSlice } from "@reduxjs/toolkit";
import { extractSubjectChapterLosFromQuestion } from "../../../utils/common/extractSubjectChapterLosFromQuestion";
import { findFallNumIdFromQuestion } from "../../../utils/doubt-forum/question/findFallNumId";

const initialState = {
  filteredSubjects: [],
  filteredTopics: [],
  filteredPoints: [],
  sources: [],
  sourceQuestions: [],
  selectedSource: null,
  selectedSourceQuestion: null,
  selectedSubject: null,
  selectedTopic: null,
  selectedPoint: null,
  fallNumId: null,
  questionText: "",
  question: null,
  attachments: [],
};

export const doubtForumEditDoubt = createSlice({
  name: "doubtForumEditDoubt",
  initialState,
  reducers: {
    setSubjects: (state, action) => {
      state.allSubjects = action.payload;
      state.filteredSubjects = action.payload;
    },

    setTopics: (state, action) => {
      state.allTopics = action.payload;
      state.filteredTopics = action.payload;
    },

    setPoints: (state, action) => {
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

    setSources: (state, action) => {
      state.sources = action.payload;
    },

    setQuestions: (state, action) => {
      state.sourceQuestions = action.payload;
    },

    setSelectedSource: (state, action) => {
      state.selectedSource = action.payload;
    },

    setSelectedSourceQuestion: (state, action) => {
      state.selectedSourceQuestion = action.payload;
    },

    setSelectedSubject: (state, action) => {
      state.selectedSubject = action.payload;
    },
    setSelectedTopic: (state, action) => {
      state.selectedTopic = action.payload;
    },
    setSelectedPoint: (state, action) => {
      state.selectedPoint = action.payload.data;
    },
    setQuestionText: (state, action) => {
      state.questionText = action.payload;
    },
    setEditFallId: (state, action) => {
      state.fallNumId = action.payload;
    },

    // created for filtering
    filterTopics: (state, action) => {
      const { subjectId, allSubjects } = action.payload;
      const exists = allSubjects.find((s) => s.id === subjectId);
      if (exists) {
        state.filteredTopics = exists.Subjects;
      }
    },
    filterPoints: (state, action) => {
      const { topicId, allTopics } = action.payload;
      const exists = allTopics.find((t) => t.id === topicId);
      if (exists) {
        state.filteredPoints = exists.Subjects;
      }
    },
    setQuestionToEdit: (state, action) => {
      const { question, allSubjects, allTopics, allPoints } = action.payload;
      state.question = question;
      state.questionText = question?.questionText;

      const { chapter, los, subject } = extractSubjectChapterLosFromQuestion(
        question?.FallNumber?.Subject[0]
      );
      const fallId = findFallNumIdFromQuestion(question);
      state.fallNumId = fallId;

      const selectedSubject = allSubjects.find((s) => s.id === subject?.id);
      const selectedTopic = allTopics.find((t) => t.id === chapter?.id);
      const selectedPoint = allPoints.find((p) => p.id === los?.id);

      state.filteredTopics = selectedSubject?.Subjects;
      state.filteredPoints = selectedTopic?.Subjects;
      state.selectedSubject = selectedSubject?.id;
      state.selectedTopic = selectedTopic?.id;
      state.selectedPoint = selectedPoint?.id;
      state.attachments = question?.attachments;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSubjects,
  setTopics,
  setPoints,
  setFilteredSubjects,
  setFilteredTopics,
  setFilteredPoints,
  setSelectedSubject,
  setSelectedTopic,
  setSelectedPoint,
  setQuestionText,
  setSources,
  setQuestions,
  setSelectedSource,
  setSelectedSourceQuestion,

  setEditFallId,
  filterTopics,
  filterPoints,
  setQuestionToEdit,
} = doubtForumEditDoubt.actions;

export default doubtForumEditDoubt.reducer;
