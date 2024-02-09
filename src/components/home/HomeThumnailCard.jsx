import React from "react";
import { useNavigate } from "react-router-dom";
import { calculateTimeAgo } from "../../helpers/calculateTimeAgo";
import { formatCount } from "../../helpers/formatCount";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { formatDuration } from "../../helpers/formatDuration";
import { getYouTubeData } from "../../api/queries";
import { useQuery } from "@tanstack/react-query";

const HomeThumnailCard = ({ video }) => {
  const navigate = useNavigate();

  const thumbnail = video?.snippet.thumbnails.medium.url ?? "";
  const channelName = video?.snippet.channelTitle || "N/A";
  const title = video?.snippet?.title || "N/A";
  const publishedAt = video?.snippet.publishedAt || "N/A";
  const channelId = video?.snippet.channelId || "";
  const videoID = video?.id || "";

  // Nested destructuring for statistics and contentDetails with defaults
  const { viewCount: rawViewCount = "N/A" } = video?.statistics ?? {};
  const { duration: rawDuration = "N/A" } = video?.contentDetails ?? {};

  // Formatting video details
  const timeAgo = publishedAt ? calculateTimeAgo(publishedAt) : "";
  const viewCount = rawViewCount ? formatCount(rawViewCount) : null;
  const duration = rawDuration ? formatDuration(rawDuration) : "";

  const { data } = useQuery({
    queryKey: ["trending", channelId],
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
  const avatar = data?.items[0]?.snippet.thumbnails.default.url || null;
  console.log("channel data is", data?.items[0]);

  const handleNavigate = (destination, e) => {
    e.stopPropagation();
    navigate(destination);
  };

  return (
    <div onClick={() => navigate(`/watch/${videoID}`)}>
      {/* Thumbnail container */}
      <div className="thumbnail-container relative h-[184px] rounded-lg bg-gray-300 text-white sm:h-[166px] md:h-[132px] xl:h-[168px] 2xl:h-[206px]">
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
