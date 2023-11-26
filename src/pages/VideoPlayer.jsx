import React from "react";
import FirstColumn from "../components/video player/FirstColumn";
import SecondColumn from "../components/video player/SecondColumn";

const VideoPlayer = () => {
  return (
    <div className="lg:flex ">
      <div className="column-1 h-screen lg:w-[70%]  ">
        <FirstColumn />
      </div>
      <div className="column-2 h-screen bg-red-500 lg:w-[30%]">
        <SecondColumn />
      </div>
    </div>
  );
};

export default VideoPlayer;
