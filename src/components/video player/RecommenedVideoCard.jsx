import React from "react";
import { calculateTimeAgo } from "../../utils/calculateTimeAgo";
import { formatCount } from "../../utils/formatCount";
import useFetch from "../../utils/useFetch";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  clearVideoDetails,
  setVideoDetails,
} from "../../redux/features/VideoSlice";

const RecommenedVideoCard = ({ video }) => {
  const dispatch = useDispatch();
  const thumbnail = video?.snippet?.thumbnails?.medium?.url;
  const channelName = video?.snippet?.channelTitle;
  const title = video?.snippet?.title;
  const videoID = video?.id?.videoId;
  const channelId = video?.snippet?.channelId;

  const publishedAt = video?.snippet?.publishedAt;
  const timeAgo = calculateTimeAgo(publishedAt);

  // api call to get views
  const { data : views } = useFetch("videos", {
    part: "statistics",
    id: videoID,
  });
  const RawView = views?.items?.[0]?.statistics?.viewCount
  const viewCount = RawView && formatCount(RawView) ;

  const RowLike = views?.items?.[0]?.statistics?.viewCount
  const likeCount = RowLike && formatCount(RowLike) ;

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
  };
  const handleClick = () => {
    dispatch(clearVideoDetails());
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
            {viewCount} views • {timeAgo}
          </p>
        </div>
      </div>
    </NavLink>
  );
};

export default RecommenedVideoCard;