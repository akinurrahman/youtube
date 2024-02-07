import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React from "react";
import { getYouTubeVideos } from "./src/api/queries";
import HomeThumnailCard from "./src/components/home/HomeThumnailCard";

const Testing = () => {
  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["trending"],
    queryFn: ({ pageParam = "" }) =>
      getYouTubeVideos({
        endpoint: "videos",
        queryParams: {
          part: "snippet",
          chart: "mostPopular",
          maxResults: 20,
          pageToken: pageParam,
        },
      }),
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
    staleTime: 1000 * 60 * 5,
  });

  // Flatten data for easier mapping
  const videos = data?.pages.flatMap((page) => page.items);
  console.log("videos are ", videos);
  console.log("data are ", data);
  return (
    <div className="m-24 p-24">
      {isLoading && <p className="m-24 p-24">loading....</p>}
      <div className="m-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {videos?.map((video, index) => (
          <HomeThumnailCard key={index} video={video} />
        ))}
        {hasNextPage && (
          <button onClick={() => fetchNextPage()}>Load More</button>
        )}
      </div>
    </div>
  );
};

export default Testing;
