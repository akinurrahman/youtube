import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { getYouTubeData } from "../../../api/queries";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../../../components/skeletons/Spinner";
import ChannelLayout from "../../../components/channel/ChannelLayout";
import ChannelPlaylistsCard from "../../../components/channel/ChannelPlaylistsCard";
import PlaylistsSkeleton from "../../../components/skeletons/PlaylistsSkeleton";
import DisplayNoContent from "../../../../utilities/DisplayNoContent";

const ChannelPlayLists = () => {
  const { channelId } = useParams();

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
      staleTime: 1000 * 60 * 5,
    });
  const playlists = data?.pages.flatMap((page) => page.items) || [];

  return (
    <ChannelLayout>
      {isLoading && (
        <div className="mx-4 grid gap-4 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 5 }).map(() => (
            <PlaylistsSkeleton />
          ))}
        </div>
      )}
      {playlists.length > 0 && !error && (
        <InfiniteScroll
          dataLength={playlists?.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<Spinner />}
        >
          <div className="mx-4 grid gap-4 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {playlists.map((playlist, index) => (
              <ChannelPlaylistsCard
                key={playlist.id + index}
                playlist={playlist}
              />
            ))}
          </div>
        </InfiniteScroll>
      )}
      {playlists.length < 1 && !error && (
        <DisplayNoContent
          message={`This channel does not have any playlists`}
          img={"playlist not found.jpg"}
        />
      )}
    </ChannelLayout>
  );
};

export default ChannelPlayLists;
