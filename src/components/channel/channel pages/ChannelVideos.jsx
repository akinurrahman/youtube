import React, { useEffect, useState } from "react";
import ChannelLayout from "../ChannelLayout";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { useSearchQuery, useVideosQuery } from "../../../api/youtubeService";
import { formatDuration } from "../../../helpers/formatDuration";
import { formatCount } from "../../../helpers/formatCount";
import { calculateTimeAgo } from "../../../helpers/calculateTimeAgo";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getYouTubeData } from "../../../api/queries";
import InfiniteScroll from "react-infinite-scroll-component";
import ChannelVideoSkeleton from "../../skeletons/ChannelVideoSkeleton";
import Spinner from "../../skeletons/Spinner";

const ChannelVideos = () => {
  const { channelId } = useParams();
  const location = useLocation();
  const path = location.pathname;

  let videoDuration;

  // Determine video duration based on URL path
  if (path === `/channel/${channelId}/shorts`) {
    videoDuration = "short";
  } else if (path === `/channel/${channelId}/videos`) {
    videoDuration = "medium";
  }

  const {
    data: videos,
    hasNextPage,
    fetchNextPage,
    isError: isErrorVideos,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["channel videos", channelId],
    queryFn: ({ pageParam }) =>
      getYouTubeData({
        endpoint: "search",
        queryParams: {
          part: "snippet",
          type: "video",
          videoDuration,
          channelId,
          maxResults: 15,
          pageToken: pageParam,
        },
      }),
    enabled: !!channelId,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
    staleTime: 1000 * 60 * 5,
  });

  const channelVideos = videos?.pages.flatMap((page) => page.items) || [];

  const RenderVideo = ({ video }) => {
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
      <div className="flex sm:flex-col ">
        {/* Display video thumbnail, duration, title, views, and time */}
        <div className="relative text-white">
          <img
            src={thumbnail}
            alt=""
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
            {viewCount} views • {timeAgo}
          </p>
        </div>
      </div>
    );
  };

  return (
    <ChannelLayout>
      <InfiniteScroll
        dataLength={channelVideos?.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={
          <div className="flex h-20 items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <div className="m-4 grid gap-4 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {isLoading &&
            Array.from({ length: 15 }).map((_, index) => (
              <ChannelVideoSkeleton key={index} />
            ))}
          {channelVideos &&
            !isErrorVideos &&
            channelVideos?.map((video, index) => {
              return <RenderVideo video={video} key={video.id.videoId + index} />;
            })}
        </div>
      </InfiniteScroll>
    </ChannelLayout>
  );
};

export default ChannelVideos;
