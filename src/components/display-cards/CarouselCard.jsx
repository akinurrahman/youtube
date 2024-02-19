import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getYouTubeData } from "../../api/queries";
import { formatDuration } from "../../helpers/formatDuration";
import { calculateTimeAgo } from "../../helpers/calculateTimeAgo";
import { formatCount } from "../../helpers/formatCount";
import { useNavigate } from "react-router-dom";
import Img from "../lazy load/Img";
import { RiMenuUnfoldFill } from "react-icons/ri";

const CarouselCard = ({ item, isPlaylist }) => {
  const navigate = useNavigate();
  const videoId = item.id.videoId || "";

  // Fetch video info using useQuery
  const { data: videoInfo } = useQuery({
    queryKey: ["videoInfo", videoId],
    queryFn: () =>
      getYouTubeData({
        endpoint: "videos",
        queryParams: {
          part: "snippet,contentDetails,statistics",
          id: videoId,
        },
      }),
    enabled: !!videoId,
    staleTime: 1000 * 60 * 5,
  });

  // Extract statistics and content details from video info
  const { statistics, contentDetails } = videoInfo?.items[0] || {};

  // Extract necessary video details
  const thumbnail = item?.snippet.thumbnails.medium.url || "";
  const rawDuration = contentDetails?.duration || "";
  const rawView = statistics?.viewCount || "";
  const duration = rawDuration ? formatDuration(rawDuration) : "";
  const viewCount = rawView ? formatCount(rawView) : "";
  const title = item?.snippet.title || "";
  const publishedAt = item?.snippet.publishedAt || "";
  const timeAgo = publishedAt ? calculateTimeAgo(publishedAt) : "";
  const itemCount = item?.contentDetails?.itemCount || 0;

  // Function to handle navigation based on playlist or single video
  const handleNavigate = () => {
    if (isPlaylist === "Playlists") {
      navigate(`/playlist/${item.id}`);
    } else {
      navigate(`/watch/${videoId}`);
    }
  };

  return (
    <div onClick={handleNavigate}>
      <div className="image__container--crousel  rounded-md bg-gray-300">
        <Img src={thumbnail} alt="" className="rounded-md" />
        {duration ? (
          <p className="absolute bottom-[8px] right-[6px] z-10 rounded-md bg-black bg-opacity-70 px-2 text-white">
            {duration}
          </p>
        ) : (
          <p className="absolute bottom-[8px] right-[6px] z-10 flex items-center gap-1 rounded-md bg-black bg-opacity-70 px-2 text-white">
            <RiMenuUnfoldFill /> {itemCount}
          </p>
        )}
      </div>
      <div className="my-1">
        <h2 className="line-clamp-2 leading-none">{title}</h2>
        {isPlaylist === "Playlists" ? (
          <p className="line-clamp-1 text-sm font-extralight">
            Watch full Playlist • {timeAgo}
          </p>
        ) : (
          <p className="line-clamp-1 text-sm font-extralight">
            {viewCount} views • {timeAgo}
          </p>
        )}
      </div>
    </div>
  );
};

export default CarouselCard;
