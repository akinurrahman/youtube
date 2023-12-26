import { configureStore } from "@reduxjs/toolkit";
import { youtubeService } from "../api/youtubeService";
import infoReducer from "./features/infoSlice";
const store = configureStore({
  reducer: {
    info: infoReducer,
    [youtubeService.reducerPath]: youtubeService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(youtubeService.middleware),
});

export default store;
