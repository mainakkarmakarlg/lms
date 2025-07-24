import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLoader: false,
  isCourseWatched: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setShowLoader: (state, action) => {
      state.showLoader = action.payload;
    },
    setIsCourseWatched: (state, action) => {
      state.isCourseWatched = action.payload;
    },
  },
});

export const { setShowLoader, setIsCourseWatched } = appSlice.actions;
export default appSlice.reducer;

// const data = [
//   {
//     id: 1,
//     question: "testwdycf",
//     Questions: [
//       {
//         id: 2,
//         question: "testwdycf",
//       },
//       {
//         id: 3,
//         question: "testwdycf",
//       },
//       {
//         id: 4,
//         question: "testwdycf",
//       },
//     ],
//   },
//   {
//     id: 5,
//     question: "testwdycf",
//     Questions: [
//       {
//         id: 6,
//         question: "testwdycf",
//       },
//       {
//         id: 7,
//         question: "testwdycf",
//       },
//       {
//         id: 8,
//         question: "testwdycf",
//       },
//     ],
//   },
//   {
//     id: 9,
//     question: "testwdycf",
//   },
// ];
