import React from "react";
import { NavLink } from "react-router-dom";
import { calculateTimeAgo } from "../utils/calculateTimeAgo";
import { formatCount } from "../utils/formatCount";
import { useDispatch } from "react-redux";
import { setVideoDetails } from "../redux/features/VideoSlice";

import useFetch from "../utils/useFetch";
import { formatDuration } from "../utils/formatDuration";
const ThumnailCard = ({ video }) => {
  const dispatch = useDispatch();

  const thumbnail = video.snippet.thumbnails.medium.url;
  const channelName = video.snippet.channelTitle;
  const title = video.snippet.title;
  const channelId = video.snippet.channelId;
  const videoID = video.id;
  const duration = video && formatDuration(video?.contentDetails?.duration);
  console.log(duration);
  const publishedAt = video.snippet.publishedAt;
  const timeAgo = calculateTimeAgo(publishedAt);

  const viewCount =
    video.statistics && video.statistics.viewCount
      ? formatCount(video.statistics.viewCount)
      : "N/A";
  const likeCount =
    video.statistics && video.statistics.likeCount
      ? formatCount(video.statistics.likeCount)
      : "N/A";

  // Api call for channel avatar and subscount
  const { data } = useFetch("channels", {
    part: "snippet,statistics,brandingSettings",
    id: channelId,
  });
  let avatar = data?.items[0]?.snippet?.thumbnails?.default?.url;
  let subsCount =
    data?.items[0] && formatCount(data?.items[0]?.statistics?.subscriberCount);

  const coverImg = data?.items[0]?.brandingSettings?.image?.bannerExternalUrl;
  const customUrl = data?.items[0]?.snippet?.customUrl;
  const description = data?.items[0]?.snippet?.localized?.description;
  let videoCount =
    data?.items[0] && formatCount(data?.items[0]?.statistics?.videoCount);

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
    <NavLink to={`/watch/${videoID}`} onClick={handleClick}>
      <div className="thumnail-container   relative text-white ">
        <img src={thumbnail} alt="thumnail" className="w-full rounded-xl" />
        <p className="absolute bottom-2  right-3 z-10 rounded-md bg-black bg-opacity-70 px-2">
          {duration}
        </p>
      </div>

      {/* statistics */}
      <div className="info my-2 flex space-x-4 px-1">
        <NavLink to={`/channel/${channelId}`} className="logo-container">
          <img
            src={avatar}
            alt="channel avatar"
            className="user-logo max-w-[40px] rounded-full "
          />
        </NavLink>
        <div>
          <h2 className="line-clamp-2 font-bold  text-gray-900 ">{title}</h2>
          <NavLink
            to={`/channel/${channelId}`}
            className="line-clamp-1 text-gray-700"
          >
            {channelName}
          </NavLink>
          <p className="text-gray-700">
            {viewCount} • {timeAgo}
          </p>
        </div>
      </div>
    </NavLink>
  );
};

export default ThumnailCard;
