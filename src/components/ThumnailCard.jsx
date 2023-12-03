import React from "react";
import { NavLink } from "react-router-dom";
import { calculateTimeAgo } from "../utils/calculateTimeAgo";
import { formatCount } from "../utils/formatCount";
import { useDispatch } from "react-redux";
import { setVideoDetails } from "../redux/features/VideoSlice";
import useFetch from "../utils/useFetch";
const ThumnailCard = ({ video }) => {
  const dispatch = useDispatch();

  const thumbnail = video.snippet.thumbnails.medium.url;
  const channelName = video.snippet.channelTitle;
  const title = video.snippet.title;
  const channelId = video.snippet.channelId;
  const videoID = video.id;

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
  const { data, loading } = useFetch("channels", {
    part: "snippet,statistics",
    id: channelId,
  });
  // console.log(data?.items)
  let avatar = data?.items[0]?.snippet?.thumbnails?.default?.url;
  let subsCount;
  if (data?.items[0]?.statistics?.subscriberCount !== undefined) {
    subsCount = formatCount(data.items[0].statistics.subscriberCount);
  } else {
    subsCount = "N/A";
  }

  // Dispatching video-related data to the Redux store
  const videoInfo = {
    title,
    avatar,
    channelName,
    likeCount,
    viewCount,
    subsCount,
    channelId,
  };
  const handleClick = () => {
    dispatch(setVideoDetails(videoInfo));
  };

  return (
    <NavLink to={`/watch/${videoID}`} onClick={handleClick}>
      <div className="thumnail-container ">
        <img src={thumbnail} alt="thumnail" className="w-full rounded-xl" />
      </div>

      {/* statistics */}
      <div className="info my-2 flex space-x-4 px-1">
        <NavLink to={`/channel/${channelId}`} className="logo-container">
          <img
            src={avatar}
            alt="channel avatar"
            className="user-logo max-w-[40px] rounded-full"
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
