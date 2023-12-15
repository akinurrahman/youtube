import React, { useEffect } from "react";
import Search from "../components/search/Search";
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
        return <Search video={video} key={index} />;
      })}
    </div>
  );
};

export default SearchPage;
