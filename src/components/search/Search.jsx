import React, { useEffect } from "react";
import { calculateTimeAgo } from "../../helpers/calculateTimeAgo";
import { formatCount } from "../../helpers/formatCount";
import useApi from "../../hooks/useApi";

import { formatDuration } from "../../helpers/formatDuration";
import Channel from "./Channel";
import Video from "./Video";
import PlayList from "./PlayList";

const Search = ({ video }) => {
  const { fetchData: fetchVideoStats, data: videoStats } = useApi();
  const { fetchData: fetchChannelStats, data: channelStats } = useApi();

  // todo : try using a dummy cannel cover if not avaible using nullish operator
  // Destructure video data
  const thumbnail = video?.snippet?.thumbnails?.medium?.url || "";
  const channelName = video?.snippet?.channelTitle || "";
  const title = video?.snippet?.title || "";
  const channelId = video?.snippet?.channelId || "";
  const publishedAt = video?.snippet?.publishedAt || "";
  const timeAgo = publishedAt && calculateTimeAgo(publishedAt);
  // we will get either videoID or channelID or PlayListID from video.id
  const isVideo = video?.id?.videoId || "";
  const isChannel = video?.id?.channelId || "";
  const isPlayList = video?.id?.playlistId || "";

  // API call to get videoStats like : duration, viewCount, likeCount
  useEffect(() => {
    if (isVideo) {
      const url = "videos";
      const params = {
        part: "statistics,contentDetails",
        id: isVideo,
      };
      fetchVideoStats(url, params);
    }
  }, [isVideo]);

  // Destructure videoStats
  const rawDuration = videoStats?.items?.[0]?.contentDetails?.duration || "";
  const rawViewCount = videoStats?.items?.[0]?.statistics?.viewCount || "";

  // Formatting values
  const duration =
    rawDuration === "P0D" ? "Live" : rawDuration && formatDuration(rawDuration);
  const viewCount = rawViewCount && formatCount(rawViewCount);

  // -------------------------Video stats Ends here-------------------------

  // API call to get channelStats : customUrl, description, avatar, subsCount
  useEffect(() => {
    if (channelId) {
      const url = "channels";
      const params = {
        part: "snippet,statistics",
        id: channelId,
      };
      fetchChannelStats(url, params);
    }
  }, [channelId]);

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
