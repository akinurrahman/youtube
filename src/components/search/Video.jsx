import React from "react";
import { useNavigate } from "react-router-dom";

const Video = ({ info }) => {
  const navigate = useNavigate();

  // Handler for navigating to the video page
  const handleVideoNavigation = () => {
    navigate(`/watch/${info.isVideo}`);
  };

  // Handler for navigating to the channel page
  const handleChannelNavigation = (event) => {
    event.stopPropagation();
    navigate(`/channel/${info.channelId}`);
  };

  return (
    <div
      className="mt-4 gap-4 sm:flex md:mx-5 lg:mx-[187px]"
      onClick={handleVideoNavigation}
    >
      {/* Column 1: Thumbnail and duration */}
      <div className="img-container relative text-white">
        <img
          src={info.thumbnail}
          alt=""
          className="w-full sm:min-w-[320px] sm:rounded-xl"
        />
        {/* Duration overlay */}
        <p className="absolute bottom-2 right-3 z-10 rounded-md bg-black bg-opacity-70 px-2">
          {info.duration}
        </p>
      </div>
      {/* Column 2: Video details */}
      <div className="mx-2 mt-2 flex items-center sm:hidden">
        {/* Channel avatar */}
        <div onClick={handleChannelNavigation}>
          <img
            src={info.avatar}
            alt=""
            className="mr-3 max-w-[40px] rounded-full"
          />
        </div>
        {/* Title, channel name, view count, and time ago */}
        <div>
          <div className="line-clamp-2 font-semibold leading-none">
            {info.title}
          </div>
          <div className="line-clamp-1 text-gray-700">
            {/* Clickable channel name */}
            <div onClick={handleChannelNavigation}>{info.channelName}</div> •
            {info.viewCount} • {info.timeAgo}
          </div>
        </div>
      </div>
      {/* Show this for column 2 when size is small */}
      <div className="mt-1 hidden flex-col sm:flex">
        {/* Title */}
        <h2 className="mb-1 line-clamp-2 font-semibold">{info.title}</h2>
        {/* View count and time ago */}
        <p className="mb-2 line-clamp-1 text-gray-700">
          {info.viewCount} • {info.timeAgo}
        </p>
        {/* Channel avatar and name */}
        <div
          onClick={handleChannelNavigation}
          className="mb-2 line-clamp-1 flex items-center text-gray-700"
        >
          <img
            src={info.avatar}
            alt=""
            className="mr-3 max-w-[25px] rounded-full"
          />
          <span>{info.channelName}</span>
        </div>
        {/* Description */}
        <p className="line-clamp-2 text-gray-600">{info.description}</p>
      </div>
    </div>
  );
};

export default Video;
