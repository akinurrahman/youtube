import React from "react";
import { calculateTimeAgo } from "../../helpers/calculateTimeAgo";
import { formatCount } from "../../helpers/formatCount";
import useFetch from "../../hooks/useFetch";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  clearVideoDetails,
  setVideoDetails,
} from "../../redux/features/VideoSlice";
import { formatDuration } from "../../helpers/formatDuration";

const RecommenedVideoCard = ({ video }) => {
  const dispatch = useDispatch();

  
  // Destructuring video data
  const {
    snippet: {
      thumbnails: {
        medium: { url: thumbnail },
      },
      channelTitle: channelName,
      title,
      publishedAt,
      channelId,
    },
    id: { videoId: videoID },
  } = video;

  const timeAgo = publishedAt ? calculateTimeAgo(publishedAt) : "N/A";

  // api call to get views
  const { data: views } = useFetch("videos", {
    part: "statistics,contentDetails",
    id: videoID,
  });

  const duration =
    views?.items?.[0] &&
    formatDuration(views?.items?.[0]?.contentDetails?.duration);

  const viewCount =
    views?.items?.[0] && formatCount(views?.items?.[0]?.statistics?.viewCount);

  const likeCount =
    views?.items?.[0] && formatCount(views?.items?.[0]?.statistics?.viewCount);

  // Api call for channel avatar and subscount
  const { data } = useFetch("channels", {
    part: "snippet,statistics",
    id: channelId,
  });

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
    subsCount,
    likeCount,
    channelId,
  };
  const handleClick = () => {
    dispatch(clearVideoDetails());
    dispatch(setVideoDetails(videoInfo));
  };

  return (
    <NavLink to={`/watch/${videoID}`} onClick={handleClick}>
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
