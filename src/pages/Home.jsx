import React, { useEffect, useState } from "react";
import HomeThumnailCard from "../components/home/HomeThumnailCard";
import { useVideosQuery } from "../api/youtubeService";
import { useChannelsQuery } from "../api/youtubeService";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const [channelInfoMap, setChannelInfoMap] = useState({});
  const [pageToken, setPageToken] = useState("");
  const [allVideos, setAllVideos] = useState([]);
  const [skipApi, setSkipApi] = useState(true);

  // Fetch home videos
  const {
    data: videos,
    isLoading: videosLoading,
    error: videosError,
  } = useVideosQuery({
    part: "snippet,statistics,contentDetails",
    chart: "mostPopular",
    regionCode: "IN",
    pageToken: pageToken,
  });

  // Updating allVideos state when new videos are fetched
  useEffect(() => {
    if (videos?.items) {
      setAllVideos((prevVideos) => [...prevVideos, ...videos.items]);
    }
  }, [videos]);

  // Extract channel IDs from fetched home videos
  const channelIds =
    videos?.items?.map((video) => video.snippet.channelId) || [];

    // Set skipApi to false if channelIds are available
    useEffect(() => {
      if (channelIds.length > 0) {
        setSkipApi(false);
      }
    }, [channelIds]);

  // fetch channel info for each video
  const {
    data: channelsData,
    isLoading: channelsLoading,
    error: channelsError,
  } = useChannelsQuery(
    {
      part: "snippet",
      id: channelIds.join(","),
    },
    { skip: skipApi },
  );

  useEffect(() => {
    if (channelsData) {
      const newChannelInfoMap = { ...channelInfoMap };
      channelsData?.items?.forEach((channel) => {
        newChannelInfoMap[channel.id] = channel;
      });
      setChannelInfoMap(newChannelInfoMap);
    }
  }, [channelsData]);

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

  // Function to fetch the next page of videos
  const fetchNextPage = () => {
    if (videos?.nextPageToken) {
      setPageToken(videos.nextPageToken);
    }
  };

  return (
    <InfiniteScroll
      dataLength={allVideos.length}
      next={fetchNextPage}
      hasMore={videos?.nextPageToken !== undefined}
      loader={<p>Loading...</p>}
      endMessage={<p>No more videos</p>}
      className="m-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {allVideos?.map((video, index) => (
        <HomeThumnailCard
          key={index}
          video={video}
          extraInfo={channelInfoMap[video.snippet.channelId]}
        />
      ))}
    </InfiniteScroll>
  );
};

export default Home;
