import React, { useState, useEffect } from "react";
import ThumnailCard from "../components/ThumnailCard";
import HomeSkeleton from "../components/skeletons/HomeSkeleton";
import useFetch from "../utils/useFetch";

const HomePage = () => {
  const { data: videos, loading } = useFetch("videos", {
    part: "snippet,statistics",
    chart: "mostPopular",
    regionCode: "IN",
    maxResults: 2,
  });

  const [videosLoaded, setVideosLoaded] = useState(false);

  useEffect(() => {
    if (videos && !loading) {
      setVideosLoaded(true);
    }
  }, [videos, loading]);

  return (
    <div className="m-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {!videosLoaded ? (
        // Show skeleton loader while loading
        Array.from({ length: 20 }).map((_, index) => (
          <HomeSkeleton key={index} />
        ))
      ) : // Display videos
      videos?.items?.length ? (
        videos.items.map((video, index) => (
          <ThumnailCard video={video} key={index} />
        ))
      ) : (
        <p>No videos available</p>
      )}
    </div>
  );
};

export default HomePage;
