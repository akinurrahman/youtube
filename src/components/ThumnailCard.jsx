import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { fetchDataFromApi } from "../utils/api";

// Format view count
function formatViewCount(viewCount) {
  // 1e6 represents 1 followed by 6 zeros, which equals 1,000,000 (1 million)
  if (viewCount >= 1e9) {
    return (viewCount / 1e9).toFixed(1) + "B"; // Convert to billions
  } else if (viewCount >= 1e6) {
    return (viewCount / 1e6).toFixed(1) + "M"; // Convert to millions
  } else if (viewCount >= 1e3) {
    return (viewCount / 1e3).toFixed(1) + "K"; // Convert to thousands
  } else {
    return viewCount.toString(); // Less than 1K, display as is
  }
}

const ThumnailCard = ({ currVideo, index }) => {
  const thumbnailUrl = currVideo.snippet.thumbnails.medium.url;
  const title = currVideo.snippet.title;
  const channelTitle = currVideo.snippet.channelTitle;

  // calculating the time difference
  const publishedAt = currVideo.snippet.publishedAt;
  const videoPublishedDate = new Date(publishedAt);
  const currentTime = new Date();

  const timeDifference = currentTime - videoPublishedDate; // Difference in milliseconds

  let timeAgo;

  // Convert milliseconds to different units (years, months, etc.)
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    timeAgo = years === 1 ? `${years} year ago` : `${years} years ago`;
  } else if (months > 0) {
    timeAgo = months === 1 ? `${months} month ago` : `${months} months ago`;
  } else if (days > 0) {
    timeAgo = days === 1 ? `${days} day ago` : `${days} days ago`;
  } else if (hours > 0) {
    timeAgo = hours === 1 ? `${hours} hour ago` : `${hours} hours ago`;
  } else if (minutes > 0) {
    timeAgo =
      minutes === 1 ? `${minutes} minute ago` : `${minutes} minutes ago`;
  } else {
    timeAgo = seconds <= 1 ? `just now` : `${seconds} seconds ago`;
  }

  const [viewCount, setViewCount] = useState("Loading...");

  useEffect(() => {
    fetchDataFromApi("videos", {
      part: "statistics",
      id: currVideo.id,
    }).then((res) => {
      if (res.items.length > 0 && res.items[0].statistics) {
        setViewCount(res.items[0].statistics.viewCount);
      } else {
        setViewCount("N/A");
      }
    });
  }, [currVideo]);

  const formattedViewCount =
    viewCount !== "N/A" ? formatViewCount(parseInt(viewCount)) : viewCount;

  // getting the channel avatar/logo
  const [channelAvatar, setChannelAvatar] = useState("...");
  const channelId = currVideo.snippet.channelId;
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

  return (
    <NavLink to="/videoID" key={index}>
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
            <p className="line-clamp-1 text-gray-700">{channelTitle}</p>
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
