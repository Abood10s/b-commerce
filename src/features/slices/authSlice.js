import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  // !! converts it to Boolean
  authenticated: !!storedUser,
  user: storedUser || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.authenticated = true;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout(state) {
      state.authenticated = false;
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
