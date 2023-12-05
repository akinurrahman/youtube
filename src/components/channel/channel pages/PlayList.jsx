import React from "react";
import { RiMenuUnfoldFill } from "react-icons/ri";

const PlayList = ({ playList }) => {
  const snippet = playList?.snippet;
  const playListTitle = snippet && snippet?.title;
  const thumbnail = snippet && snippet?.thumbnails?.medium?.url;
  const channelName = snippet && snippet?.channelTitle;

  const itemCount = playList?.contentDetails?.itemCount;

  return (
    <div className="flex sm:flex-col">
      <div className="relative">
        <img
          src={thumbnail}
          alt="thumnail"
          className="mr-2 max-w-[155px] rounded-lg sm:w-full sm:max-w-full "
        />
        <div className="absolute bottom-2 right-3 z-10 flex items-center gap-[6px] rounded-sm bg-black bg-opacity-70 px-2 text-white">
          <RiMenuUnfoldFill className=" " />{" "}
          <span className="pb-[2px]">{itemCount}</span>
        </div>
      </div>
      <div>
        <h2 className=" line-clamp-2 font-semibold leading-tight sm:mt-1">
          {playListTitle}
        </h2>
        <p className="line-clamp-1 text-sm font-light sm:hidden">
          {channelName} • PlayList
        </p>
        <p className="line-clamp-1 hidden text-sm font-light sm:block">
          View full PlayList
        </p>
      </div>
    </div>
  );
};

export default PlayList;
