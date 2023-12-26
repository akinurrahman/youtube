import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlayListFetched: false,
  lastChannelId: null,
  playLists: null,
};
const ChannelPlaylistSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    setPlayLists(state, action) {
      state.playLists = action.payload;
    },
    setIsPlayListFetched(state, action) {
      state.isPlayListFetched = action.payload;
    },
    setLastChannelId(state, action) {
      state.lastChannelId = action.payload;
    },
  },
});
export default ChannelPlaylistSlice.reducer;
export const { setIsPlayListFetched, setLastChannelId, setPlayLists } =
  ChannelPlaylistSlice.actions;
