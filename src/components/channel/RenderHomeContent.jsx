import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getYouTubeData } from "../../api/queries";
import { formatDuration } from "../../helpers/formatDuration";
import { calculateTimeAgo } from "../../helpers/calculateTimeAgo";
import { formatCount } from "../../helpers/formatCount";
import { useNavigate } from "react-router-dom";

const RenderHomeContent = ({ item, isPlaylist }) => {
  const navigate = useNavigate();
  const videoId = item.id.videoId || "";

  // Fetch video info using useQuery
  const { data: videoInfo } = useQuery({
    queryKey: ["videoInfo", videoId],
    queryFn: () =>
      getYouTubeData({
        endpoint: "videos",
        queryParams: {
          part: "snippet,contentDetails,statistics",
          id: videoId,
        },
      }),
    enabled: !!videoId,
    staleTime: 1000 * 60 * 5,
  });

  // Extract statistics and content details from video info
  const { statistics, contentDetails } = videoInfo?.items[0] || {};

  // Extract necessary video details
  const thumbnail = item?.snippet.thumbnails.medium.url || "";
  const rawDuration = contentDetails?.duration || "";
  const rawView = statistics?.viewCount || "";
  const duration = rawDuration ? formatDuration(rawDuration) : "";
  const viewCount = rawView ? formatCount(rawView) : "";
  const title = item?.snippet.title || "";
  const publishedAt = item?.snippet.publishedAt || "";
  const timeAgo = publishedAt ? calculateTimeAgo(publishedAt) : "";

  // Function to handle navigation based on playlist or single video
  const handleNavigate = () => {
    if (isPlaylist === "Playlists") {
      navigate(`/playlist/${item.id}`);
    } else {
      navigate(`/watch/${videoId}`);
    }
  };

  return (
    <div className="flex flex-col" onClick={handleNavigate}>
      <div className="relative h-[95px] w-[150px] text-white sm:h-[117px] sm:w-[194px]">
        <img
          src={thumbnail}
          alt=""
          className="mr-2 w-full rounded-lg sm:w-full sm:max-w-full"
        />
        <p className="absolute bottom-[17px] right-[6px] z-10 rounded-md bg-black bg-opacity-70 px-2">
          {duration}
        </p>
      </div>

      <div className="w-[150px] sm:w-[194px]">
        <h2 className="line-clamp-2 leading-none">{title}</h2>
        {isPlaylist === "Playlists" ? (
          <p className="line-clamp-1 text-sm font-extralight">
            Watch full Playlist • {timeAgo}
          </p>
        ) : (
          <p className="line-clamp-1 text-sm font-extralight">
            {viewCount} views • {timeAgo}
          </p>
        )}
      </div>
    </div>
  );
};

export default RenderHomeContent;
