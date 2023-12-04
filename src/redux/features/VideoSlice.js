import { createSlice } from "@reduxjs/toolkit";

// Function to load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

// Function to save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (error) {
    // Handle errors while saving state
  }
};

const initialState = {
  videoDetails: {
    title: "",
    avatar: "",
    channelName: "",
    likeCount: null,
    subsCount: null,
    viewCount: null,
    channelId: "",
    coverImg: "",
    customUrl: "",
    description: "",
    videoCount: null,
  },
};

const persistedState = loadState();

const VideoSlice = createSlice({
  name: "video",
  initialState: persistedState || initialState,
  reducers: {
    setVideoDetails(state, action) {
      state.videoDetails = { ...state.videoDetails, ...action.payload };
      saveState(state); // Save state to localStorage on change
    },
    clearVideoDetails(state) {
      state.videoDetails = initialState.videoDetails;
      saveState(state); // Save state to localStorage on change
    },
  },
});

export default VideoSlice.reducer;
export const { setVideoDetails, clearVideoDetails } = VideoSlice.actions;
