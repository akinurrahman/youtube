import React from "react";

const VideoPlayer = () => {
  return (
    <div>
      {/* Video Player */}
      <iframe
        className="md:[440px] h-[260px] w-full rounded-[31px] p-4 sm:h-[375px] lg:h-[397px]  xl:h-[500px] 2xl:h-[600px] "
        src="https://www.youtube.com/embed/klX1lKyEO9U?si=H-JY_dQH66BdKUFl"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      {/* Video Title */}
      <h2 className="line-clamp-2 px-4 font-bold text-gray-900 ">
        Yeh Ladka Hai Allah - Vishakha Mahore | Asha Bhosle & Mohammad Rafi |
        Yeh Ladka Hai Allah - Vishakha Mahore | Asha Bhosle & Mohammad Rafi |
      </h2>
      {/* channel info - like - share etc. */}
      <div>
        <div className="flex space-x-4 mt-3 items-center">
          <li></li>
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="channel logo"
              className="w-[35px]"
            />
          </div>
          <div>
            <h2 className="font-bold">Zee Music Company</h2>
            <p className="text-sm text-gray-800">102M subscribers</p>
          </div>
          <button className="rounded-full bg-black px-4 py-2 font-bold text-white">
            Subscribe
          </button>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default VideoPlayer;
