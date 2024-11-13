import { configureStore } from "@reduxjs/toolkit";
import confirmReducer from "./confirmSlice";

const store = configureStore({
  reducer: {
    confirm: confirmReducer,
  },
});

export default store;
