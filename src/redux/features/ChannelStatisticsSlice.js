import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  statistics: null,
  error: null,
  statisticsFetched: false,
  lastChannelId: null, // Track the last channelId
};

const channelStatisticsSlice = createSlice({
  name: "channelStatistics",
  initialState,
  reducers: {
    fetchStatisticsSuccess(state, action) {
      state.statistics = action.payload;
      state.error = null;
    },
    fetchStatisticsFailure(state, action) {
      state.statistics = null;
      state.error = action.payload;
    },
    setStatisticsFetched(state, action) {
      state.statisticsFetched = action.payload;
    },

    setLastChannelId(state, action) {
      state.lastChannelId = action.payload;
    },
  },
});

export const {
  fetchStatisticsSuccess,
  fetchStatisticsFailure,
  setStatisticsFetched,
  setLastChannelId,
} = channelStatisticsSlice.actions;
export default channelStatisticsSlice.reducer;
