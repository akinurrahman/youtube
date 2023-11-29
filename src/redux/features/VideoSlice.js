import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videoDetails: {
    title: "",
    avatar: "",
    channelName: "",
    likeCount: null,
    subsCount: null,
    viewCount: null,
  },
};

const VideoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideoDetails(state, action) {
      state.videoDetails = { ...state.videoDetails, ...action.payload };
    },
  },
});
export default VideoSlice.reducer;
export const { setVideoDetails } = VideoSlice.actions;
