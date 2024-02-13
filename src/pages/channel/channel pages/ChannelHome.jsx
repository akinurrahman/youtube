import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { usePlaylistsQuery, useSearchQuery, useVideosQuery } from "../../../api/youtubeService";
import { calculateTimeAgo } from "../../../helpers/calculateTimeAgo";
import { formatDuration } from "../../../helpers/formatDuration";
import { formatCount } from "../../../helpers/formatCount";
import { FaPlay } from "react-icons/fa";
import { RiMenuUnfoldFill } from "react-icons/ri";
import ChannelLayout from "../../../components/channel/ChannelLayout";


const ChannelHome = () => {
  const { channelId } = useParams();

  // Fetch videos based on channel ID and video duration
  const { data: channelVideos } = useSearchQuery({
    part: "snippet",
    type: "video",
    videoDuration: "medium",
    channelId,
    maxResults: 30,
  });

  // Fetch detailed video information for each video
  const { data: videoInfo } = useVideosQuery({
    part: "statistics,contentDetails",
    id: channelVideos?.items?.map((video) => video.id.videoId).join(",") || "",
  });

  // Fetch playlists based on channel ID 
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
          className="flex flex-col"
          key={playlistId + index}
        >
          <div className="relative">
            <img
              src={thumbnail}
              alt="thumbnail"
              className="max-w-[159px] rounded-lg sm:max-w-[170px] md:max-w-[190px] lg:max-w-[210px] xl:max-w-[230px] 2xl:max-w-[250px]"
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
  
  const renderVideos = () => {
    return channelVideos?.items?.map((video, index) => {
      // Find additional video information
      const additionVideoInfo = videoInfo?.items?.find(
        (elem) => elem.id === video.id.videoId,
      );
      // Extract necessary video details
      const thumbnail = video?.snippet?.thumbnails?.medium?.url || "";
      const publishedAt = video?.snippet?.publishedAt || "";
      const timeAgo = publishedAt ? calculateTimeAgo(publishedAt) : "";
      const title = video?.snippet?.title || "";
      const videoID = video?.id?.videoId || "";
      // Extract duration and view count for each video
      const rawDuration = additionVideoInfo?.contentDetails?.duration || "";
      const rawView = additionVideoInfo?.statistics?.viewCount || "";
      const duration = rawDuration ? formatDuration(rawDuration) : "";
      const viewCount = rawView ? formatCount(rawView) : "";
      return (
        <NavLink
          to={`/watch/${videoID}`}
          className="flex flex-col "
          key={index + videoID}
        >
          {/* Display video thumbnail, duration, title, views, and time */}
          <div className="relative text-white">
            <img
              src={thumbnail}
              alt=""
              className=" max-w-[159px] rounded-lg sm:max-w-[170px] md:max-w-[190px] lg:max-w-[210px] xl:max-w-[230px] 2xl:max-w-[250px]"
            />
            <p className="absolute bottom-2 right-3 z-10 rounded-md bg-black bg-opacity-70 px-2">
              {duration}
            </p>
          </div>
          <div>
            <h2 className="line-clamp-3 font-semibold leading-tight sm:mt-1 sm:line-clamp-2">
              {title}
            </h2>
            <p className="line-clamp-1 text-sm font-extralight">
              {viewCount} views • {timeAgo}
            </p>
          </div>
        </NavLink>
      );
    });
  };
  return (
<ChannelLayout>
  {channelVideos?.items?.length > 0 && (
    <section>
      <div className="mb-2 ml-4 flex items-center gap-5 text-2xl font-semibold">
        <h1>Videos</h1>
        <span className="flex items-center gap-1 text-lg">
          <FaPlay size={16} /> Play All
        </span>
      </div>
      <div className="m-4 flex gap-2 overflow-x-auto sm:gap-3 md:gap-4">
        {renderVideos()}
      </div>
    </section>
  )}

  {playLists?.items?.length > 0 && (
    <section>
      <h1 className="mb-2 ml-4 flex items-center gap-5 text-2xl font-semibold">
        Created Playlists
      </h1>
      <div className="m-4 flex gap-2 overflow-x-auto sm:gap-3 md:gap-4">
        {renderPlaylists()}
      </div>
    </section>
  )}
</ChannelLayout>

  );
};

export default ChannelHome;
