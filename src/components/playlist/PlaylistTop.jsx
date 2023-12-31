import React from "react";
import { RiMenuAddFill } from "react-icons/ri";
import { IoMdShareAlt, IoMdPlay } from "react-icons/io";
import { TfiDownload } from "react-icons/tfi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { TiArrowShuffle } from "react-icons/ti";

const PlaylistTop = ({ data }) => {
  const { cover, channelName, playListTitle, videoCount, timeAgo } = data;
  return (
    < >
      <img src={cover} alt="" className="rounded-xl" />

      <div className=" w-full">
        <h2 className="my-4 text-3xl font-bold"> {playListTitle} </h2>
        <div className="flex items-center justify-between">
          <div className="column-1 space-y-1">
            <h2>{channelName}</h2>
            <p className="line-clamp-1 text-xs">
              {videoCount} Videos • Last updated on {timeAgo}
            </p>
          </div>

          {/* menu and share */}
          <div className="column-2 flex ">
            <div className="rounded-full bg-gray-500 p-3">
              <RiMenuAddFill />
            </div>
            <div className="ml-3 rounded-full bg-gray-500 p-3">
              <IoMdShareAlt />
            </div>
            {/* download - show only sm and upper */}
            <div className="ml-3 rounded-full bg-gray-500 p-3  ">
              <TfiDownload />
            </div>
            {/* 3 dot : show only lg and upper */}
            <div className="ml-3 hidden rounded-full bg-gray-500 p-3 md:block">
              <BiDotsVerticalRounded />
            </div>
          </div>
        </div>
        <div className="mx-1 mt-7 flex justify-between gap-2 pb-3">
          <button className="flex w-1/2 items-center justify-center gap-2 rounded-full bg-white py-2 font-medium text-black">
            <IoMdPlay /> Play All
          </button>
          <button className="flex w-1/2 items-center justify-center gap-2 rounded-full bg-gray-500 py-2 font-medium text-white">
            <TiArrowShuffle size={20} /> Shuffle
          </button>
        </div>
      </div>
    </>
  );
};

export default PlaylistTop;
