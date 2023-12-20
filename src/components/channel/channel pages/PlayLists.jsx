import React, { useEffect } from "react";
import ChannelLayout from "../ChannelLayout";
import useApi from "../../../hooks/useApi";
import { NavLink, useParams } from "react-router-dom";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatisticsFailure, fetchStatisticsSuccess, setStatisticsFetched } from "../../../redux/features/ChannelStatisticsSlice";

const PlayLists = () => {
  const { channelId } = useParams();
  const dispatch = useDispatch();

  // Fetching statistics status from the Redux store
  const { statisticsFetched } = useSelector((state) => state.channelStatistics);

  // Fetching playlists data from an API
  const { fetchData: fetchPlayLists, data: playLists } = useApi();

  // Fetching channel statistics data from an API
  const { fetchData: fetchChannelTop, data: statistics, error: statisticsError } = useApi();

  // Fetch channel statistics only once when channelId changes and statistics haven't been fetched yet
  useEffect(() => {
    if (!statisticsFetched && channelId) {
      // Dispatch an action to set the flag for statistics fetching
      dispatch(setStatisticsFetched());
      
      // Fetch statistics data from the API
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

  // Fetch playlists on channelId change
  useEffect(() => {
    if (channelId) {
      const url = "playlists";
      const params = {
        part: "snippet,contentDetails",
        channelId: channelId,
        maxResults: 5,
      };
      fetchPlayLists(url, params);
    }
  }, [channelId]);

  // Render playlists based on the fetched data
  const renderPlaylists = () => {
    return playLists?.items?.map((playlist, index) => {
      // Extract playlist details
      const snippet = playlist?.snippet;
      const title = snippet?.title || "N/A";
      const thumbnail = snippet?.thumbnails?.medium?.url || "N/A";
      const channelName = snippet?.channelTitle || "N/A";
      const playlistId = playlist?.id;
      const itemCount = playlist?.contentDetails?.itemCount || 0;

      return (
        <NavLink
          to={`/playlist/${playlistId}`}
          className="flex sm:flex-col"
          key={playlistId + index}
        >
          <div className="relative">
            <img
              src={thumbnail}
              alt="thumbnail"
              className="mr-2 max-w-[155px] rounded-lg sm:w-full sm:max-w-full"
            />
            {/* Display item count if it's greater than 0 */}
            {itemCount > 0 && (
              <div className="absolute bottom-2 right-3 z-10 flex items-center gap-[6px] rounded-sm bg-black bg-opacity-70 px-2 text-white">
                <RiMenuUnfoldFill />
                <span className="pb-[2px]">{itemCount}</span>
              </div>
            )}
          </div>
          {/* Playlist details */}
          <div>
            <h2 className="line-clamp-2 font-semibold leading-tight sm:mt-1">
              {title}
            </h2>
            <p className="line-clamp-1 text-sm font-light sm:hidden">
              {channelName} • Playlist
            </p>
            <p className="line-clamp-1 hidden text-sm font-light sm:block">
              View full Playlist
            </p>
          </div>
        </NavLink>
      );
    });
  };

  return (
    <ChannelLayout>
      {/* Display playlists */}
      <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {renderPlaylists()}
      </div>
    </ChannelLayout>
  );
};

export default PlayLists;
