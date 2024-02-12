import React from "react";
import ChannelLayout from "../ChannelLayout";
import { useLocation, useParams } from "react-router-dom";
import { formatDuration } from "../../../helpers/formatDuration";
import { formatCount } from "../../../helpers/formatCount";
import { calculateTimeAgo } from "../../../helpers/calculateTimeAgo";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getYouTubeData } from "../../../api/queries";
import InfiniteScroll from "react-infinite-scroll-component";
import ChannelVideoSkeleton from "../../skeletons/ChannelVideoSkeleton";
import Spinner from "../../skeletons/Spinner";
import displayNotAvailable from "../../../../utilities/displayNotAvailable";

const ChannelVideos = () => {
  // Get channelId and path from the URL
  const { channelId } = useParams();
  const location = useLocation();
  const path = location.pathname;

  // Determine video duration based on the path
  let videoDuration;
  if (path === `/channel/${channelId}/shorts`) {
    videoDuration = "short";
  } else if (path === `/channel/${channelId}/videos`) {
    videoDuration = "medium";
  }

  // Fetch videos using infinite query
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

  // Extract video items from the data
  const channelVideos = videos?.pages.flatMap((page) => page.items) || [];

  // Render individual video
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

    // Render video details
    return (
      <div className="flex sm:flex-col">
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
      {/* Show skeletons while loading */}
      <div className="m-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {isLoading &&
          Array.from({ length: 15 }).map((_, index) => (
            <ChannelVideoSkeleton key={index} />
          ))}
      </div>

      {/* Display message if no videos are available */}
      {channelVideos.length < 1 &&
        displayNotAvailable(
          `This channel does not have ${
            videoDuration === "short" ? "any short videos" : "videos"
          }`,
          "video not found.jpg",
        )}

      {/* Infinite scroll container */}
      <InfiniteScroll
        dataLength={channelVideos?.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<Spinner />}
      >
        {/* Conditionally render videos or videoNotAvailable */}
        {channelVideos.length > 0 && !isErrorVideos && (
          <div className="m-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {channelVideos.map((video, index) => (
              <RenderVideo key={video.id.videoId + index} video={video} />
            ))}
          </div>
        )}
      </InfiniteScroll>
    </ChannelLayout>
  );
};

export default ChannelVideos;
