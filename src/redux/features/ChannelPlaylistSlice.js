import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playListsFetched: false,
  lastChannelId: null,
};
const ChannelPlaylistSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    setPlayListsFetched(state, action) {
      state.playListsFetched = action.payload;
    },
    setLastChannelId(state, action) {
      state.lastChannelId = action.payload;
    },
  },
});
export default ChannelPlaylistSlice.reducer;
export const { setPlayListsFetched,setLastChannelId } = ChannelPlaylistSlice.actions;
