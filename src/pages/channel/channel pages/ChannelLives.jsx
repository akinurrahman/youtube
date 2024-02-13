import React from "react";
import { useSearchQuery, useVideosQuery } from "../../../api/youtubeService";
import { NavLink, useParams } from "react-router-dom";
import { calculateTimeAgo } from "../../../helpers/calculateTimeAgo";
import { formatDuration } from "../../../helpers/formatDuration";
import { formatCount } from "../../../helpers/formatCount";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getYouTubeData } from "../../../api/queries";
import InfiniteScroll from "react-infinite-scroll-component";
import ChannelLayout from "../../../components/channel/ChannelLayout";
import ChannelVideoSkeleton from "../../../components/skeletons/ChannelVideoSkeleton";
import DisplayNotAvailable from "../../../../utilities/DisplayNotAvailable";
import Spinner from "../../../components/skeletons/Spinner";

const ChannelLives = () => {
  const { channelId } = useParams();

  const { data, hasNextPage, fetchNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["Channel lives", channelId],
      queryFn: ({ pageParam }) =>
        getYouTubeData({
          endpoint: "search",
          queryParams: {
            part: "snippet",
            channelId: channelId,
            eventType: "completed",
            type: "video",
            pageToken: pageParam,
          },
        }),
      enabled: !!channelId,
      staleTime: 1000 * 60 * 5,
      getNextPageParam: (lastPage) => lastPage.nextPageToken,
    });

  // Extract video items from the data
  const channelLives = data?.pages.flatMap((page) => page.items) || [];

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

  // Render videos in a grid layout within ChannelLayout
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
      {channelLives.length < 1 && (
        <DisplayNotAvailable
          message={`This channel does not have Lives`}
          img={"video not found.jpg"}
        />
      )}

      {/* Render videos if available */}
      {channelLives.length > 0 && !isError && (
        <InfiniteScroll
          dataLength={channelLives?.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<Spinner />}
        >
          <div className="m-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {channelLives.map((video, index) => (
              <RenderVideo key={video.id.videoId + index} video={video} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </ChannelLayout>
  );
};

export default ChannelLives;
