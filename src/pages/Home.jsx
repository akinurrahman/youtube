import React from "react";
import HomeThumnailCard from "../components/home/HomeThumnailCard";
import { useVideosQuery } from "../api/youtubeService";

const Home = () => {
  // API call to get home videos
  const { data, isLoading, error } = useVideosQuery({
    part: "snippet,statistics,contentDetails",
    chart: "mostPopular",
    regionCode: "IN",
    maxResults: 20,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // todo : create separate components for each error codes
  if (error) {
    const status = error.status || "Unknown";
    const message = error?.data?.error?.message || "Unknown error occurred";
    return (
      <div>
        <p>Error: {status}</p>
        <p>{message}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="m-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.items?.map((video, index) => (
          <HomeThumnailCard video={video} key={index} />
        )) ?? null}
      </div>
    </div>
  );
};

export default Home;
