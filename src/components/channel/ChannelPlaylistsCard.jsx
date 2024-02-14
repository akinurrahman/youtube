import React from "react";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const ChannelPlaylistsCard = ({ playlist }) => {
  const navigate = useNavigate();
  const snippet = playlist?.snippet || {};
  const title = snippet?.title || "N/A";
  const thumbnail = snippet?.thumbnails.medium.url || "";
  const channelName = snippet?.channelTitle || "N/A";
  const playlistId = playlist?.id;
  const itemCount = playlist?.contentDetails?.itemCount || 0;
  return (
    <div onClick={() => navigate(`/playlist/${playlistId}`)}>
      <div className="img--area relative bg-gray-300">
        <img src={thumbnail} className="relative h-[185px] w-full rounded-lg" />
        <div className="absolute bottom-2 right-3 z-10 flex items-center gap-[6px] rounded-sm bg-black bg-opacity-70 px-2 text-white">
          <RiMenuUnfoldFill />
          <span className="pb-[2px]">{itemCount}</span>
        </div>
      </div>

      <div className="text--area">
        <h2 className="line-clamp-2 font-semibold leading-tight sm:mt-1">
          {title}
        </h2>
        <p className="line-clamp-1 text-sm font-light sm:hidden">
          {channelName} • Playlist
        </p>
        <p className="line-clamp-1 hidden text-sm font-light sm:block">
          View full Playlist
        </p>
      </div>
    </div>
  );
};

export default ChannelPlaylistsCard;
