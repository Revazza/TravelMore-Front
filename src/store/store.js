import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import notificationSlice from "./notificationSlice";


const store = configureStore({
  reducer:{
    auth:authSlice.reducer,
    notification:notificationSlice.reducer,
  }
});


export const notificationActions = notificationSlice.actions;
export const authSliceActions = authSlice.actions;
export default store;
