import React from "react";
import { NavLink } from "react-router-dom";
import { calculateTimeAgo } from "../helpers/calculateTimeAgo";
import { formatCount } from "../helpers/formatCount";
import { useDispatch } from "react-redux";
import { setVideoDetails } from "../redux/features/VideoSlice";

import useFetch from "../utils/useFetch";
import { formatDuration } from "../helpers/formatDuration";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ThumbnailCard = ({ video }) => {
  const dispatch = useDispatch();

  // Destructuring video data
  const {
    snippet: {
      thumbnails: {
        medium: { url: thumbnail },
      },
      channelTitle: channelName,
      title,
      channelId,
      publishedAt,
    },
    id : videoID,
    statistics: { viewCount: rawViewCount, likeCount: rawLikeCount },
    contentDetails: { duration: rawDuration },
  } = video;

  // Formatting video details
  const duration = rawDuration ? formatDuration(rawDuration) : "N/A";
  const timeAgo = publishedAt ? calculateTimeAgo(publishedAt) : "N/A";
  const viewCount = rawViewCount ? formatCount(rawViewCount) : "N/A";
  const likeCount = rawLikeCount ? formatCount(rawLikeCount) : "N/A";

  // Fetching channel data
  const { data } = useFetch("channels", {
    part: "snippet,statistics,brandingSettings",
    id: channelId,
  });

  // Extracting channel data
  const channelData = data && data.items && data.items.length > 0 ? data.items[0] : {};

  const avatar = channelData.snippet?.thumbnails?.default?.url || null;
  const subsCount =
    formatCount(channelData.statistics?.subscriberCount ?? 0) ?? null;
  const coverImg = channelData.brandingSettings?.image?.bannerExternalUrl || null;
  const customUrl = channelData.snippet?.customUrl || null;
  const description = channelData.snippet?.localized?.description || null;
  const videoCount =
    formatCount(channelData.statistics?.videoCount ?? 0) ?? null;
  
  // Dispatching video-related data to the Redux store
  const videoInfo = {
    title,
    avatar,
    channelName,
    likeCount,
    viewCount,
    subsCount,
    channelId,
    coverImg,
    customUrl,
    description,
    videoCount,
  };
  const handleClick = () => {
    dispatch(setVideoDetails(videoInfo));
  };

  return (
    // NavLink to video details page
    <NavLink to={`/watch/${videoID}`} onClick={handleClick}>
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
        {/* NavLink to channel */}
        <NavLink to={`/channel/${channelId}`} className="logo-container">
          <LazyLoadImage src={avatar} className="max-w-[40px] rounded-full" />
        </NavLink>
        <div>
          <h2 className="line-clamp-2 font-bold text-gray-900">{title}</h2>
          {/* NavLink to channel */}
          <NavLink
            to={`/channel/${channelId}`}
            className="line-clamp-1 text-gray-700"
          >
            {channelName}
          </NavLink>
          {/* Displaying view count and time ago */}
          <p className="text-gray-700">
            {viewCount} • {timeAgo}
          </p>
        </div>
      </div>
    </NavLink>
  );
};

export default ThumbnailCard;
