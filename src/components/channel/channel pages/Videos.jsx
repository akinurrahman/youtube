import React, { useEffect } from "react";
import ChannelLayout from "../ChannelLayout";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useApi from "../../../hooks/useApi";
import {
  fetchStatisticsSuccess,
  setStatisticsFetched,
} from "../../../redux/features/ChannelStatisticsSlice";

const Videos = () => {
  const dispatch = useDispatch();
  const { channelId } = useParams();
  const { statisticsFetched } = useSelector((state) => state.channelStatistics);

  const {
    fetchData: fetchChannelTop,
    data: statistics,
    error: statisticsError,
  } = useApi();

  // Fetch channel statistics on channelId change
  useEffect(() => {
    if (!statisticsFetched && channelId) {
      // Dispatch an action to set the flag
      dispatch(setStatisticsFetched());

      // Fetch statistics
      const url = "channels";
      const params = {
        part: "snippet,statistics,brandingSettings",
        id: channelId,
      };
      fetchChannelTop(url, params);
    }
  }, [channelId, dispatch, statisticsFetched]);

  // Dispatch actions based on fetched statistics or errors
  useEffect(() => {
    if (statistics) {
      dispatch(fetchStatisticsSuccess(statistics));
    } else if (statisticsError) {
      dispatch(fetchStatisticsFailure(statisticsError));
    }
  }, [statistics, statisticsError, dispatch]);

  return <ChannelLayout>this is videos</ChannelLayout>;
};

export default Videos;
