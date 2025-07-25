import { createSlice } from "@reduxjs/toolkit";
import lectureGuideDetails from "../../../../lecture-guide-response.json";

const initialState = {
  details: lectureGuideDetails,
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

    resetFilteredLectures: (state) => {
      state.filteredLectures = [];
    },
  },
});

export const { filterAllLectures, resetFilteredLectures } =
  lectureGuide.actions;

export default lectureGuide.reducer;
