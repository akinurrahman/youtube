import React from "react";

const ChannelHomeContentSkeleton = () => {
  return (
    <div className="  flex flex-col gap-1">
      <div className="img h-[95px] w-[150px] rounded-lg bg-gray-300 sm:h-[117px] sm:w-[194px] "></div>
      <div>
        <p className="my-1 h-1 bg-gray-300"></p>
        <p className="my-1 h-1 bg-gray-300"></p>
        <p className="my-1 h-1 bg-gray-300"></p>
      </div>
    </div>
  );
};

export default ChannelHomeContentSkeleton;
