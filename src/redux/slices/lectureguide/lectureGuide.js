import { createSlice } from "@reduxjs/toolkit";
import lectureGuideDetails from "../../../../lecture-guide-response.json";

const initialState = lectureGuideDetails;

export const lectureGuide = createSlice({
  name: "mockQuizes",
  initialState,
  reducers: {
    allLectures: (state) => {
      return state;
    },
  },
});

export const {} = lectureGuide.actions;
export default lectureGuide.reducer;
