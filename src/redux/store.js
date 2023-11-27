import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./features/VideoSlice";

const store = configureStore({
  reducer: {
    video: videoReducer,
  },
});

export default store;
