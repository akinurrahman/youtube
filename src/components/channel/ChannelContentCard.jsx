import { useQuery } from "@tanstack/react-query";
import React from "react";
import { formatDuration } from "../../helpers/formatDuration";
import { getYouTubeData } from "../../api/queries";
import { calculateTimeAgo } from "../../helpers/calculateTimeAgo";
import { formatCount } from "../../helpers/formatCount";
// Render individual video
const ChannelContentCard = ({ video }) => {
  const videoId = video.id.videoId || video.snippet.resourceId.videoId || "";

  const { data: videoInfo } = useQuery({
    queryKey: ["videoInfo", videoId],
    queryFn: () =>
      getYouTubeData({
        endpoint: "videos",
        queryParams: {
          part: "statistics,contentDetails",
          id: videoId,
        },
      }),

    enabled: !!videoId,
    staleTime: 1000 * 60 * 5,
  });
  const { statistics, contentDetails } = videoInfo?.items[0] || {};

  // Extract necessary video details
  const thumbnail = video?.snippet?.thumbnails?.medium?.url || "";
  const rawDuration = contentDetails?.duration || "";
  const rawView = statistics?.viewCount || "";
  const duration = rawDuration ? formatDuration(rawDuration) : "";
  const viewCount = rawView ? formatCount(rawView) : "";
  const title = video?.snippet.title || "";
  const publishedAt = video?.snippet.publishedAt || "";
  const timeAgo = publishedAt ? calculateTimeAgo(publishedAt) : "";

  // Render video details
  return (
    <div className="flex sm:flex-col">
      <div className="relative text-white">
        <img
          src={thumbnail}
          alt=""
          className="mr-2 max-w-[155px] rounded-lg sm:w-full sm:max-w-full"
        />
        <p className="absolute bottom-2 right-3 z-10 rounded-md bg-black bg-opacity-70 px-2">
          {duration}
        </p>
      </div>

      <div>
        <h2 className="line-clamp-3 font-semibold leading-tight sm:mt-1 sm:line-clamp-2">
          {title}
        </h2>
        <p className="line-clamp-1 text-sm font-extralight">
          {viewCount} views • {timeAgo}
        </p>
      </div>
    </div>
  );
};

export default ChannelContentCard;
