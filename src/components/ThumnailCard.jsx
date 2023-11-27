import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { fetchDataFromApi } from "../utils/api";
import { useDispatch } from "react-redux";
import { setVideoDetailss } from "../redux/features/VideoSlice";
import { formatCount } from "../utils/formatCount";
import { calculateTimeAgo } from "../utils/calculateTimeAgo";

const ThumnailCard = ({ currVideo, index }) => {
  const thumbnailUrl = currVideo.snippet.thumbnails.medium.url;
  const title = currVideo.snippet.title;
  const channelName = currVideo.snippet.channelTitle;
  const videoID = currVideo.id;
  const dispatch = useDispatch();

  // calculating the time difference - check calculateTimeAgo.js util file
  const publishedAt = currVideo.snippet.publishedAt;
  const timeAgo = calculateTimeAgo(publishedAt);

  // state for storing view and like cound
  const [videoDetails, setVideoDetails] = useState({
    viewCount: "Loading...",
    likeCount: "Loading...",
  });

  // api call for getting view and like counts
  useEffect(() => {
    fetchDataFromApi("videos", {
      part: "statistics",
      id: currVideo.id,
    }).then((res) => {
      if (res.items.length > 0 && res.items[0].statistics) {
        setVideoDetails({
          viewCount: res.items[0].statistics.viewCount,
          likeCount: res.items[0].statistics.likeCount,
        });
      } else {
        setVideoDetails({
          viewCount: "N/A",
          likeCount: "N/A",
        });
      }
    });
  }, [currVideo]);

  // format view and like counts - check formatcount.js util file
  const formattedViewCount = formatCount(parseInt(videoDetails.viewCount));
  const formattedLikeCount = formatCount(parseInt(videoDetails.likeCount));

  const channelId = currVideo.snippet.channelId;

  // api call to get channel avatar
  const [channelAvatar, setChannelAvatar] = useState("...");
  useEffect(() => {
    fetchDataFromApi("channels", {
      part: "snippet",
      id: channelId,
    }).then((response) => {
      if (response.items.length > 0) {
        const channelAvatar = response.items[0].snippet.thumbnails.default.url;
        setChannelAvatar(channelAvatar);
      }
    });
  }, [currVideo]);

  // api call to get channel subscriber count
  const [subscriberCount, setSubscriberCount] = useState(0);
  useEffect(() => {
    fetchDataFromApi("channels", {
      part: "statistics",
      id: channelId,
    }).then((res) => {
      if (res.items.length > 0 && res.items[0].statistics) {
        const subscriberCount = res.items[0].statistics.subscriberCount;
        setSubscriberCount(subscriberCount);
      } else {
        setSubscriberCount("N/A");
      }
    });
  }, [currVideo]);

  // format subscriber count - check formatCount.js util file
  const formattedSubscriberCount = formatCount(parseInt(subscriberCount));

  // Dispatching video-related data to the Redux store
  const videoData = {
    title,
    channelName,
    channelAvatar,
    viewCount: formattedViewCount,
    likeCount: formattedLikeCount,
    subscriberCount: formattedSubscriberCount,
  };

  return (
    <NavLink
      to={`/watch/${videoID}`}
      key={index}
      onClick={() => dispatch(setVideoDetailss(videoData))}
    >
      <div className="   ">
        <div className="thumnail-container ">
          <img
            src={thumbnailUrl}
            alt="thumnail"
            className="w-[375px] rounded-xl"
          />
        </div>

        {/* statistics */}
        <div className="info my-2 flex space-x-4 px-1">
          <div className="logo-container">
            <img
              src={channelAvatar}
              alt="user icon"
              className="user-logo max-w-[40px] rounded-full"
            />
          </div>
          <div>
            <h2 className="line-clamp-2 font-bold  text-gray-900 ">{title}</h2>
            <p className="line-clamp-1 text-gray-700">{channelName}</p>
            <p className="text-gray-700">
              {formattedViewCount} • {timeAgo}
            </p>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default ThumnailCard;
