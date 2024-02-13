import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import RenderHomeContent from "./RenderHomeContent";

const ChannelHomeCrousel = ({ data }) => {
  // Ref for accessing the carousel container
  const crouselContainer = useRef();

  // Function to handle carousel scrolling
  const carouselScrollHandler = (direction) => {
    const container = crouselContainer.current;
    // Calculate the amount to scroll based on the specified direction
    const scrollAmount =
      direction === "left"
        ? container.scrollLeft - container.offsetWidth
        : container.scrollLeft + container.offsetWidth;

    // Scroll to the calculated position with smooth animation
    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="crousel relative max-w-[1400px] ">
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

      <h2 className="px-4 py-2 text-xl">Videos</h2>
      {
        <div
          className="crouselItems flex w-full gap-3 overflow-auto px-4 py-2"
          ref={crouselContainer}
        >
          {data?.map((video, index) => (
            <RenderHomeContent video={video} key={index + video.id.videoId} />
          ))}
        </div>
      }
    </section>
  );
};

export default ChannelHomeCrousel;
