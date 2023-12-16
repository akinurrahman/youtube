import React, { useEffect, useState } from "react";
import ThumbnailCard from "./components/ThumnailCard";
import useApi from "./hooks/useApi";
import InfiniteScroll from "react-infinite-scroll-component";
import HomeSkeleton from "./components/skeletons/HomeSkeleton";

const Testing = () => {
  const { fetchData, data: fetchedVideos, loading: fetchedLoading } = useApi();
  const [pageToken, setPageToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
   
  }, [pageToken]);

  useEffect(() => {
    setLoading(fetchedLoading);
    if (fetchedVideos && fetchedVideos.items) {
      setVideos((prevVideos)=>{
         // Extract video IDs from the existing videos
         const existingVideoIds = new Set(prevVideos.map((video) => video.id));

         // Filter out duplicate videos by checking against existing IDs
        const newUniqueVideos = fetchedVideos.items.filter(
          (newVideo) => !existingVideoIds.has(newVideo.id),
        );

         // Combine previous videos with the new unique videos
         return [...prevVideos, ...newUniqueVideos];
      })

      setHasMore(!!fetchedVideos?.nextPageToken);

    }
  }, [fetchedLoading, fetchedVideos]);

    // Function to load more videos when scrolling
    const loadMore = () => {
      if (!loading && hasMore) {
        setPageToken(fetchedVideos.nextPageToken);
      }
    };
  return (
    <InfiniteScroll
    dataLength={videos.length}
    next={loadMore}
    hasMore={hasMore}
    loader={
      <div className="m-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <HomeSkeleton key={index} />
        ))}
      </div>
    }
  >
    <div className="m-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {videos?.map((video, index) => (
        <ThumbnailCard video={video} key={index} />
      ))}
    </div>
  </InfiniteScroll>
  );
};

export default Testing;
