import React from "react";
import { BiLike, BiDislike } from "react-icons/bi";
import { TbShare3 } from "react-icons/tb";
import { HiDownload } from "react-icons/hi";
import { HiOutlineScissors } from "react-icons/hi2";
import { CiSaveDown1 } from "react-icons/ci";

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
      <div className="flex flex-col md:mr-2 md:flex md:flex-row md:justify-between">
        <div className="mt-3 flex items-center space-x-4">
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

        {/* Like - share - download etc. */}
        <div className="ml-2 mt-4 flex items-center space-x-1   ">
          {/* Like/Dislike */}
          <div className="flex items-center  ">
            <button className="flex items-center  space-x-2 rounded-l-full bg-gray-100 py-2 pl-5 pr-3 hover:bg-gray-200">
              <BiLike size={20} />
              <span className="text-sm">400</span>
            </button>
            <button className=" rounded-r-full border-l-2 border-gray-200 bg-gray-100  py-2 pl-3 pr-5 hover:bg-gray-200">
              <BiDislike size={20} />
            </button>
          </div>
          {/* Share */}
          <div className="flex items-center space-x-2 rounded-full bg-gray-100 px-3  py-2 hover:bg-gray-200">
            <TbShare3 size={20} /> <span className="">Share</span>
          </div>
          {/* Download */}
          <div className="flex items-center space-x-2   rounded-full bg-gray-100 px-3  py-2  hover:bg-gray-200">
            <HiDownload size={20} /> <span>Download</span>
          </div>
          {/* clip */}
          <div className="hidden items-center space-x-2 rounded-full bg-gray-100 px-3 py-2 hover:bg-gray-200 sm:flex md:hidden  ">
            <HiOutlineScissors size={20} /> <span>Clip</span>
          </div>
          {/* watch later */}
          <div className="hidden items-center 2xl:flex space-x-2 rounded-full bg-gray-100 px-3 py-2 hover:bg-gray-200 sm:flex  md:hidden">
            <CiSaveDown1 size={20} /> <span>Save</span>
          </div>

          {/* others */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
            <span>•••</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
