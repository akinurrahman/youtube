import React, { useEffect, useState } from "react";
import ThumnailCard from "../components/ThumnailCard";
import HomeSkeleton from "../components/skeletons/HomeSkeleton";
import useFetch from "../utils/useFetch";
import InfiniteScroll from "react-infinite-scroll-component";

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [pageToken, setPageToken] = useState("");

  // Fetching home videos using custom hook useFetch
  const { data: fetchedVideos, loading: fetchLoading } = useFetch(
    "videos",
    {
      part: "snippet,statistics,contentDetails",
      chart: "mostPopular",
      regionCode: "IN",
      maxResults: 20,
      pageToken: pageToken,
    },
    [pageToken],
  );

  // Effect to update videos, loading, and hasMore when fetchedVideos changes
  useEffect(() => {
    setLoading(fetchLoading);
    if (fetchedVideos && fetchedVideos.items) {
      setVideos((prevVideos) => {
        // Extract video IDs from the existing videos
        const existingVideoIds = new Set(prevVideos.map((video) => video.id));

        // Filter out duplicate videos by checking against existing IDs
        const newUniqueVideos = fetchedVideos.items.filter(
          (newVideo) => !existingVideoIds.has(newVideo.id),
        );

        // Combine previous videos with the new unique videos
        return [...prevVideos, ...newUniqueVideos];
      });

      setHasMore(!!fetchedVideos?.nextPageToken);
    }
  }, [fetchLoading, fetchedVideos]);

  // Function to load more videos when scrolling
  const loadMore = () => {
    if (!loading && hasMore) {
      setPageToken(fetchedVideos.nextPageToken);
    }
  };

  return (
    // InfiniteScroll component for handling infinite scrolling
    <InfiniteScroll
      dataLength={videos.length}
      next={loadMore}
      hasMore={hasMore}
      loader={
        <div className="m-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <HomeSkeleton key={index} />
          ))}
        </div>
      }
    >
      <div className="m-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {videos.map((video, index) => (
          <ThumnailCard video={video} key={index} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default HomePage;
