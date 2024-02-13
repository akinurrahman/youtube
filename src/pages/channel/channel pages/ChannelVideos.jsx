import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getYouTubeData } from "../../../api/queries";
import InfiniteScroll from "react-infinite-scroll-component";
import ChannelLayout from "../../../components/channel/ChannelLayout";
import DisplayNotAvailable from "../../../../utilities/DisplayNotAvailable";
import ChannelVideoSkeleton from "../../../components/skeletons/ChannelVideoSkeleton";
import Spinner from "../../../components/skeletons/Spinner";
import ChannelContentCard from "../../../components/channel/ChannelContentCard";

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
    queryKey: ["channel videos", channelId, videoDuration],
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
      {channelVideos.length < 1 && (
        <DisplayNotAvailable
          message={`This channel does not have ${
            videoDuration === "short" ? "any short videos" : "videos"
          }`}
          img={"video not found.jpg"}
        />
      )}

      {/* Render videos if available */}
      {channelVideos.length > 0 && !isErrorVideos && (
        <InfiniteScroll
          dataLength={channelVideos?.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<Spinner />}
        >
          <div className="m-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {channelVideos.map((video, index) => (
              <ChannelContentCard
                key={video.id.videoId + index}
                video={video}
              />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </ChannelLayout>
  );
};

export default ChannelVideos;
