import React, { useEffect, useState } from "react";
import ThumnailCard from "../components/ThumnailCard";
import { fetchDataFromApi } from "../utils/api";

const HomePage = () => {
  

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchDataFromApi("videos", {
      part: "snippet, statistics",
      chart: "mostPopular",
      regionCode: "IN",
      maxResults: 3,
    }).then((res) => {
      setVideos(res.items);
    });
  }, []);
 

  return (
    <div className="m-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {videos.length > 0 ? (
        videos.map((video, index) => <ThumnailCard video={video} key={index} />)
      ) : (
        <p>Loading...</p>
      )}
    </div>
    
  );
};

export default HomePage;
