

import React from "react";
import ThumnailCard from "../components/ThumnailCard";
import { useVideosQuery } from "../api/youtubeService";

const Home = () => {
  const { data, isLoading, error } = useVideosQuery({
    part: "snippet,statistics,contentDetails",
    chart: "mostPopular",
    regionCode: "IN",
    maxResults: 20,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <div className="m-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.items?.map((video, index) => (
          <ThumnailCard video={video} key={index} />
        )) ?? null}
      </div>
    </div>
  );
};

export default Home;
