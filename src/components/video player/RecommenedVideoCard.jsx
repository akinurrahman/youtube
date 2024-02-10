import React from "react";
import { calculateTimeAgo } from "../../helpers/calculateTimeAgo";
import { formatCount } from "../../helpers/formatCount";
import {  useNavigate } from "react-router-dom";
import { formatDuration } from "../../helpers/formatDuration";
import { useQuery } from "@tanstack/react-query";
import { getYouTubeData } from "../../api/queries";

const RecommenedVideoCard = ({ video }) => {
  const navigate = useNavigate();

  // Destructuring video data
  const thumbnail = video?.snippet.thumbnails.medium.url || "N/A";
  const channelName = video?.snippet.channelTitle || "N/A";
  const title = video?.snippet.title || "N/A";
  const publishedAt = video?.snippet.publishedAt || "N/A";
  const videoID = video?.id.videoId || "N/A";

  // Calculate time ago from published date
  const timeAgo = publishedAt ? calculateTimeAgo(publishedAt) : "N/A";

  // Fetch video info using react-query
  const { data: videoInfo } = useQuery({
    queryKey: ["videoInfo", videoID],
    queryFn: () =>
      getYouTubeData({
        endpoint: "videos",
        queryParams: {
          part: "statistics,contentDetails",
          id: videoID,
        },
      }),
    enabled: !!videoID,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Extract duration and view count from video info
  const rawDuration = videoInfo?.items?.[0]?.contentDetails?.duration || "N/A";
  const rawView = videoInfo?.items?.[0]?.statistics?.viewCount || "N/A";
  const duration = rawDuration && formatDuration(rawDuration);
  const viewCount = rawView && formatCount(rawView);

  // Function to handle navigation to video details page
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div
      className="mx-2 my-4 flex space-x-2 sm:mx-3"
      onClick={() => handleNavigate(`/watch/${videoID}`)}
    >
      {/* Video thumbnail */}
      <div className="img-container relative my-3 h-[107px] text-white">
        <img
          src={thumbnail}
          alt="thumbnail"
          className="img max-w-[191px] rounded-lg sm:max-w-[235px] md:max-w-[290px] lg:max-w-[160px] xl:max-w-[190px]"
        />
        {/* Display duration on thumbnail */}
        <p className="absolute bottom-2 right-3 z-10 rounded-md bg-black bg-opacity-70 px-2">
          {duration}
        </p>
      </div>

      {/* Video title, channel name, views, and time */}
      <div className="flex flex-col gap-1">
        <h2 className="line-clamp-2 font-bold text-gray-900">{title}</h2>
        <p className="line-clamp-1 text-sm text-gray-700">{channelName}</p>
        <p className="line-clamp-1 text-sm text-gray-700">
          {viewCount} views • {timeAgo}
        </p>
      </div>
    </div>
  );
};

export default RecommenedVideoCard;
