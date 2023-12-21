import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./features/VideoSlice";
import channelStatisticsReducer from "./features/ChannelStatisticsSlice"; 
import ChannelPlaylistSlice from './features/ChannelPlaylistSlice';

const store = configureStore({
  reducer: {
    video: videoReducer,
    channelStatistics: channelStatisticsReducer,
    channelPlaylists : ChannelPlaylistSlice 
  },
});

export default store;
