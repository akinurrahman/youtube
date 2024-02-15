import React from "react";
import { calculateTimeAgo } from "../../helpers/calculateTimeAgo";
import { formatCount } from "../../helpers/formatCount";
import { formatDuration } from "../../helpers/formatDuration";
import Channel from "./Channel";
import Video from "./Video";
import PlayList from "./PlayList";
import { useQuery } from "@tanstack/react-query";
import { getYouTubeData } from "../../api/queries";

const Search = ({ item }) => {
  const { id, snippet } = item || {};

  // Extract necessary data from snippet object
  const thumbnail = snippet?.thumbnails?.medium?.url || "";
  const channelName = snippet?.channelTitle || "";
  const title = snippet?.title || "";
  const channelId = snippet?.channelId || "";
  const publishedAt = snippet?.publishedAt || "";
  const timeAgo = publishedAt && calculateTimeAgo(publishedAt);

  // Determine if the item is a video, channel, or playlist
  const isVideo = id?.videoId || "";
  const isChannel = id?.channelId || "";
  const isPlayList = id?.playlistId || "";

  // Fetch video statistics if it's a video
  const { data: videoStats } = useQuery({
    queryKey: ["video", isVideo],
    queryFn: () =>
      getYouTubeData({
        endpoint: "videos",
        queryParams: {
          part: "statistics,contentDetails",
          id: isVideo,
        },
      }),
    enabled: !!isVideo,
    staleTime: 1000 * 60 * 5,
  });

  // Extract relevant information from videoStats
  const { statistics: videoStatsStatistics, contentDetails } =
    videoStats?.items?.[0] || {};
  const rawDuration = contentDetails?.duration || "";
  const rawViewCount = videoStatsStatistics?.viewCount || "";

  // Format duration and view count
  const duration =
    rawDuration === "P0D" ? "Live" : rawDuration && formatDuration(rawDuration);
  const viewCount = rawViewCount && formatCount(rawViewCount);

  // Fetch channel statistics if it's a channel
  const { data: channelStats } = useQuery({
    queryKey: ["video", channelId],
    queryFn: () =>
      getYouTubeData({
        endpoint: "channels",
        queryParams: {
          part: "snippet,statistics",
          id: channelId,
        },
      }),
    enabled: !!channelId,
    staleTime: 1000 * 60 * 5,
  });

  // Extract relevant information from channelStats
  const { snippet: channelStatsSnippet, statistics } =
    channelStats?.items?.[0] || {};
  const customUrl = channelStatsSnippet?.customUrl || "";
  const description = channelStatsSnippet?.localized?.description || "";
  const avatar = channelStatsSnippet?.thumbnails?.default?.url || "";
  const subscriberCount = statistics?.subscriberCount || "";
  const subsCount = subscriberCount ? formatCount(subscriberCount) : "";

  // Combine all relevant information into 'info' object
  const info = {
    channelId,
    thumbnail,
    title,
    customUrl,
    subsCount,
    isVideo,
    duration,
    avatar,
    viewCount,
    timeAgo,
    description,
    channelName,
    isPlayList,
  };

  // Render corresponding component based on the type of item
  return (
    <div>
      {isChannel ? (
        <Channel info={info} />
      ) : isPlayList ? (
        <PlayList  info={info} />
      ) : (
        <Video info={info} />
      )}
    </div>
  );
};

export default Search;
