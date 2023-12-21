import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setStatisticsFetched,
  setLastChannelId,
  fetchStatisticsSuccess,
  fetchStatisticsFailure,
} from "../redux/features/ChannelStatisticsSlice";
import useApi from "./useApi";

const useChannelStatistics = () => {
  const dispatch = useDispatch();
  const { channelId } = useParams();
  const { statisticsFetched, lastChannelId } = useSelector(
    (state) => state.channelStatistics,
  );

  // Fetch data from an API using a custom hook
  const {
    fetchData: fetchChannelTop,
    data: statistics,
    error: statisticsError,
  } = useApi();

  // Update lastChannelId if it's changed
  useEffect(() => {
    if (lastChannelId !== channelId) {
      dispatch(setStatisticsFetched(false));
      dispatch(setLastChannelId(channelId));
    }
  }, [channelId, lastChannelId, dispatch]);

  // Fetch channel statistics only if not already fetched
  useEffect(() => {
    if (!statisticsFetched && channelId) {
      dispatch(setStatisticsFetched(true));

      const url = "channels";
      const params = {
        part: "snippet,statistics,brandingSettings",
        id: channelId,
      };
      fetchChannelTop(url, params);
    }
  }, [channelId, statisticsFetched, dispatch]);

  // Dispatch actions based on fetched statistics or errors
  useEffect(() => {
    if (statistics) {
      dispatch(fetchStatisticsSuccess(statistics));
    } else if (statisticsError) {
      dispatch(fetchStatisticsFailure(statisticsError));
    }
  }, [statistics, statisticsError, dispatch]);

  return;
};

export default useChannelStatistics;
