import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  statistics: null,
  error: null,
  statisticsFetched: false,
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
    setStatisticsFetched(state) {
      state.statisticsFetched = true;
    },
  },
});

export const { fetchStatisticsSuccess, fetchStatisticsFailure, setStatisticsFetched } =
  channelStatisticsSlice.actions;
export default channelStatisticsSlice.reducer;
