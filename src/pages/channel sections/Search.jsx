import React from "react";
import useFetch from "../../hooks/useFetch";

const Search = () => {

  const { data: fetchedVideos, loading: fetchLoading } = useFetch(
    "videos",
    {
      part: "snippet,statistics,contentDetails",
      chart: "mostPopular",
      regionCode: "IN",
      maxResults: 20,
      pageToken: pageToken,
    }
  );
  return (
    <div>
     {
      fetchedVideos.items.map((item,index)=>{
        return (
          <div></div>
        )
      })
     }
    </div>
  );
};

export default Search;
