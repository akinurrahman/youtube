import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDuration } from "../../helpers/formatDuration";
import { getYouTubeData } from "../../api/queries";
import { formatCount } from "../../helpers/formatCount";
import { calculateTimeAgo } from "../../helpers/calculateTimeAgo";
import Img from "../lazy load/Img";
// Render individual video
const VideoCard = ({ video }) => {
  const navigate = useNavigate();
  const videoId = video.id.videoId || video.snippet.resourceId.videoId || "";

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
  const { statistics, contentDetails } = videoInfo?.items[0] || {};

  // Extract necessary video details
  const thumbnail = video?.snippet.thumbnails.high.url ?? "";
  const placeholderImg = video?.snippet.thumbnails.default.url ?? "";
  const rawDuration = contentDetails?.duration || "";
  const rawView = statistics?.viewCount || "";
  const duration = rawDuration ? formatDuration(rawDuration) : "";
  const viewCount = rawView ? formatCount(rawView) : "";
  const title = video?.snippet.title || "";
  const publishedAt = video?.snippet.publishedAt || "";
  const timeAgo = publishedAt ? calculateTimeAgo(publishedAt) : "";

  const handleNavigate = () => {
    navigate(`/watch/${videoId}`);
  };

  // Render video details
  return (
    <div onClick={handleNavigate}>
      <div className="image-container text-white">
        <Img
          src={thumbnail}
          alt=""
          placeholderSrc={placeholderImg}
          className="rounded-lg"
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

export default VideoCard;
