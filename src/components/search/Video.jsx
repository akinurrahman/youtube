import React from "react";
import { NavLink } from "react-router-dom";

const Video = ({
  isVideo,
  thumbnail,
  duration,
  channelId,
  avatar,
  viewCount,
  timeAgo,
  title,
  description,
  channelName,
}) => {
  return (
    <NavLink to={`/watch/${isVideo}`}>
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

export default Video;
