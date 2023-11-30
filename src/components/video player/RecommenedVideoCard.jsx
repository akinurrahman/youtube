import React, { useEffect } from "react";
import { calculateTimeAgo } from "../../utils/calculateTimeAgo";
import useFetch from "../../utils/useFetch";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearVideoDetails, setVideoDetails } from "../../redux/features/VideoSlice";

const RecommenedVideoCard = ({ video }) => {
  const dispatch = useDispatch()
  const thumbnail = video?.snippet?.thumbnails?.medium?.url;
  const channelName = video?.snippet?.channelTitle;
  const title = video?.snippet?.title;
  const videoID = video?.id?.videoId;

  const publishedAt = video?.snippet?.publishedAt;
  const timeAgo = calculateTimeAgo(publishedAt);

  // api call to get views
  // const { data, loading } = useFetch("videos", {
  //   part: "statistics",
  //   id: videoID,
  // });
  // console.log(data?.items);
  

  // Dispatching video-related data to the Redux store
  const videoInfo = {
    title,
    // avatar,
    channelName,
    // likeCount,

  };
  const handleClick = () => {
    dispatch(clearVideoDetails())
    dispatch(setVideoDetails(videoInfo));
  };

  return (
    <NavLink to={`/watch/${videoID}`} onClick={handleClick}>
      <div className="mx-2 my-4 flex space-x-2 sm:mx-3">
        <div className=" img-container  ">
          <img
            src={thumbnail}
            alt="thumnail"
            className=" img max-w-[191px] rounded-lg sm:max-w-[235px] md:max-w-[290px] lg:max-w-[160px] xl:max-w-[190px]  "
          />
        </div>

        {/* video title - channel name - views and time */}
        <div className="flex flex-col gap-1     ">
          <h2 className="line-clamp-2  font-bold text-gray-900 ">{title}</h2>
          <p className="line-clamp-1 text-sm text-gray-700">{channelName}</p>
          <p className="line-clamp-1 text-sm text-gray-700">
            13M views • {timeAgo}
          </p>
        </div>
      </div>
    </NavLink>
  );
};

export default RecommenedVideoCard;
