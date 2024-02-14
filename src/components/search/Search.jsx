import React, { useEffect } from "react";
import { calculateTimeAgo } from "../../helpers/calculateTimeAgo";
import { formatCount } from "../../helpers/formatCount";
import useApi from "../../hooks/useApi";

import { formatDuration } from "../../helpers/formatDuration";
import Channel from "./Channel";
import Video from "./Video";
import PlayList from "./PlayList";
import { useChannelsQuery, useVideosQuery } from "../../api/youtubeService";

const Search = ({ item }) => {
  // todo : try using a dummy cannel cover if not avaible using nullish operator
  // Destructure video data
  const thumbnail = item?.snippet?.thumbnails?.medium?.url || "";
  const channelName = item?.snippet?.channelTitle || "";
  const title = item?.snippet?.title || "";
  const channelId = item?.snippet?.channelId || "";
  const publishedAt = item?.snippet?.publishedAt || "";
  const timeAgo = publishedAt && calculateTimeAgo(publishedAt);
  // we will get either itemID or channelID or PlayListID from video.id
  const isVideo = item?.id?.videoId || "";
  const isChannel = item?.id?.channelId || "";
  const isPlayList = item?.id?.playlistId || "";

  const { data: videoStats } = useVideosQuery({
    part: "statistics,contentDetails",
    id: isVideo,
  });

  // Destructure videoStats
  const rawDuration = videoStats?.items?.[0]?.contentDetails?.duration || "";
  const rawViewCount = videoStats?.items?.[0]?.statistics?.viewCount || "";

  // Formatting values
  const duration =
    rawDuration === "P0D" ? "Live" : rawDuration && formatDuration(rawDuration);
  const viewCount = rawViewCount && formatCount(rawViewCount);

  // -------------------------Video stats Ends here-------------------------

  const { data: channelStats } = useChannelsQuery({
    part: "snippet,statistics",
    id: channelId,
  });

  // Destructure channelStats
  const customUrl = channelStats?.items?.[0]?.snippet?.customUrl || "";
  const description =
    channelStats?.items?.[0]?.snippet?.localized?.description || "";
  const avatar =
    channelStats?.items?.[0]?.snippet?.thumbnails?.default?.url || "";
  const subscriberCount =
    channelStats?.items?.[0]?.statistics?.subscriberCount || "";
  const subsCount = subscriberCount ? formatCount(subscriberCount) : "";
  // ---------------------------Channel Stats Ends Here-------------------------------------

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
  return (
    <div>
      {isChannel ? (
        <Channel {...info} />
      ) : isPlayList ? (
        <PlayList {...info} />
      ) : (
        <Video {...info} />
      )}
    </div>
  );
};

export default Search;
