import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";
import ProjectReducer from "./ProjectSlice";

const store = configureStore({
  reducer: {
    AuthReducer,
    ProjectReducer,
  },
});

export default store;
