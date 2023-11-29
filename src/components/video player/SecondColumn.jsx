import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SecondColumn = () => {
  const { title } = useSelector((state) => state.video.videoDetails);
  console.log(title)

  
  return (
    <div className="mx-2 my-4 flex space-x-2 sm:mx-3">
      <div className="w-[150%] sm:w-1/2 md:w-[287px] lg:w-[228%] xl:w-[155%] 2xl:w-[90%] ">
        <img
          src="/assets/thumnail2.jpg"
          alt="thumnail"
          className="  rounded-lg sm:w-full md:h-[153px] md:w-full lg:h-[100px]   "
        />
      </div>

      {/* video title - channel name - views and time */}
      <div className="flex flex-col gap-1     ">
        <h2 className="line-clamp-2  font-bold text-gray-900 ">
          JavaScript setTimeout | Important Interview Questions in Hindi 🔥🚀 |
          Part 1
        </h2>

        <p className="line-clamp-1 text-sm text-gray-700">Music Fever</p>

        <p className="line-clamp-1 text-sm text-gray-700">
          13M views • 21 hours ago
        </p>
      </div>
    </div>
  );
};

export default SecondColumn;
