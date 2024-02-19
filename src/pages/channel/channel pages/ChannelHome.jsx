import React from "react";
import ChannelLayout from "../../../components/channel/ChannelLayout";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getYouTubeData } from "../../../api/queries";
import { useParams } from "react-router-dom";
import Carousel from "../../../components/channel/Carousel";
import CarouselSkeleton from "../../../components/skeletons/CarouselSkeleton";

const ChannelHome = () => {
  const { channelId } = useParams();

  // Query for fetching channel videos
  const {
    data: channelVideos,
    isError: isVideoError,
    isLoading: isVideoLoading,
  } = useInfiniteQuery({
    queryKey: ["channel videos", channelId, "medium"],
    queryFn: ({ pageParam }) =>
      getYouTubeData({
        endpoint: "search",
        queryParams: {
          part: "snippet",
          type: "video",
          videoDuration: "medium",
          channelId,
          maxResults: 30,
          pageToken: pageParam,
        },
      }),
    enabled: !!channelId,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
    staleTime: 1000 * 60 * 5,
  });

  // Extracting videos from fetched channel videos data
  const videos = channelVideos?.pages.flatMap((page) => page.items) || [];

  // Query for fetching channel live videos
  const {
    data: channelLives,
    isError: isLiveError,
    isLoading: isLiveLoading,
  } = useInfiniteQuery({
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
          maxResults: 30,
        },
      }),
    enabled: !!channelId,
    staleTime: 1000 * 60 * 5,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });

  // Extracting live videos from fetched channel live videos data
  const lives = channelLives?.pages.flatMap((page) => page.items) || [];

  // Fetch playlists data using react-query
  const {
    data: channelPlaylists,
    isLoading: isPlaylistsLoading,
    error: isPlaylistsError,
  } = useInfiniteQuery({
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
  const playlists = channelPlaylists?.pages.flatMap((page) => page.items) || [];

  return (
    <ChannelLayout>
      {/* Skeleton loading for videos */}
      {isVideoLoading && (
        <div className="mt-[20px]">
          <p className="mx-4  h-5 w-[150px] bg-gray-300"></p>
          <div className="mx-4 my-2 flex w-full gap-3 overflow-auto">
            {Array.from({ length: 15 }).map((_, index) => (
              <CarouselSkeleton key={index} />
            ))}
          </div>
        </div>
      )}

      {/* Skeleton loading for live videos */}
      {isLiveLoading && (
        <div className="mt-[20px]">
          <p className="mx-4  h-5 w-[150px] bg-gray-300"></p>
          <div className="mx-4 my-2 flex w-full gap-3 overflow-auto">
            {Array.from({ length: 15 }).map((_, index) => (
              <CarouselSkeleton key={index} />
            ))}
          </div>
        </div>
      )}

      {/* Skeleton loading for playlists */}
      {isPlaylistsLoading && (
        <div className="mt-[20px]">
          <p className="mx-4  h-5 w-[150px] bg-gray-300"></p>
          <div className="mx-4 my-2 flex w-full gap-3 overflow-auto">
            {Array.from({ length: 15 }).map((_, index) => (
              <CarouselSkeleton key={index} />
            ))}
          </div>
        </div>
      )}

      {/* Rendering carousel for videos if available */}
      {videos?.length > 0 && !isVideoError && (
        <Carousel data={videos} title={"Videos"} />
      )}

      {/* Rendering carousel for live videos if available */}
      {lives?.length > 0 && !isLiveError && (
        <Carousel data={lives} title={"Lives"} />
      )}

      {/* Rendering carousel for playlists if available */}
      {playlists?.length > 0 && !isPlaylistsError && (
        <Carousel data={playlists} title={"Playlists"} />
      )}
    </ChannelLayout>
  );
};

export default ChannelHome;
