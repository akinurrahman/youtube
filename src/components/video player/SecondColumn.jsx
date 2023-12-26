import React from "react";
import { useSelector } from "react-redux";
import { useSearchQuery } from "../../api/youtubeService";
import RecommenedVideoCard from "./RecommenedVideoCard";

const SecondColumn = () => {
  const title = useSelector((state) => state.info.title);
  const {
    data: recommendedVideos,
    isLoading,
    error,
  } = useSearchQuery({
    part: "snippet",
    maxResults: 8,
    q: title,
    type: "video",
    videoDuration: "medium",
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      {recommendedVideos?.items?.map((video, index) => (
        <RecommenedVideoCard video={video} key={index} />
      ))}
    </div>
  );
};

export default SecondColumn;
