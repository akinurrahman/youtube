import React from "react";
import { calculateTimeAgo } from "../../helpers/calculateTimeAgo";
import { NavLink } from "react-router-dom";
import { formatCount } from "../../helpers/formatCount";
import useFetch from "../../hooks/useFetch";
import { useDispatch } from "react-redux";
import {
  clearVideoDetails,
  setVideoDetails,
} from "../../redux/features/VideoSlice";
import { formatDuration } from "../../helpers/formatDuration";
import { useChannelsQuery, useVideosQuery } from "../../api/youtubeService";

const PlayListBottom = ({ video, channelID }) => {
  const dispatch = useDispatch();
  const thumbnail = video?.snippet?.thumbnails?.medium?.url;
  const title = video?.snippet?.title;
  const timeAgo =
    video?.snippet && calculateTimeAgo(video?.snippet?.publishedAt);
  const videoID = video?.snippet && video?.snippet?.resourceId?.videoId;

  const { data: videoData } = useVideosQuery({
    part: "statistics,contentDetails",
    id: videoID,
  });

  // formatting view and like count
  const duration =
    videoData?.items[0] &&
    formatDuration(videoData?.items[0].contentDetails?.duration);
  const viewCount =
    videoData?.items[0] &&
    formatCount(videoData?.items[0].statistics?.viewCount);
  const likeCount =
    videoData?.items[0] &&
    formatCount(videoData?.items[0].statistics?.likeCount);

  const { data: channelData } = useChannelsQuery({
    part: "snippet,statistics,brandingSettings",
    id: channelID,
  });
  let avatar = channelData?.items[0]?.snippet?.thumbnails?.default?.url;
  let subsCount =
    channelData?.items[0] &&
    formatCount(channelData?.items[0]?.statistics?.subscriberCount);


  return (
    <NavLink to={`/watch/${videoID}`} className=" flex " >
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

export default PlayListBottom;
