import React from "react";
import ChannelLayout from "../ChannelLayout";
import { useSearchQuery, useVideosQuery } from "../../../api/youtubeService";
import { NavLink, useParams } from "react-router-dom";
import { calculateTimeAgo } from "../../../helpers/calculateTimeAgo";
import { formatDuration } from "../../../helpers/formatDuration";
import { formatCount } from "../../../helpers/formatCount";

const ChannelLives = () => {
  const { channelId } = useParams();
  const { data: channelLives } = useSearchQuery({
    part: "snippet",
    channelId: channelId,
    eventType: "completed",
    type: "video",
  });

  const channelIds =
    channelLives?.items?.map((video) => video.id.videoId).join(",") || "";
  const { data: videoInfo } = useVideosQuery({
    part: "statistics,contentDetails",
    id: channelIds,
  });

  const renderChannelLives = () => {
    return channelLives?.items?.map((live, index) => {
      // Find additional video information
      const additionVideoInfo = videoInfo?.items?.find(
        (elem) => elem.id === live.id.videoId,
      );
      const thumbnail = live?.snippet?.thumbnails?.medium?.url || "";
      const title = live?.snippet?.title || "";
      const publishedAt = live?.snippet?.publishedAt || "";
      const timeAgo = publishedAt ? calculateTimeAgo(publishedAt) : "N/A";

      // Extract duration and view count for each video
      const rawDuration = additionVideoInfo?.contentDetails?.duration || "";
      const rawView = additionVideoInfo?.statistics?.viewCount || "";
      // const duration = rawDuration ? formatDuration(rawDuration) : "";
      const duration = rawDuration ? formatDuration(rawDuration) : "";
      const viewCount = rawView ? formatCount(rawView) : "";
      return (
        <NavLink key={index} className={"flex sm:flex-col"}>
          <div className="relative text-white">
            <img
              src={thumbnail}
              alt="thumnail"
              className="mr-2 max-w-[155px] rounded-lg sm:w-full sm:max-w-full"
            />
            <p className="absolute bottom-2 right-3 z-10 rounded-md bg-black bg-opacity-70 px-2">
              {duration}
            </p>
          </div>

          <div>
            <h2 className="line-clamp-3 font-semibold leading-tight sm:mt-1 sm:line-clamp-2">
              {title}
            </h2>
            <p className="line-clamp-1 text-sm font-extralight">
              {viewCount} views • Streamed {timeAgo}
            </p>
          </div>
        </NavLink>
      );
    });
  };

  const noLiveAvailable = () => {
    return (
      <div className=" relative flex w-screen flex-col items-center justify-center">
        <img src="/assets/video not found.webp" alt="" className="w-[20rem] " />
        <h2 className="absolute bottom-9 font-semibold sm:text-lg lg:text-2xl">
          This channel has no Live videos
        </h2>
      </div>
    );
  };

  // Render videos in a grid layout within ChannelLayout
  return (
    <ChannelLayout>
      <div className="m-4  grid gap-4 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {channelLives?.items?.length > 0
          ? renderChannelLives()
          : noLiveAvailable()}
      </div>
    </ChannelLayout>
  );
};

export default ChannelLives;
