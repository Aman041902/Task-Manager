import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loggedin: false,
  },
  reducers: {
    login(state) {
      state.loggedin = true;
    },
    logout(state) {
      state.loggedin = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
