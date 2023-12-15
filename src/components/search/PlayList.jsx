import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { RiMenuUnfoldFill } from "react-icons/ri";
import useApi from "../../hooks/useApi";

const PlayList = ({
  isPlayList,
  thumbnail,
  channelId,
  avatar,
  title,
  channelName,
}) => {
  const { fetchData: fetchPlayListStats, data: playlistStats } = useApi();

  useEffect(() => {
    if (isPlayList) {
      const url = "playlists";
      const params = {
        part: "snippet,contentDetails",
        id: isPlayList,
      };
      fetchPlayListStats(url, params);
    }
  }, [isPlayList]);

  const playlistCount =
    playlistStats?.items?.[0]?.contentDetails?.itemCount || "N/A";
  const description =
    playlistStats?.items?.[0]?.snippet?.localized?.description || "N/A";
  return (
    <NavLink to={`/playlist/${isPlayList}`}>
      <div className="mt-4 gap-4 sm:flex md:mx-5 lg:mx-[187px]">
        {/* col - 1  */}
        <div className=" img-container relative text-white ">
          <img
            src={thumbnail}
            alt=""
            className=" w-full sm:min-w-[320px] sm:rounded-xl "
          />
          <div className="absolute bottom-2 right-3 z-10 flex items-center gap-[6px] rounded-sm bg-black bg-opacity-70 px-2 text-white">
            <RiMenuUnfoldFill />
            <span className="pb-[2px]">{playlistCount}</span>
          </div>
        </div>
        {/* col-2 */}
        <div className="mx-2 mt-2 flex items-center sm:hidden">
          <NavLink to={`/channel/${channelId}`}>
            <img
              src={avatar}
              alt=""
              className="mr-3 max-w-[40px] rounded-full "
            />
          </NavLink>
          <div>
            <div className="line-clamp-2 font-semibold leading-none">
              {title}
            </div>
          </div>
        </div>
        {/* show this for column 2 when size is small */}
        <div className="mt-1 hidden flex-col sm:flex ">
          <h2 className="mb-1 line-clamp-2 font-semibold ">{title}</h2>

          <p className="mb-2 line-clamp-1  flex items-center text-gray-700">
            {channelName} • PlayList
          </p>
          <p className="line-clamp-2 text-gray-600 ">{description}</p>
          <p className="mt-2 line-clamp-2 font-semibold text-gray-600  hover:text-gray-800">
            VIEW FULL PLAYLIST
          </p>
        </div>
      </div>
    </NavLink>
  );
};

export default PlayList;
