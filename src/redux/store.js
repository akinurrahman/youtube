// import { configureStore } from "@reduxjs/toolkit";
// import videoReducer from "./features/VideoSlice";
// import channelStatisticsReducer from "./features/ChannelStatisticsSlice";
// import ChannelPlaylistSlice from './features/ChannelPlaylistSlice';

// const store = configureStore({
//   reducer: {
//     video: videoReducer,
//     channelStatistics: channelStatisticsReducer,
//     channelPlaylists : ChannelPlaylistSlice
//     []
//   },
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import  {youtubeService}  from "../api/youtubeService"
const store = configureStore({
  reducer: {
    [youtubeService.reducerPath]: youtubeService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(youtubeService.middleware),
});

export default store;




