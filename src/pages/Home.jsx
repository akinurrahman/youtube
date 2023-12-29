import React from "react";
import HomeThumnailCard from "../components/home/HomeThumnailCard";
import { useVideosQuery } from "../api/youtubeService";
import { useChannelsQuery } from "../api/youtubeService";

const Home = () => {
  // Fetch home videos
  const {
    data: homeVideos,
    isLoading: videosLoading,
    error: videosError,
  } = useVideosQuery({
    part: "snippet,statistics,contentDetails",
    chart: "mostPopular",
    regionCode: "IN",
    maxResults: 20,
  });

  // Extract channel IDs from fetched home videos
  const channelIds =
    homeVideos?.items?.map((video) => video.snippet.channelId) || [];

  // fetch channel info for each video
  const {
    data: channelsData,
    isLoading: channelsLoading,
    error: channelsError,
  } = useChannelsQuery({
    part: "snippet",
    id: channelIds.join(","), // Pass comma-separated channel IDs
  });
  // Show loading state while fetching data
  if (videosLoading || channelsLoading) {
    return <div>Loading...</div>;
  }

  // Show error message if there's an issue with data fetching
  if (videosError || channelsError) {
    return (
      <div>
        <p>Error loading data...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="m-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {homeVideos?.items?.map((video, index) => (
          <HomeThumnailCard
            key={index}
            video={video}
            channel={channelsData?.items?.find(
              (channel) => channel.id === video.snippet.channelId,
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
