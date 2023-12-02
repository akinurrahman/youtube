import React from "react";
import ThumnailCard from "../components/ThumnailCard";
import SkeletonLoader from "../components/SkeletonLoader";
import useFetch from "../utils/useFetch";
const HomePage = () => {
  const { data: videos, loading } = useFetch("videos", {
    part: "snippet,statistics",
    chart: "mostPopular",
    regionCode: "IN",
    maxResults: 20,
  });
// console.log(videos?.items)
  return (
    <div className="m-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {loading || !videos
        ? // Show skeleton loader or loading placeholder
          Array.from({ length: 10 }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))
        : // Display fetched data or "No videos available" text
          videos?.items?.map((video, index) => (
            <ThumnailCard video={video} key={index} />
          )) || <p>No videos available</p>}
    </div>
  );
};

export default HomePage;
