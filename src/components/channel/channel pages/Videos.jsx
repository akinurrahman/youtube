import React from "react";
import ChannelLayout from "../ChannelLayout";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { useSearchQuery, useVideosQuery } from "../../../api/youtubeService";
import { formatDuration } from "../../../helpers/formatDuration";
import { formatCount } from "../../../helpers/formatCount";
import { calculateTimeAgo } from "../../../helpers/calculateTimeAgo";

const Videos = () => {
  const { channelId } = useParams();

  // Accessing current location to determine video duration type
  const location = useLocation();
  const path = location.pathname;

  let videoDuration;

  if (path === `/channel/${channelId}/shorts`) {
    videoDuration = "short";
  } else if (path === `/channel/${channelId}/videos`) {
    videoDuration = "medium";
  }

  // Fetch videos based on channel ID and video duration
  const {
    data: channelVideos,
    isLoading: isLoadingVideos,
    error: isErrorVideos,
  } = useSearchQuery({
    part: "snippet",
    type: "video",
    videoDuration,
    channelId,
    maxResults: 5,
  });

  // Fetch detailed video information for each video
  const {
    data: videoInfo,
    isLoading: isLoadingVideoInfo,
    error: isErrorVideoInfo,
  } = useVideosQuery({
    part: "statistics,contentDetails",
    // Concatenate video IDs to fetch details for multiple videos
    id: channelVideos?.items?.map((video) => video.id.videoId).join(",") || "",
  });

  // Display a loading message while data is being fetched
  if (isLoadingVideos || isLoadingVideoInfo) {
    return <div>Loading...</div>;
  }

  // Error handling: Check for errors in video information or videos
  if (isErrorVideoInfo || isErrorVideos) {
    // Retrieve and set the error status
    const status =
      (isErrorVideos && isErrorVideos.status) ||
      (isErrorVideoInfo && isErrorVideoInfo.status) ||
      "Unknown";

    // Retrieve and set the error message
    const message =
      (isErrorVideos && isErrorVideos?.data?.error?.message) ||
      (isErrorVideoInfo && isErrorVideoInfo?.data?.error?.message) ||
      "Unknown error occurred";

    // Render the error status and message
    return (
      <div>
        <p>Error: {status}</p>
        <p>{message}</p>
      </div>
    );
  }

  // Function to render individual channel videos
  const renderChannelVideos = () => {
    if (!channelVideos || !videoInfo) {
      return null;
    }

    return channelVideos?.items?.map((video, index) => {
      const thumbnail = video?.snippet?.thumbnails?.medium?.url || "";
      const publishedAt = video?.snippet?.publishedAt || "";
      const timeAgo = publishedAt ? calculateTimeAgo(publishedAt) : "";
      const title = video?.snippet?.title || "";
      const videoID = video?.id?.videoId || "";

      // Retrieve duration and view count for each video
      const rawDuration =
        videoInfo?.items?.[index]?.contentDetails?.duration || "";
      const rawView = videoInfo?.items?.[index]?.statistics?.viewCount || "";
      const duration = rawDuration ? formatDuration(rawDuration) : "";
      const viewCount = rawView ? formatCount(rawView) : "";

      return (
        <NavLink
          to={`/watch/${videoID}`}
          className="flex sm:flex-col"
          key={index + videoID}
        >
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
        </NavLink>
      );
    });
  };

  return (
    <ChannelLayout>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {renderChannelVideos()}
      </div>
    </ChannelLayout>
  );
};

export default Videos;
