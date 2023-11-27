import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videoDetails: {
    title: "",
    likeCount: null,
    viewCount: null,
    channelAvatar:'',
    channelName:'',
    subscriberCount: null,
  },
};

const VideoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideoDetailss(state, action) {
      state.videoDetails = { ...state.videoDetails, ...action.payload };
    },
  },
});
export default VideoSlice.reducer;
export const { setVideoDetailss } = VideoSlice.actions;
