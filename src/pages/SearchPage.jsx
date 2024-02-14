// import React from "react";
// import { useSearchQuery } from "../api/youtubeService";
// import Search from "../components/search/Search";
// import { useParams } from "react-router-dom";

// const SearchPage = () => {
//   const { query } = useParams();
//   const {
//     data: searchResults,
//     isLoading,
//     error,
//   } = useSearchQuery({
//     part: "snippet",
//     maxResults: 20,
//     q: query,
//   });

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }
//   return (
//     <div>
//       {searchResults?.items?.map((video, index) => (
//         <Search video={video} key={index} />
//       ))}
//     </div>
//   );
// };

// export default SearchPage;

import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { getYouTubeData } from "../api/queries";
import Search from "../components/search/Search";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../components/skeletons/Spinner";

const SearchPage = () => {
  const { query } = useParams();

  const { data, isLoading, error, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["search", query],
      queryFn: ({ pageParam }) =>
        getYouTubeData({
          endpoint: "search",
          queryParams: {
            part: "snippet",
            maxResults: 20,
            q: query,
            pageToken: pageParam,
          },
        }),
      getNextPageParam: (lastPage) => lastPage.nextPageToken, 
      staleTime: 1000 * 60 * 5, // 5min Stale time
    });
  // Flattening the data pages to get an array of videos
  const searchResults = data?.pages.flatMap((page) => page.items) || [];
  return (
    <div>
      {searchResults.length > 0 && !error && (
        <InfiniteScroll
          dataLength={searchResults?.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<Spinner />}
        >
          {searchResults.map((item, index) => (
            <Search item={item} key={index} />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default SearchPage;
