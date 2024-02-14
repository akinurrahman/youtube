import React, { useRef } from "react";
import RenderHomeContent from "./RenderHomeContent";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

const Carousel = ({ data, title }) => {
  // Ref to access the carousel container
  const carouselContainer = useRef();

  // Function to handle carousel scrolling
  const carouselScrollHandler = (direction) => {
    const container = carouselContainer.current;
    const scrollAmount =
      direction === "left"
        ? container.scrollLeft - container.offsetWidth
        : container.scrollLeft + container.offsetWidth;

    // Smooth scroll to the specified position
    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="carousel relative max-w-[1400px]">
      {/* Left arrow */}
      <BsFillArrowLeftCircleFill
        className="absolute left-8 top-[43%] z-10 hidden cursor-pointer text-3xl text-[#b38e8e] md:block"
        onClick={() => carouselScrollHandler("left")}
      />
      {/* Right arrow */}
      <BsFillArrowRightCircleFill
        className="absolute right-6 top-[43%] z-10 hidden cursor-pointer text-3xl text-[#b38e8e] md:block"
        onClick={() => carouselScrollHandler("right")}
      />

      {/* Carousel title */}
      <h2 className="px-4 py-2 text-xl">{title}</h2>

      {/* Carousel content */}
      <div
        className="carouselItems flex w-full gap-3 overflow-auto px-4 py-2"
        ref={carouselContainer}
      >
        {/* Render each video content */}
        {data?.map((item) => {
          const videoId = item.id.videoId || item.id || "";
          return (
            <RenderHomeContent item={item} key={videoId} isPlaylist={title} />
          );
        })}
      </div>
    </section>
  );
};

export default Carousel;
