import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getYouTubeData } from "../api/queries";
import InfiniteScroll from "react-infinite-scroll-component";
import HomeThumnailCard from "../components/home/HomeThumnailCard";

const Home = () => {
  const { data, fetchNextPage, hasNextPage, error, isLoading } =
    useInfiniteQuery({
      queryKey: ["trending"],
      queryFn: ({ pageParam = "" }) =>
        getYouTubeData({
          endpoint: "videos",
          queryParams: {
            part: "snippet,statistics,contentDetails",
            chart: "mostPopular",
            maxResults: 10,
            pageToken: pageParam,
            regionCode: "IN",
          },
        }),
      getNextPageParam: (lastPage) => lastPage.nextPageToken,

      staleTime: 1000 * 60 * 5,
    });

  const videos = data?.pages.flatMap((page) => page.items) || [];

  return (
    <section>
      {data && !error && (
        <InfiniteScroll
          dataLength={videos.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
        >
          <div className="m-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {videos.map((video, index) => (
              <HomeThumnailCard key={video.id + index} video={video} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </section>
  );
};

export default Home;
