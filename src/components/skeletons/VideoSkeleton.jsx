import React from "react";

const VideoSkeleton = () => {
  return (
    <div className=" animate-pulse">
      <div className="image-container my-2 rounded-lg bg-gray-300"></div>
      <div>
        <p className="my-1 h-2 bg-gray-300"></p>
        <p className="my-1 h-2 bg-gray-300"></p>
        <p className=" h-2 bg-gray-300"></p>
      </div>
    </div>
  );
};

export default VideoSkeleton;
