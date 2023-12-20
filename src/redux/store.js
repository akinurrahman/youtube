import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./features/VideoSlice";
import channelStatisticsReducer from "./features/ChannelStatisticsSlice"; // Correct import name

const store = configureStore({
  reducer: {
    video: videoReducer,
    channelStatistics: channelStatisticsReducer,
  },
});

export default store;
