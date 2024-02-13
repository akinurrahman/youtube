import React from "react";
import { useParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getYouTubeData } from "../../../api/queries";
import InfiniteScroll from "react-infinite-scroll-component";
import ChannelLayout from "../../../components/channel/ChannelLayout";
import ChannelVideoSkeleton from "../../../components/skeletons/ChannelVideoSkeleton";
import Spinner from "../../../components/skeletons/Spinner";
import ChannelContentCard from "../../../components/channel/ChannelContentCard";
import DisplayNoContent from "../../../../utilities/DisplayNoContent";

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
        <DisplayNoContent
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

export default ChannelLives;
