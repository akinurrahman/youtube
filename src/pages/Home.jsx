import React, { useEffect, useState } from "react";
import ThumnailCard from "../components/ThumnailCard";
import HomeSkeleton from "../components/skeletons/HomeSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import useApi from "../hooks/useApi";

const HomePage = () => {
  const { data: videos, loading, fetchData } = useApi();
  const [pageToken, setPageToken] = useState(null);
  const [allVideos, setAllVideos] = useState([]);
  useEffect(() => {
    setPageToken(null);
    setAllVideos([]);
    fetchDataFromApi();
  }, []);

  const fetchDataFromApi = () => {
    const url = "videos";
    const params = {
      part: "snippet,statistics,contentDetails",
      chart: "mostPopular",
      regionCode: "IN",
      maxResults: 20,
      pageToken: pageToken,
    };
    fetchData(url, params);
  };

  useEffect(() => {
    if (!loading && videos) {
      const uniqueVideo = videos.items.filter((video) => {
        return !allVideos.some(
          (existingVideo) => existingVideo.id === video.id,
        );
      });
      setAllVideos((prevVideos) => [...prevVideos, ...uniqueVideo]);
      setPageToken(videos.nextPageToken);
    }
  }, [loading, videos]);
  const loadMore = () => {
    if (!loading && pageToken) {
      fetchDataFromApi();
    }
  };
  return (
    // InfiniteScroll component for handling infinite scrolling
    <InfiniteScroll
      dataLength={allVideos.length}
      next={loadMore}
      hasMore={!!pageToken}
      loader={
        <div className="m-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <HomeSkeleton key={index} />
          ))}
        </div>
      }
      endMessage={<p>No more videos</p>}
    >
      <div className="m-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {allVideos.map((video, index) => (
          <ThumnailCard video={video} key={index} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default HomePage;
