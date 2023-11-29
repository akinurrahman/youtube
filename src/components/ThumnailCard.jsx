import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { calculateTimeAgo } from "../utils/calculateTimeAgo";
import { fetchDataFromApi } from "../utils/api";
import { formatCount } from "../utils/formatCount";
import { useDispatch } from "react-redux";
import { setVideoDetails } from "../redux/features/VideoSlice";

const ThumnailCard = ({ video }) => {
  const dispatch = useDispatch();

  const thumbnail = video.snippet.thumbnails.medium.url;
  const channelName = video.snippet.channelTitle;
  const title = video.snippet.title;
  const channelId = video.snippet.channelId;
  const videoID = video.id;

  const publishedAt = video.snippet.publishedAt;
  const timeAgo = calculateTimeAgo(publishedAt);

  const viewCount = formatCount(video.statistics.viewCount);
  const likeCount = formatCount(video.statistics.likeCount);

  const [channelInfo, setChannelInfo] = useState({
    avatar: "...",
    subscriberCount: 0,
  });
  
  // Api call for channel avatar and subscriber count
  useEffect(() => {
    fetchDataFromApi("channels", {
      part: "snippet,statistics",
      id: channelId,
    }).then((res) => {
      if (res.items.length > 0) {
        const channelData = res.items[0];
        const avatar = channelData.snippet.thumbnails.default.url;
        const subscriberCount = channelData.statistics
          ? channelData.statistics.subscriberCount
          : "N/A";

        setChannelInfo({
          avatar,
          subscriberCount,
        });
      }
    });
  }, [channelId]);

  const subsCount = formatCount(channelInfo.subscriberCount);
  const avatar = channelInfo.avatar;

  // Dispatching video-related data to the Redux store
  const videoInfo = {
    title,
    avatar,
    channelName,
    likeCount,
    viewCount,
    subsCount,
  };
  const handleClick = () => {
    dispatch(setVideoDetails(videoInfo));
  };

  return (
    <NavLink to={`/watch/${videoID}`} onClick={handleClick}>
      <div className="thumnail-container ">
        <img src={thumbnail} alt="thumnail" className="w-[375px] rounded-xl" />
      </div>

      {/* statistics */}
      <div className="info my-2 flex space-x-4 px-1">
        <div className="logo-container">
          <img
            src={avatar}
            alt="channel avatar"
            className="user-logo max-w-[40px] rounded-full"
          />
        </div>
        <div>
          <h2 className="line-clamp-2 font-bold  text-gray-900 ">{title}</h2>
          <p className="line-clamp-1 text-gray-700">{channelName}</p>
          <p className="text-gray-700">
            {viewCount} • {timeAgo}
          </p>
        </div>
      </div>
    </NavLink>
  );
};

export default ThumnailCard;
