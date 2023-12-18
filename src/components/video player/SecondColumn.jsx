import React, { useEffect } from "react";
import useApi from "../../hooks/useApi";
import { useSelector } from "react-redux";
import RecommenedVideoCard from "./RecommenedVideoCard";

const SecondColumn = () => {
  // api call for recommended videos
  const { title } = useSelector((state) => state.video.videoDetails);

  const {
    data: recommendedVideos,
    fetchData: fetchRecommendedVideos,
    loading,
  } = useApi();
  useEffect(() => {
    if (title) {
      const url = "search";
      const params = {
        part: "snippet",
        maxResults: 50,
        q: title,
        type: "video",
        videoDuration: "medium",
      };
      fetchRecommendedVideos(url, params);
    }
  }, [title]);

  return (
    <div>
      {loading || !recommendedVideos ? (
        <h1>loading</h1>
      ) : (
        recommendedVideos?.items?.map((video, index) => (
          <RecommenedVideoCard video={video} key={index} />
        ))
      )}
    </div>
  );
};

export default SecondColumn;
