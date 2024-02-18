import React from "react";
import VideoPlayback from "../components/video player/VideoPlayback";
import Recommended from "../components/video player/Recommended";

const VideoPlayer = () => {
  return (
    <div className="lg:flex ">
      <div className="column-1  lg:w-[75%]  ">
        <VideoPlayback />
      </div>
      <div className="column-2 m-3 mt-4 h-screen lg:w-[25%] ">
        <Recommended />
      </div>
    </div>
  );
};

export default VideoPlayer;
