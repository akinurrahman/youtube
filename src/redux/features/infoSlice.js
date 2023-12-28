import { createSlice } from "@reduxjs/toolkit";

const infoSlice = createSlice({
  name: "info",
  initialState: {
    title: "",
    searchQuery: "",
  },
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export default infoSlice.reducer;
export const { setTitle, setSearchQuery } = infoSlice.actions;
