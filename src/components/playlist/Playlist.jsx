import React from "react";
import PlaylistTop from "./PlaylistTop";
import { useParams } from "react-router-dom";
import {
  usePlaylistItemsQuery,
  usePlaylistsQuery,
  useVideosQuery,
} from "../../api/youtubeService";
import PlayListVideos from "./PlayListVideos";

const Playlist = () => {
  const { playListId } = useParams();

  //   API Call to get playlist info's like channel title, total video count, last updated on,
  const { data: playListInfo } = usePlaylistsQuery({
    part: "snippet,contentDetails",
    id: playListId,
  });

  const playListTitle = playListInfo?.items[0]?.snippet?.title || "";
  const videoCount = playListInfo?.items[0]?.contentDetails?.itemCount || 0;
  const publishedAt = playListInfo?.items?.[0]?.snippet?.publishedAt || "";
  const timeAgo = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  //   API Call to get playlist videos
  const { data: playListVideos } = usePlaylistItemsQuery({
    part: "snippet",
    playlistId: playListId,
    maxResults: 18,
  });

  const cover = playListVideos?.items?.[0]?.snippet?.thumbnails?.medium?.url;
  const channelName = playListVideos?.items?.[0]?.snippet?.channelTitle;

  //   API Call to get additional video details
  const videoIds =
    playListVideos?.items?.map(
      (currElem) => currElem?.snippet?.resourceId?.videoId,
    ) || [];
  const { data: videoInfo } = useVideosQuery({
    part: "statistics,contentDetails",
    id: videoIds.join(","),
  });
  const data = {
    cover,
    channelName,
    playListTitle,
    videoCount,
    timeAgo,
  };

  return (
    <section className="mt-4 lg:flex">
      <section className="flex flex-col bg-gray-700 p-4 text-white sm:flex-row sm:gap-3 lg:max-w-[40%] lg:flex-col lg:rounded-xl xl:max-w-[30%]">
        <PlaylistTop data={data} />
      </section>
      <section className="ml-3 mt-3  grid gap-3 lg:mt-0">
        {playListVideos?.items?.map((video, index) => {
          return (
            <PlayListVideos
              key={index + video.id}
              video={video}
              videoInfo={videoInfo?.items?.find(
                (currElem) => currElem.id === video?.snippet?.resourceId?.videoId,
              )}
            />
          );
        })}
      </section>
    </section>
  );
};

export default Playlist;
