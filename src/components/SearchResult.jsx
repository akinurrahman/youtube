import React from "react";
import { calculateTimeAgo } from "../utils/calculateTimeAgo";
import { formatCount } from "../utils/formatCount";
import useFetch from "../utils/useFetch";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  clearVideoDetails,
  setVideoDetails,
} from "../redux/features/VideoSlice";

const SearchResult = ({ video }) => {
  const dispatch = useDispatch();
  const thumbnail = video?.snippet?.thumbnails?.medium?.url;
  const channelName = video?.snippet?.channelTitle;
  const title = video?.snippet?.title;
  const videoID = video?.id?.videoId;
  const channelId = video?.snippet?.channelId;

  const publishedAt = video?.snippet?.publishedAt;
  const timeAgo = calculateTimeAgo(publishedAt);

  // api call to get views
  const { data: views } = useFetch("videos", {
    part: "statistics",
    id: videoID,
  });
  const RawView = views?.items?.[0]?.statistics?.viewCount;
  const viewCount = RawView && formatCount(RawView);

  const RowLike = views?.items?.[0]?.statistics?.viewCount;
  const likeCount = RowLike && formatCount(RowLike);

  // Api call for channel avatar and subscount
  const { data } = useFetch("channels", {
    part: "snippet,statistics",
    id: channelId,
  });

  let description = data?.items[0]?.snippet?.localized?.description;
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
  dispatch(clearVideoDetails());
  const handleClick = () => {
    dispatch(setVideoDetails(videoInfo));
  };
  return (
    <NavLink to={`/watch/${videoID}`} onClick={handleClick}>
      <div className="mt-4 gap-4 sm:flex md:mx-5 lg:mx-[187px]">
        {/* col - 1  */}
        <div className=" img-container">
          <img
            src={thumbnail}
            alt=""
            className=" w-full sm:min-w-[320px] sm:rounded-xl "
          />
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

export default SearchResult;
