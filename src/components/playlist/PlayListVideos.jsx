import React from "react";
import { NavLink } from "react-router-dom";
import { calculateTimeAgo } from "../../helpers/calculateTimeAgo";
import { formatDuration } from "../../helpers/formatDuration";
import { formatCount } from "../../helpers/formatCount";

const PlayListVideos = ({ video, videoInfo }) => {
  const thumbnail = video?.snippet?.thumbnails?.medium?.url || "";
  const title = video?.snippet?.title || "";
  const publishAt = video?.snippet?.publishAt || "";
  const timeAgo = publishAt ? calculateTimeAgo(publishAt) : "";
  const videoID = video?.snippet?.resourceId?.videoId || "";
  const rawDuration = videoInfo?.contentDetails?.duration || "";
  const duration = rawDuration ? formatDuration(rawDuration) : "";
  const rawView = videoInfo?.statistics?.viewCount || "";
  const viewCount = rawView ? formatCount(rawView) : "";
  return (
    <NavLink to={`/watch/${videoID}`} className=" flex ">
      <div className="relative text-white">
        <img
          src={thumbnail}
          alt=""
          className=" mr-3 max-w-[140px] rounded-lg sm:max-w-[200px] "
        />
        <p className="absolute bottom-2  right-5 z-10 rounded-md bg-black bg-opacity-70 px-2">
          {duration}
        </p>
      </div>
      <div>
        <h2 className="line-clamp-3 font-semibold leading-tight ">{title}</h2>
        <p className="line-clamp-1 text-sm font-extralight">
          {viewCount} views • {timeAgo}
        </p>
      </div>
    </NavLink>
  );
};

export default PlayListVideos;
