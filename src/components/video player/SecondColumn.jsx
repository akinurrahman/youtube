import React from "react";
import useFetch from "../../utils/useFetch";
import { useSelector } from "react-redux";
import RecommenedVideoCard from "./RecommenedVideoCard";

const SecondColumn = () => {
  // api call for recommended videos
  const { title } = useSelector((state) => state.video.videoDetails);

  const { data: videos, loading } = useFetch(
    "search",
    {
      part: "snippet",
      maxResults: 2,
      q: title,
      type: "video",
      videoDuration: "medium",
    },
    [title],
  );

  return (
    <div>
      {loading || !videos ? (
        <h1>loading</h1>
      ) : (
        videos?.items?.map((video, index) => (
          <RecommenedVideoCard video={video} key={index} />
        ))
      )}
    </div>
  );
};

export default SecondColumn;
