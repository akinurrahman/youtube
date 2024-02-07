import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { getYouTubeVideos } from "../api/queries";
import HomeThumnailCard from "../components/home/HomeThumnailCard";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const { data, isLoading, error, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
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

  return (
    <InfiniteScroll
      dataLength={videos?.length || 0}
      next={fetchNextPage}
      hasMore={hasNextPage}
    >
      <div className="m-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data &&
          !error &&
          videos.map((video, index) => (
            <HomeThumnailCard key={video.id + index} video={video} />
          ))}
      </div>
    </InfiniteScroll>
  );
};

export default Home;
