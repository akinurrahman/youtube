import React from "react";
import SearchResult from "../components/SearchResult";
import useFetch from "../utils/useFetch";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { query } = useParams();
  const { data: videos, loading } = useFetch(
    "search",
    {
      part: "snippet",
      maxResults: 3,
      q: query,
      type: "video",
      videoDuration: "medium",
    },
    [query],
  );
  return (
    <div className="mt-2">
      {videos?.items?.map((video, index) => {
        return <SearchResult video={video} key={index} />;
      })}
    </div>
  );
};

export default SearchPage;
