import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timeTaken: 0,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setTimeTaken: (state, action) => {
      state.timeTaken = action.payload;
    },
  },
});

export const { setTimeTaken } = timerSlice.actions;

export default timerSlice.reducer;
