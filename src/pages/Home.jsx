import React from "react";
import ThumnailCard from "../components/ThumnailCard";
import HomeSkeleton from "../components/skeletons/HomeSkeleton";
import useFetch from "../utils/useFetch";

const HomePage = () => {
  const { data: videos, loading } = useFetch("videos", {
    part: "snippet,statistics,contentDetails",
    chart: "mostPopular",
    regionCode: "IN",
    maxResults: 5,
  });

  const skeleton = Array.from({ length: 20 });
  return (
    <div className="m-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {!loading && videos
        ? videos.items.map((video, index) => (
            <ThumnailCard video={video} key={index} />
          ))
        : skeleton.map((_, index) => <HomeSkeleton key={index} />)}
    </div>
  );
};

export default HomePage;
