import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  accessToken: "",
  refreshToken: "",
  socketConnected: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      if (action.payload.access_token) {
        state.accessToken = action.payload.access_token;
      }

      if (action.payload.refresh_token) {
        state.refreshToken = action.payload.refresh_token;
      }
    },

    setSocketConnected: (state, action) => {
      state.socketConnected = action.payload;
    },

    logoutSuccess: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.accessToken = "";
      state.refreshToken = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginSuccess, logoutSuccess, setSocketConnected } =
  userSlice.actions;

export default userSlice.reducer;
