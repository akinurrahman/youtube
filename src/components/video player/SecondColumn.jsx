import React from "react";
import { useSelector } from "react-redux";
import RecommenedVideoCard from "./RecommenedVideoCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getYouTubeData } from "../../api/queries";
import { recommendedSkeleton } from "../skeletons/RecommendredSkeleton";

const SecondColumn = () => {
  // Select the title from Redux state
  const title = useSelector((state) => state.info.title);

  // Fetch data using Infinite Query
  const { data, isLoading, error, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["recommended", title],
      queryFn: ({ pageParam }) =>
        getYouTubeData({
          endpoint: "search",
          queryParams: {
            part: "snippet",
            maxResults: 10,
            q: title,
            type: "video",
            videoDuration: "medium",
            pageToken: pageParam,
          },
        }),
      getNextPageParam: (lastPage) => lastPage.nextPageToken,
      enabled: !!title,
    });

  // Flatten the data and extract recommended videos
  const recommendedVideos = data?.pages.flatMap((page) => page.items) || [];

  return (
    <div>
      {/* Render recommended videos */}
      {data &&
        !error &&
        recommendedVideos.map((video) => (
          <RecommenedVideoCard video={video} key={video.id.videoId} />
        ))}

      {/* Render error message if error occurs */}
      {error && (
        <div className="ml-5 mt-6 text-red-500">Error: {error.message}</div>
      )}

      {/* Render loading skeletons while data is loading */}
      {isLoading &&
        Array.from({ length: 20 }).forEach(() => recommendedSkeleton())}
      {hasNextPage && (
        <div className="w-full   text-center font-bold text-white">
          <button
            onClick={fetchNextPage}
            className="rounded-lg bg-gray-500 px-4 py-2 hover:bg-gray-400"
          >
            Fetch More Comments
          </button>
        </div>
      )}
    </div>
  );
};

export default SecondColumn;
