import React from "react";
import { useNavigate } from "react-router-dom";
import { calculateTimeAgo } from "../../helpers/calculateTimeAgo";
import { formatCount } from "../../helpers/formatCount";

// Lazy load image and blur effect
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { formatDuration } from "../../helpers/formatDuration";
import { useChannelsQuery } from "../../api/youtubeService";

const HomeThumnailCard = ({ video }) => {
  const navigate = useNavigate();
  // Destructuing video info
  const thumbnail = video?.snippet?.thumbnails?.medium?.url || "";
  const channelName = video?.snippet?.channelTitle || "N/A";
  const title = video?.snippet?.title || "N/A";
  const channelId = video?.snippet?.channelId || "";
  const publishedAt = video?.snippet?.publishedAt || "N/A";
  const videoID = video?.id || "";
  const rawViewCount = video?.statistics?.viewCount || "N/A";
  const rawDuration = video?.contentDetails?.duration || "N/A";

  // Formatting video details
  const timeAgo = publishedAt ? calculateTimeAgo(publishedAt) : "";
  const viewCount = rawViewCount ? formatCount(rawViewCount) : null;
  const duration = rawDuration ? formatDuration(rawDuration) : "";

  // API call to get Channel info -  Avatar
  const {
    data: channelData,
    error,
    isLoading,
  } = useChannelsQuery({
    part: "snippet",
    id: channelId,
  });

  const avatar =
    channelData?.items?.[0]?.snippet?.thumbnails?.default?.url || null;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleNavigate = (destination, e) => {
    e.stopPropagation();
    navigate(destination);
  };
  return (
    <div onClick={() => navigate(`/watch/${videoID}`)}>
      {/* Thumbnail container */}
      <div className="thumbnail-container relative text-white">
        <LazyLoadImage
          src={thumbnail}
          width={"100%"}
          effect="blur"
          className="rounded-lg"
        />
        {/* Displaying video duration */}
        <p className="absolute bottom-2 right-3 z-10 rounded-md bg-black bg-opacity-70 px-2">
          {duration}
        </p>
      </div>

      {/* Video statistics */}
      <div className="info my-2 flex space-x-4 px-1">
        <div
          className="logo-container"
          onClick={(e) => handleNavigate(`/channel/${channelId}`, e)}
        >
          <LazyLoadImage src={avatar} className="max-w-[40px] rounded-full" />
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
