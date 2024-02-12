import React from "react";

const displayNotAvailable = (
  message = "not found",
  img = "video not found.jpg",
) => {
  return (
    <div className=" w-full  p-4">
      <img
        src={`/assets/${img}`}
        alt=""
        className="  mx-auto rounded-lg sm:w-3/5 md:w-[50%] lg:w-[40%] 2xl:w-[30%]"
      />
      <h2 className="  py-3 text-center text-xl italic text-blue-600">
        {message}
      </h2>
    </div>
  );
};

export default displayNotAvailable;
