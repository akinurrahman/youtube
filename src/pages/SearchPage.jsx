import React from "react";
import { useSearchQuery } from "../api/youtubeService";
import Search from "../components/search/Search";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { query } = useParams();
  const {
    data: searchResults,
    isLoading,
    error,
  } = useSearchQuery({
    part: "snippet",
    maxResults: 20,
    q: query,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      {searchResults?.items?.map((video, index) => (
        <Search video={video} key={index} />
      ))}
    </div>
  );
};

export default SearchPage;
