import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../utils/useFetch";
import { RiMenuAddFill } from "react-icons/ri";
import { IoMdShareAlt, IoMdPlay } from "react-icons/io";

import { TiArrowShuffle } from "react-icons/ti";

const PlayListVideos = () => {
  const { playListId } = useParams();

  // API call to get  PlayList videos
  const { data: playListVideos } = useFetch("playlistItems", {
    part: "snippet",
    playlistId: playListId,
    maxResults: 8,
  });

  const cover = playListVideos?.items[0]?.snippet?.thumbnails?.medium?.url;
  const channelName = playListVideos?.items[0]?.snippet?.channelTitle;

  // API call to get
  const { data: playListInfo } = useFetch("playlists", {
    part: "snippet,contentDetails",
    id: playListId,
  });

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
    <div className="">
      <div className="flex flex-col bg-gray-700 p-4 text-white ">
        <img src={cover} alt="" className="rounded-xl" />
        <h2 className="my-4 text-3xl font-bold"> {playListTitle} </h2>
        <div className="flex items-center justify-between">
          <div className="column-1 space-y-1">
            <h2>{channelName}</h2>
            <p className="text-xs ">
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
          </div>
        </div>
        <div className="mx-1 mt-7 flex justify-between pb-3">
          <button className="flex items-center gap-2 rounded-full bg-white px-10 py-[6px] text-black">
            <IoMdPlay /> Play All
          </button>
          <button className="flex items-center gap-2 rounded-full bg-gray-500 px-10 py-[6px] font-medium text-white">
            <TiArrowShuffle size={20} /> Shuffle
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayListVideos;
