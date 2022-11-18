import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.token = "";
      document.cookie = `token='';expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
      document.cookie = `tokenExp='';expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    },
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      let date = new Date(action.payload.exp * 1000);
      document.cookie = `token=${state.token};expires=${date}; path=/`;
      if(action.payload.exp)
        document.cookie = `tokenExp=${date};expires=${date}; path=/`;
    },
  },
});

export default authSlice;
