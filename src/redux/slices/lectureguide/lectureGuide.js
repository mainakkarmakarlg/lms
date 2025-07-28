import { createSlice } from "@reduxjs/toolkit";
import lectureGuideDetails from "../../../../lecture-guide-response.json";

const initialState = {
  details: lectureGuideDetails,
  customDetails: lectureGuideDetails,
  chapter: [],
  filteredLectures: [],
};

export const lectureGuide = createSlice({
  name: "lectureGuide",
  initialState,
  reducers: {
    filterAllLectures: (state, action) => {
      const { mid, cid } = action.payload;
      const mainSubject = state.details.find((d) => d.id === mid);

      if (mainSubject) {
        const subject = mainSubject.Subjects.find((s) => s.id === cid);
        if (subject) {
          state.filteredLectures = subject.chapterLectures;
        } else {
          state.filteredLectures = [];
        }
      } else {
        state.filteredLectures = [];
      }
    },

    updateCustomDetails: (state, action) => {
      const updatedDetails = action.payload;
      state.customDetails = updatedDetails;
    },

    subjectFilter: (state) => {
      const chapterDetails = state.details.flatMap((s) => s.Subjects);
      state.chapter = chapterDetails;
    },

    resetFilteredLectures: (state) => {
      state.filteredLectures = [];
    },
  },
});

export const {
  filterAllLectures,
  updateCustomDetails,
  resetFilteredLectures,
  subjectFilter,
} = lectureGuide.actions;

export default lectureGuide.reducer;
