import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getYouTubeData } from "../api/queries";
import InfiniteScroll from "react-infinite-scroll-component";
import HomeSkeleton from "../components/skeletons/HomeSkeleton";
import HomeCard from "../components/display-cards/HomeCard";

const Home = () => {
  // Using useInfiniteQuery to fetch data in an infinite-scrolling manner
  const { data, fetchNextPage, hasNextPage, error, isLoading } =
    useInfiniteQuery({
      queryKey: ["trending"],
      queryFn: ({ pageParam = "" }) =>
        // Fetching YouTube data with specified parameters
        getYouTubeData({
          endpoint: "videos",
          queryParams: {
            part: "snippet,statistics,contentDetails",
            chart: "mostPopular",
            maxResults: 12,
            pageToken: pageParam,
            regionCode: "IN",
          },
        }),
      getNextPageParam: (lastPage) => lastPage.nextPageToken, // Function to get the next page token
      staleTime: 1000 * 60 * 5, // 5min Stale time
    });

  // Flattening the data pages to get an array of videos
  const videos = data?.pages.flatMap((page) => page.items) || [];

  return (
    <section className="my-6">
      {/* Displaying error message if there's an error */}
      {error && (
        <div className="ml-5 mt-6 text-red-500">Error: {error.message}</div>
      )}

      {/* Infinite scrolling component */}
      <InfiniteScroll
        dataLength={videos.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        endMessage={
          <div className="pb-8 pl-7 pt-3 text-xl text-red-500 ">
            No more videos available
          </div>
        }
      >
        <div className="m-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Mapping through videos and rendering thumbnail cards */}
          {videos &&
            videos.map((video, index) => (
              <HomeCard key={video.id + index} video={video} />
            ))}
          {/* Rendering skeleton components while loading */}
          {isLoading &&
            Array.from({ length: 20 }).map((_, index) => (
              <HomeSkeleton key={index} />
            ))}
        </div>
      </InfiniteScroll>
    </section>
  );
};

export default Home;
