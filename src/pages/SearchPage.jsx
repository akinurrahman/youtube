import React, { useEffect } from "react";
import SearchResult from "../components/SearchResult";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import useApi from "../hooks/useApi";

const SearchPage = () => {
  const { query } = useParams();
  const { data: videos, fetchData } = useApi();

  useEffect(() => {
    const url = "search";
    const params = {
      part: "snippet",
      maxResults: 4,
      q: query,
    };
    fetchData(url, params);
  }, [query]);
  return (
    <div className="mt-2">
      {videos?.items?.map((video, index) => {
        return <SearchResult video={video} key={index} />;
      })}
    </div>
  );
};

export default SearchPage;
