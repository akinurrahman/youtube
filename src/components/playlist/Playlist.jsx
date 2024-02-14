import React from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getYouTubeData } from "../../api/queries";
import { useParams } from "react-router-dom";
import PlaylistTop from "./PlaylistTop";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../skeletons/Spinner";
import ChannelContentCard from "../channel/ChannelContentCard";

const Playlist = () => {
  const { playListId } = useParams();

  // API Call to get playlist info
  const { data: playListInfo, error: playlistError } = useQuery({
    queryKey: ["playlist info", playListId],
    queryFn: () =>
      getYouTubeData({
        endpoint: "playlists",
        queryParams: {
          part: "snippet,contentDetails",
          id: playListId,
        },
      }),
    enabled: !!playListId,
    staleTime: 1000 * 60 * 5, // 5 min
  });

  // Extracting necessary playlist info
  const { snippet, contentDetails } = playListInfo?.items[0] || {};
  const playListTitle = snippet?.title || "";
  const videoCount = contentDetails?.itemCount || 0;
  const publishedAt = snippet?.publishedAt || "";
  const timeAgo = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // API Call to get playlist videos
  const {
    data: playListData,
    error: videosError,
    isLoading: loadingVideos,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["playlist videos", playListId],
    queryFn: ({ pageParam }) =>
      getYouTubeData({
        endpoint: "playlistItems",
        queryParams: {
          part: "snippet",
          playlistId: playListId,
          maxResults: 20,
          pageToken: pageParam,
        },
      }),
    enabled: !!playListId,
    staleTime: 1000 * 60 * 5,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });

  // Extracting playlist videos
  const playlistVideos = playListData?.pages.flatMap((page) => page.items) || [];

  // Extracting additional data for rendering
  const cover = snippet?.thumbnails?.medium?.url || "";
  const channelName = snippet?.channelTitle || "";
  const data = {
    cover,
    channelName,
    playListTitle,
    videoCount,
    timeAgo,
  };

  return (
    <div className="mx-auto mt-4 px-3 lg:flex lg:gap-3 xl:mx-6">
      {/* Render playlist top section if data is available */}
      {playListInfo && !playlistError && (
        <section className="flex flex-col rounded-lg bg-gray-700 p-4 text-white sm:flex-row sm:gap-3 lg:my-4 lg:w-[80%] lg:flex-col lg:rounded-xl xl:max-w-[30%]">
          <PlaylistTop data={data} />
        </section>
      )}

      {/* Render playlist videos if data is available and no error occurred */}
      {playlistVideos?.length > 0 && !videosError && (
        <InfiniteScroll
          dataLength={playlistVideos?.length}
          hasMore={hasNextPage}
          next={fetchNextPage}
          loader={<Spinner />}
        >
          <section className="mx-1 mt-3 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:my-4 lg:grid-cols-2 xl:grid-cols-3">
            {playlistVideos?.map((video) => (
              <ChannelContentCard key={video.id} video={video} />
            ))}
          </section>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Playlist;
