import React from "react";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Img from "../lazy load/Img";

const PlayListCard = ({ playlist }) => {
  const navigate = useNavigate();

  // Destructure necessary data from the playlist object
  const { snippet, id, contentDetails } = playlist || {};
  const title = snippet?.title || "N/A";
  const thumbnail = snippet?.thumbnails?.medium?.url || "";
  const channelTitle = snippet?.channelTitle || "N/A";
  const itemCount = contentDetails?.itemCount || 0;

  // Navigate to the playlist page when clicked
  const handleNavigation = () => {
    navigate(`/playlist/${id}`);
  };

  return (
    <div onClick={handleNavigation}>
      <div className="image-container  rounded-lg bg-gray-300">
        <Img src={thumbnail} className=" rounded-lg" />
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
          {channelTitle} • Playlist
        </p>
        <p className="line-clamp-1 hidden text-sm font-light sm:block">
          View full Playlist
        </p>
      </div>
    </div>
  );
};

export default PlayListCard;
