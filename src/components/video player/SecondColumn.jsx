import React, { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { useSelector } from "react-redux";
import RecommenedVideoCard from "./RecommenedVideoCard";
import InfiniteScroll from "react-infinite-scroll-component";

const SecondColumn = () => {
  const { title } = useSelector((state) => state.video.videoDetails);
  const [pageToken, setPageToken] = useState(null);
  const [allVideos, setAllVideos] = useState([]);
  const { data: videos, fetchData, loading } = useApi();

  useEffect(() => {
    setPageToken(null);
    setAllVideos([]);
    fetchDataFromApi();
  }, [title]);

  const fetchDataFromApi = () => {
    const url = "search";
    const params = {
      part: "snippet",
      maxResults: 8,
      q: title,
      type: "video",
      videoDuration: "medium",
    };
    fetchData(url, params);
  };
  

  useEffect(() => {
    if (!loading && videos) {
      const newVideos = videos.items;

      // extracting  videoId's from all videos into a set
      const existingVideoIds = new Set(allVideos.map((video) => video.id));

      // Filtering out videos that are not already present in all videos
      const uniqueVideos = newVideos.filter(
        (video) => !existingVideoIds.has(video.id),
      );
      setAllVideos((prevVideos) => [...prevVideos, ...uniqueVideos]);
      setPageToken(videos.nextPageToken);
    }
  }, [loading, videos]);

  const loadMore = () => {
    if (!loading && pageToken) {
      fetchDataFromApi();
    }
  };

  return (
    <InfiniteScroll
      dataLength={allVideos.length}
      next={loadMore}
      hasMore={!!pageToken}
      loader={<div className="mb-40">loading</div>}
      endMessage={<p className="mb-40">No more videos available</p>}
    >
      {allVideos.map((video, index) => (
        <RecommenedVideoCard video={video} key={index} />
      ))}
    </InfiniteScroll>
  );
};

export default SecondColumn;
