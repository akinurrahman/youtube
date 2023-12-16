import React, { useEffect, useState } from "react";
import Search from "../components/search/Search";
import { useParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import InfiniteScroll from "react-infinite-scroll-component";

const SearchPage = () => {
  const { query } = useParams();
  const { data: videos, fetchData, loading, error } = useApi();
  const [pageToken, setPageToken] = useState(null);
  const [allVideos, setAllVideos] = useState([]);

  useEffect(() => {
    setAllVideos([]);
    setPageToken(null);
    fetchDataFromApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const fetchDataFromApi = () => {
    const url = "search";
    const params = {
      part: "snippet",
      maxResults: 10,
      q: query,
      pageToken: pageToken,
    };
    fetchData(url, params);
  };

  useEffect(() => {
    if (!loading && videos) {
      // Check for duplicate video IDs before adding them
      const uniqueVideos = videos.items.filter((video) => {
        return !allVideos.some(
          (existingVideo) => existingVideo.id === video.id,
        );
      });

      setAllVideos((prevVideos) => [...prevVideos, ...uniqueVideos]);
      setPageToken(videos.nextPageToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, videos]);

  const loadMore = () => {
    if (!loading && pageToken) {
      fetchDataFromApi();
    }
  };

  return (
    <div className="mt-2">
      <InfiniteScroll
        dataLength={allVideos.length}
        next={loadMore}
        hasMore={!!pageToken}
        loader={<p>Loading more...</p>}
        endMessage={<p>No more videos</p>}
      >
        {allVideos.map((video, index) => (
          <Search video={video} key={index} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default SearchPage;
