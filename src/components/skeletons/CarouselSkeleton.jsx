import React from "react";

const CarouselSkeleton = () => {
  return (
    <div>
      <div className="image__container--crousel  rounded-md bg-gray-300"></div>
      <div className="my-1">
        <h2 className="my-1 h-2 bg-gray-300 leading-none"></h2>
        <h2 className="my-1 h-2 bg-gray-300 leading-none"></h2>
        <h2 className="my-1 h-2 bg-gray-300 leading-none"></h2>
      </div>
    </div>
  );
};

export default CarouselSkeleton;
