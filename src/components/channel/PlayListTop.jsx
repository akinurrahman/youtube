import React from "react";
import { NavLink, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { RiMenuAddFill } from "react-icons/ri";
import { IoMdShareAlt, IoMdPlay } from "react-icons/io";
import { TfiDownload } from "react-icons/tfi";
import { TiArrowShuffle } from "react-icons/ti";
import { BiDotsVerticalRounded } from "react-icons/bi";

import PlayListBottom from "./PlayListBottom";

const PlayListTop = () => {
  const { playListId } = useParams();
  // API call to get  PlayList videos
  const { data: playListVideos } = useFetch("playlistItems", {
    part: "snippet",
    playlistId: playListId,
    maxResults: 18,
  });

  const cover = playListVideos?.items[0]?.snippet?.thumbnails?.medium?.url;
  const channelName = playListVideos?.items[0]?.snippet?.channelTitle;

  // API call to get PlayList info like playlist title, video count and publish at
  const { data: playListInfo } = useFetch("playlists", {
    part: "snippet,contentDetails",
    id: playListId,
  });

  const channelID =
    playListInfo?.items[0] && playListInfo?.items[0]?.snippet?.channelId;
  const playListTitle = playListInfo?.items[0]?.snippet?.title;
  const itemCount = playListInfo?.items[0]?.contentDetails?.itemCount;

  const publishedAt =
    playListInfo?.items && playListInfo?.items[0]?.snippet?.publishedAt;
  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="mt-4 lg:flex ">
      <div className="flex flex-col lg:max-w-[40%] xl:max-w-[30%] bg-gray-700 p-4 text-white sm:flex-row sm:gap-3 lg:flex-col lg:rounded-xl">
        <img src={cover} alt="" className="rounded-xl" />

        <div className=" w-full">
          <h2 className="my-4 text-3xl font-bold"> {playListTitle} </h2>
          <div className="flex items-center justify-between">
            <div className="column-1 space-y-1">
              <h2>{channelName}</h2>
              <p className="line-clamp-1 text-xs">
                {itemCount} Videos • Last updated on {formattedDate}
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
      </div>

      {/* PlayList Videos Starts here */}
      <div className="  ml-3 mt-3  grid gap-3 lg:mt-0">
        {playListVideos?.items?.map((video, index) => {
          return (
            <PlayListBottom key={index} video={video} channelID={channelID} />
          );
        })}
      </div>
    </div>
  );
};

export default PlayListTop;
