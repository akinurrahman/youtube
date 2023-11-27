import React from "react";
import { BiLike, BiDislike } from "react-icons/bi";
import { TbShare3 } from "react-icons/tb";
import { HiDownload } from "react-icons/hi";
import { HiOutlineScissors } from "react-icons/hi2";
import { CiSaveDown1 } from "react-icons/ci";

const FirstColumn = () => {
  return (
    <div>
      {/* Video Player */}
      <iframe
        className="md:[440px] h-[260px] w-full rounded-[31px] p-4 outline-none sm:h-[375px] lg:h-[397px]  xl:h-[500px] 2xl:h-[600px] "
        src="https://www.youtube.com/embed/klX1lKyEO9U"
        title="YouTube video player"
        frameborder="0"
        // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;  web-share"
        allowFullScreen  
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

        {/* Like - share - download etc. container */}
        <div className="ml-2 mt-4 flex items-center space-x-1">
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
          <button className="flex  items-center space-x-2 rounded-full bg-gray-100 px-3  py-2 hover:bg-gray-200">
            <TbShare3 size={20} /> <span className="">Share</span>
          </button>

          {/* Download */}
          <button className="flex  items-center  space-x-2 rounded-full bg-gray-100 px-3  py-2  hover:bg-gray-200">
            <HiDownload size={20} /> <span>Download</span>
          </button>

          {/* clip */}
          <button className="hidden cursor-pointer items-center space-x-2 rounded-full bg-gray-100 px-3 py-2 hover:bg-gray-200 sm:flex md:hidden  ">
            <HiOutlineScissors size={20} /> <span>Clip</span>
          </button>

          {/* watch later */}
          <button className="hidden cursor-pointer items-center space-x-2 rounded-full bg-gray-100 px-3 py-2 hover:bg-gray-200 sm:flex md:hidden  2xl:flex">
            <CiSaveDown1 size={20} /> <span>Save</span>
          </button>

          {/* others */}
          <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
            <span>•••</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FirstColumn;
