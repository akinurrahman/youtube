import React from "react";
import { calculateTimeAgo } from "../../../utils/calculateTimeAgo";
import { formatCount } from "../../../utils/formatCount";
import useFetch from "../../../utils/useFetch";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setVideoDetails } from "../../../redux/features/VideoSlice";

const Videos = ({ video }) => {
  const snippet = video?.snippet;
  const title = snippet?.title;
  const thumbnail = snippet?.thumbnails?.medium?.url;
  const timeAgo = calculateTimeAgo(snippet?.publishedAt);
  const videoID = video?.id?.videoId;
  const dispatch = useDispatch();
  const { channelId } = useSelector((state) => state.video.videoDetails);

  // API call to get views
  const { data: views } = useFetch("videos", {
    part: "statistics",
    id: videoID,
  });
  
  // formatting view and like count
  const viewCount =
    views?.items?.[0] && formatCount(views?.items?.[0]?.statistics?.viewCount);
  const likeCount =
    views?.items?.[0] && formatCount(views?.items?.[0]?.statistics?.likeCount);

  // Dispatching video-related data to the Redux store
  const videoInfo = {
    title,
    likeCount,
  };

  const handleClick = () => {
    dispatch(setVideoDetails(videoInfo));
  };

  return (
    <NavLink
      to={`/watch/${videoID}`}
      className=" flex sm:flex-col "
      onClick={handleClick}
    >
      <div>
        <img
          src={thumbnail}
          alt=""
          className="mr-2 max-w-[140px] rounded-lg sm:w-full sm:max-w-full"
        />
      </div>
      <div>
        <h2 className="line-clamp-3 font-semibold leading-tight sm:mt-1 sm:line-clamp-2">
          {title}
        </h2>
        <p className="line-clamp-1 text-sm font-extralight">
          {viewCount} views • {timeAgo}
        </p>
      </div>
    </NavLink>
  );
};

export default Videos;
