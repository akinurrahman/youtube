import React, { useEffect, useState } from "react";
import { calculateTimeAgo } from "../helpers/calculateTimeAgo";
import { formatCount } from "../helpers/formatCount";
import useFetch from "../hooks/useFetch";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  clearVideoDetails,
  setVideoDetails,
} from "../redux/features/VideoSlice";
import { formatDuration } from "../helpers/formatDuration";

const SearchResult = ({ video }) => {
  const dispatch = useDispatch();

  // Destructuring video object
  const {
    snippet: {
      thumbnails: { medium: { url: thumbnail } = {} } = {},
      channelTitle: channelName,
      title,
      publishedAt,
      channelId,
    } = {},
    id: { videoId: videoID } = {},
  } = video || {};

  const timeAgo = publishedAt ? calculateTimeAgo(publishedAt) : "";

  // API call to get video details
  const { data: videoStats } = useFetch("videos", {
    part: "statistics,contentDetails",
    id: videoID,
  });

  const [videoData, setVideoData] = useState(null);
  useEffect(() => {
    if (videoStats && videoStats.items && videoStats.items.length > 0) {
      setVideoData(videoStats);
    }
  }, [videoStats]);

  // Destructuring the required values from videoData
  const {
    items: [
      {
        contentDetails: { duration: rawDuration } = {},
        statistics: { viewCount: rawViewCount, likeCount: rawLikeCount } = {},
      } = {},
    ] = [],
  } = videoData || {};

  // Formatting values
  const duration = rawDuration && formatDuration(rawDuration);
  const viewCount = rawViewCount && formatCount(rawViewCount);
  const likeCount = rawLikeCount && formatCount(rawLikeCount);

  // API call to get channel info
  const { data: channelStats } = useFetch("channels", {
    part: "snippet,statistics",
    id: channelId,
  });

  const [channelData, setChannelData] = useState(null);
  useEffect(() => {
    if (channelStats && channelStats.items && channelStats.items.length > 0) {
      setChannelData(channelStats);
    }
  }, [channelStats]);

  // Destructuring the required values from channelData
  const {
    items: [
      {
        snippet: {
          localized: { description } = {},
          thumbnails: { default: { url: avatar } = {} } = {},
        } = {},
        statistics: { subscriberCount } = {},
      } = {},
    ] = [],
  } = channelData || {};

  const subsCount = subscriberCount ? formatCount(subscriberCount) : "";

  // Dispatching video-related data to the Redux store
  const videoInfo = {
    title,
    avatar,
    channelName,
    subsCount,
    likeCount,
    channelId,
  };
  dispatch(clearVideoDetails());
  const handleClick = () => {
    dispatch(setVideoDetails(videoInfo));
  };
  return (
    <NavLink to={`/watch/${videoID}`} onClick={handleClick}>
      <div className="mt-4 gap-4 sm:flex md:mx-5 lg:mx-[187px]">
        {/* col - 1  */}
        <div className=" img-container relative text-white">
          <img
            src={thumbnail}
            alt=""
            className=" w-full sm:min-w-[320px] sm:rounded-xl "
          />
          <p className="absolute bottom-2  right-3 z-10 rounded-md bg-black bg-opacity-70 px-2">
            {duration}
          </p>
        </div>
        {/* col-2 */}
        <div className="mx-2 mt-2 flex items-center sm:hidden">
          <NavLink to={`/channel/${channelId}`}>
            <img
              src={avatar}
              alt=""
              className="mr-3 max-w-[40px] rounded-full "
            />
          </NavLink>
          <div>
            <div className="line-clamp-2 font-semibold leading-none">
              {title}
            </div>
            <p className="line-clamp-1 text-gray-700">
              <NavLink to={`/channel/${channelId}`}>{channelName}</NavLink> •{" "}
              {viewCount} • {timeAgo}
            </p>
          </div>
        </div>
        {/* show this for column 2 when size is small */}
        <div className="mt-1 hidden flex-col sm:flex ">
          <h2 className="mb-1 line-clamp-2 font-semibold ">{title}</h2>
          <p className="mb-2 line-clamp-1 text-gray-700">
            {viewCount} • {timeAgo}
          </p>
          <NavLink
            to={`/channel/${channelId}`}
            className="mb-2 line-clamp-1  flex items-center text-gray-700"
          >
            <img
              src={avatar}
              alt=""
              className="mr-3 max-w-[25px] rounded-full "
            />
            <span>{channelName}</span>
          </NavLink>
          <p className="line-clamp-2 text-gray-600 ">{description}</p>
        </div>
      </div>
    </NavLink>
  );
};

export default SearchResult;
