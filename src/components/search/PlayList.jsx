import React from "react";
import { useNavigate } from "react-router-dom";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { getYouTubeData } from "../../api/queries";

const PlayList = ({ info }) => {
  // Initialize navigate function from React Router
  const navigate = useNavigate();

  // Fetch playlist data using React Query
  const { data } = useQuery({
    queryKey: ["playlist", info.isPlayList],
    queryFn: () =>
      getYouTubeData({
        endpoint: "playlists",
        queryParams: {
          part: "snippet,contentDetails",
          id: info.isPlayList,
        },
      }),
    staleTime: 1000 * 60 * 5,
    enabled: !!info.isPlayList,
  });

  // Extract playlist details
  const { snippet, contentDetails } = data?.items?.[0] || {};
  const playlistCount = contentDetails?.itemCount || "N/A";
  const description = snippet?.localized?.description || "N/A";

  // Function to navigate to channel page, stopping event propagation
  const navigateToChannel = (e) => {
    e.stopPropagation();
    navigate(`/channel/${info.channelId}`);
  };

  // Function to navigate to playlist page
  const navigateToPlaylist = () => {
    navigate(`/playlist/${info.isPlayList}`);
  };

  return (
    <div onClick={navigateToPlaylist}>
      <div className="mt-4 gap-4 sm:flex md:mx-5 lg:mx-[187px]">
        {/* Column 1: Thumbnail and Playlist count */}
        <div className="img-container relative text-white">
          <img
            src={info.thumbnail}
            alt=""
            className="w-full sm:min-w-[320px] sm:rounded-xl"
          />
          <div className="absolute bottom-2 right-3 z-10 flex items-center gap-[6px] rounded-sm bg-black bg-opacity-70 px-2 text-white">
            <RiMenuUnfoldFill />
            <span className="pb-[2px]">{playlistCount}</span>
          </div>
        </div>
        {/* Column 2: Channel details */}
        <div className="mx-2 mt-2 flex items-center sm:hidden">
          <div onClick={(e) => navigateToChannel(e)}>
            <img
              src={info.avatar}
              alt=""
              className="mr-3 max-w-[40px] cursor-pointer rounded-full"
            />
          </div>
          <div>
            <div className="line-clamp-2 font-semibold leading-none">
              {info.title}
            </div>
          </div>
        </div>
        {/* Show this for Column 2 when size is small */}
        <div className="mt-1 hidden flex-col sm:flex">
          <h2 className="mb-1 line-clamp-2 font-semibold">{info.title}</h2>
          <p
            className="mb-2 line-clamp-1 flex items-center text-gray-700"
            onClick={(e) => navigateToChannel(e)}
          >
            {info.channelName} • PlayList
          </p>
          <p className="line-clamp-2 text-gray-600">{description}</p>
          <p className="mt-2 line-clamp-2 font-semibold text-gray-600 hover:text-gray-800">
            VIEW FULL PLAYLIST
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayList;
