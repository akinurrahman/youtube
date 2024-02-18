import React from "react";

const HomeSkeleton = () => {
  return (
    <div className=" animate-pulse ">
      <div className="image-container  rounded-lg bg-gray-300 "></div>

      <div className="info my-2 flex space-x-4 px-1">
        <div className="logo h-[41px] w-[50px] rounded-full bg-gray-300 "></div>
        <div className="w-full space-y-1">
          <h2 className="h-[13px] w-full bg-gray-300 "></h2>
          <h2 className="h-[13px] w-full bg-gray-300 "></h2>
          <h2 className="h-[13px] w-full bg-gray-300 "></h2>
        </div>
      </div>
    </div>
  );
};

export default HomeSkeleton;
