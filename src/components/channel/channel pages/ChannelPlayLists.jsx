import React from "react";
import ChannelLayout from "../ChannelLayout";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { usePlaylistsQuery } from "../../../api/youtubeService";
import { NavLink, useParams } from "react-router-dom";

const ChannelPlayLists = () => {
  const { channelId } = useParams();

  const { data: playLists } = usePlaylistsQuery({
    part: "snippet,contentDetails",
    channelId: channelId,
    maxResults: 30,
  });

  const renderPlaylists = () => {
    return playLists?.items?.map((playlist, index) => {
      // Extract playlist details
      const snippet = playlist?.snippet;
      const title = snippet?.title || "N/A";
      const thumbnail = snippet?.thumbnails?.medium?.url || "N/A";
      const channelName = snippet?.channelTitle || "N/A";
      const playlistId = playlist?.id;
      const itemCount = playlist?.contentDetails?.itemCount || 0;

      return (
        <NavLink
          to={`/playlist/${playlistId}`}
          className="flex sm:flex-col"
          key={playlistId + index}
        >
          <div className="relative">
            <img
              src={thumbnail}
              alt="thumbnail"
              className="mr-2 max-w-[155px] rounded-lg sm:w-full sm:max-w-full"
            />
            {/* Display item count if it's greater than 0 */}
            {itemCount > 0 && (
              <div className="absolute bottom-2 right-3 z-10 flex items-center gap-[6px] rounded-sm bg-black bg-opacity-70 px-2 text-white">
                <RiMenuUnfoldFill />
                <span className="pb-[2px]">{itemCount}</span>
              </div>
            )}
          </div>
          {/* Playlist details */}
          <div>
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
        </NavLink>
      );
    });
  };

  const noPlaylistsAvailable = () => {
    return (
      <div className=" relative flex w-screen flex-col items-center justify-center">
        <img src="/assets/video not found.webp" alt="" className="w-[20rem] " />
        <h2 className="absolute bottom-9 font-semibold sm:text-lg lg:text-2xl">
          This channel has no Playlists
        </h2>
      </div>
    );
  };

  return (
    <ChannelLayout>
      <div className="m-4 grid gap-4 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {playLists?.items?.length > 0
          ? renderPlaylists()
          : noPlaylistsAvailable()}
      </div>
    </ChannelLayout>
  );
};

export default ChannelPlayLists;
