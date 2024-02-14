import React from "react";

const PlaylistsSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="img-area min-h-[185px] rounded-lg bg-gray-300"></div>
      <div className="text--area my-2">
        <p className="text-content my-1 h-1 bg-gray-300"></p>
        <p className="text-content my-1 h-1 bg-gray-300"></p>
        <p className="text-content my-1 h-1 bg-gray-300"></p>
        <p className="text-content my-1 h-1 bg-gray-300"></p>
      </div>
    </div>
  );
};

export default PlaylistsSkeleton;
