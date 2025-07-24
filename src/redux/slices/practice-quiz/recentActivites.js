import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recentActivities: [],
  page: 0,
  isShowMore: false,
};

export const recentActivitiesSlice = createSlice({
  name: "recentActivities",
  initialState,
  reducers: {
    setRecentActivities: (state, action) => {
      state.isShowMore = action.payload.length > 9;

      // Filter out only new unique items
      const newItems = action.payload.filter(
        (newItem) =>
          !state.recentActivities.some(
            (existingItem) => existingItem.id === newItem.id
          )
      );

      // Merge and sort by `createdAt` (latest first)
      state.recentActivities = [...newItems, ...state.recentActivities].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    },

    updatePage: (state) => {
      state.page += 1;
    },
  },
});

export const { setRecentActivities, updatePage } =
  recentActivitiesSlice.actions;

export default recentActivitiesSlice.reducer;
