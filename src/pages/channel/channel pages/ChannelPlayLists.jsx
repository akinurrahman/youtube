import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { getYouTubeData } from "../../../api/queries";
import InfiniteScroll from "react-infinite-scroll-component";

// Import custom components
import Spinner from "../../../components/skeletons/Spinner";
import ChannelLayout from "../../../components/channel/ChannelLayout";
import DisplayNoContent from "../../../components/utilities/DisplayNoContent";
import PlayListCard from "../../../components/display-cards/PlayListCard";
import VideoSkeleton from "../../../components/skeletons/VideoSkeleton";

const ChannelPlayLists = () => {
  const { channelId } = useParams();

  // Fetch playlists data using react-query
  const { data, isLoading, fetchNextPage, hasNextPage, error } =
    useInfiniteQuery({
      queryKey: ["channel playlists", channelId],
      queryFn: ({ pageParam }) =>
        getYouTubeData({
          endpoint: "playlists",
          queryParams: {
            part: "snippet,contentDetails",
            channelId: channelId,
            maxResults: 30,
            pageToken: pageParam,
            maxResults: 30,
          },
        }),
      enabled: !!channelId,
      getNextPageParam: (lastPage) => lastPage.nextPageToken,
      staleTime: 1000 * 60 * 5, // 5 min
    });

  // Extract playlists from fetched data
  const playlists = data?.pages.flatMap((page) => page.items) || [];

  return (
    <ChannelLayout>
      {/* Display loading skeleton while data is being fetched */}
      {isLoading && (
        <div className="mx-4 grid gap-3 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 15 }).map((_, index) => (
            <VideoSkeleton key={index} />
          ))}
        </div>
      )}

      {/* Display playlists if available */}
      {playlists.length > 0 && !error && (
        <InfiniteScroll
          dataLength={playlists?.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<Spinner />}
        >
          <div className="mx-4 grid gap-4 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {playlists.map((playlist, index) => (
              <PlayListCard key={playlist.id + index} playlist={playlist} />
            ))}
          </div>
        </InfiniteScroll>
      )}

      {/* Display message when no playlists are found */}
      {playlists.length < 1 && !error && (
        <DisplayNoContent
          message="This channel does not have any playlists"
          img="playlist not found.jpg"
        />
      )}
    </ChannelLayout>
  );
};

export default ChannelPlayLists;
