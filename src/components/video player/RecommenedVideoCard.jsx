import React, { useEffect } from "react";
import { calculateTimeAgo } from "../../helpers/calculateTimeAgo";
import { formatCount } from "../../helpers/formatCount";
import { NavLink } from "react-router-dom";

import { formatDuration } from "../../helpers/formatDuration";
import useApi from "../../hooks/useApi";

const RecommenedVideoCard = ({ video }) => {
  // Destructuring video data
  const thumbnail = video?.snippet?.thumbnails?.medium?.url || "N/A";
  const channelName = video?.snippet?.channelTitle || "N/A";
  const title = video?.snippet?.title || "N/A";
  const publishedAt = video?.snippet?.publishedAt || "N/A";
  const videoID = video?.id?.videoId || "N/A";

  const timeAgo = publishedAt ? calculateTimeAgo(publishedAt) : "N/A";

  const { fetchData: fetchVideoInfo, data: videoInfo } = useApi();
  // API call to get videoInfo like - duration, view count
  useEffect(() => {
    if (videoID) {
      const url = "videos";
      const params = {
        part: "statistics,contentDetails",
        id: videoID,
      };
      fetchVideoInfo(url, params);
    }
  }, [videoID]);

  const rawDuration = videoInfo?.items?.[0]?.contentDetails?.duration || "N/A";
  const rawView = videoInfo?.items?.[0]?.statistics?.viewCount || "N/A";
  const duration = rawDuration && formatDuration(rawDuration);
  const viewCount = rawView && formatCount(rawView);

  return (
    <NavLink to={`/watch/${videoID}`}>
      <div className="mx-2 my-4 flex space-x-2 sm:mx-3">
        <div className=" img-container relative text-white ">
          <img
            src={thumbnail}
            alt="thumnail"
            className=" img max-w-[191px] rounded-lg sm:max-w-[235px] md:max-w-[290px] lg:max-w-[160px] xl:max-w-[190px]  "
          />
          <p className="absolute bottom-2  right-3 z-10 rounded-md bg-black bg-opacity-70 px-2">
            {duration}
          </p>
        </div>

        {/* video title - channel name - views and time */}
        <div className="flex flex-col gap-1     ">
          <h2 className="line-clamp-2  font-bold text-gray-900 ">{title}</h2>
          <p className="line-clamp-1 text-sm text-gray-700">{channelName}</p>
          <p className="line-clamp-1 text-sm text-gray-700">
            {viewCount} views • {timeAgo}
          </p>
        </div>
      </div>
    </NavLink>
  );
};

export default RecommenedVideoCard;
