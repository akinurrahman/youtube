import React from "react";
import { useNavigate } from "react-router-dom";
import { calculateTimeAgo } from "../../helpers/calculateTimeAgo";
import { formatCount } from "../../helpers/formatCount";
import "react-lazy-load-image-component/src/effects/blur.css";
import { formatDuration } from "../../helpers/formatDuration";
import { getYouTubeData } from "../../api/queries";
import { useQuery } from "@tanstack/react-query";
import Img from "../lazy load/Img";

const HomeThumnailCard = ({ video }) => {
  const navigate = useNavigate();

  const { snippet, statistics, contentDetails } = video || {};

  // Extracting video details
  const thumbnail = snippet.thumbnails.high.url ?? "";
  const placeholderImg = snippet.thumbnails.default.url ?? "";
  const channelName = snippet.channelTitle || "N/A";
  const title = snippet?.title || "N/A";
  const publishedAt = snippet.publishedAt || "N/A";
  const channelId = snippet.channelId || "";
  const videoID = video?.id || "";

  // Extracting statistics and contentDetails with defaults
  const { viewCount: rawViewCount = "N/A" } = statistics ?? {};
  const { duration: rawDuration = "N/A" } = contentDetails ?? {};

  // Formatting video details
  const timeAgo = publishedAt ? calculateTimeAgo(publishedAt) : "";
  const viewCount = rawViewCount ? formatCount(rawViewCount) : null;
  const duration = rawDuration ? formatDuration(rawDuration) : "";

  // Fetching channel data
  const { data } = useQuery({
    queryKey: [videoID, channelId],
    queryFn: () =>
      getYouTubeData({
        endpoint: "channels",
        queryParams: {
          part: "snippet",
          id: channelId,
        },
      }),
    staleTime: 1000 * 60 * 5,
  });

  // Extracting channel avatar
  const avatar = data?.items[0]?.snippet.thumbnails.default.url || null;

  // Navigation handler
  const handleNavigate = (destination, e) => {
    e.stopPropagation();
    navigate(destination);
  };

  return (
    <div onClick={() => navigate(`/watch/${videoID}`)}>
      {/* Thumbnail container */}
      <div className="image-container ">
        <Img
          src={thumbnail}
          placeholderSrc={placeholderImg}
          className="rounded-lg"
        />
        {/* Displaying video duration */}
        <p className="absolute bottom-2 right-3 z-10 rounded-md bg-black bg-opacity-70 px-2 text-white">
          {duration}
        </p>
      </div>

      {/* Video statistics */}
      <div className="info my-2 flex space-x-4 px-1">
        <div
          className="logo-container"
          onClick={(e) => handleNavigate(`/channel/${channelId}`, e)}
        >
          <Img src={avatar} className="max-w-[40px] rounded-full" />
        </div>
        <div>
          <h2 className="line-clamp-2 font-bold text-gray-900">{title}</h2>
          <p
            className="line-clamp-1 text-gray-700"
            onClick={(e) => handleNavigate(`/channel/${channelId}`, e)}
          >
            {channelName}
          </p>
          {/* Displaying view count and time ago */}
          <p className="text-gray-700">
            {viewCount} • {timeAgo}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeThumnailCard;
