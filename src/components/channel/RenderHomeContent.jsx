import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getYouTubeData } from "../../api/queries";
import { formatDuration } from "../../helpers/formatDuration";
import { calculateTimeAgo } from "../../helpers/calculateTimeAgo";
import { formatCount } from "../../helpers/formatCount";

const RenderHomeContent = ({ video }) => {
  const videoId = video.id.videoId || "";
  const { data: videoInfo } = useQuery({
    queryKey: ["videoInfo", videoId],
    queryFn: () =>
      getYouTubeData({
        endpoint: "videos",
        queryParams: {
          part: "statistics,contentDetails",
          id: videoId,
        },
      }),

    enabled: !!videoId,
    staleTime: 1000 * 60 * 5,
  });
  const { statistics, contentDetails } = videoInfo?.items[0] || {};

  // Extract necessary video details
  const thumbnail = video?.snippet.thumbnails.medium.url || "";
  const rawDuration = contentDetails?.duration || "";
  const rawView = statistics?.viewCount || "";
  const duration = rawDuration ? formatDuration(rawDuration) : "";
  const viewCount = rawView ? formatCount(rawView) : "";
  const title = video?.snippet.title || "";
  const publishedAt = video?.snippet.publishedAt || "";
  const timeAgo = publishedAt ? calculateTimeAgo(publishedAt) : "";
  return (
    <div className="flex flex-col ">
      <div className=" relative h-[95px] w-[150px]   text-white sm:h-[117px] sm:w-[194px]">
        <img
          src={thumbnail}
          alt=""
          className="mr-2 w-full  rounded-lg sm:w-full sm:max-w-full"
        />
        <p className="absolute bottom-[17px] right-[6px] z-10 rounded-md bg-black bg-opacity-70 px-2">
          {duration}
        </p>
      </div>

      <div className="w-[150px] sm:w-[194px]">
        <h2 className="line-clamp-2  leading-none ">{title}</h2>
        <p className="line-clamp-1 text-sm font-extralight">
          {viewCount} views • {timeAgo}
        </p>
      </div>
    </div>
  );
};

export default RenderHomeContent;


