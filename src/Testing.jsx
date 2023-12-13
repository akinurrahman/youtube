import React, { useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";
import InfiniteScroll from "react-infinite-scroll-component";

const Testing = () => {
  const [comments, setComments] = useState([]);
  const [pageToken, setPageToken] = useState("");
  const { data: fetchedComment, loading: fetchedLoading } = useFetch(
    "commentThreads",
    {
      part: "snippet",
      videoId: "tnTPaLOaHz8",
      maxResults: 20,
      pageToken: pageToken,
    },
    [pageToken],
  );

  useEffect(() => {
    if (fetchedComment && fetchedComment.items) {
      setComments((prev) => [...prev, ...fetchedComment?.items]);
    }
  }, [fetchedComment]);

  const fetchMoreData = () => {
    if (fetchedComment && fetchedComment.nextPageToken) {
      setPageToken(!!fetchedComment?.nextPageToken);
    }
  };

  return (
    <div>
      <div className="h-[500px] bg-green-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
        dignissimos amet ab alias, est reprehenderit repellendus perspiciatis
        sapiente nesciunt corrupti voluptatem molestiae illo, molestias
        voluptates. Voluptatem, quas exercitationem deleniti iure tempore a
        obcaecati aliquid aliquam qui vitae! Id, ex harum! Debitis facere vitae,
        cum perspiciatis ipsum voluptatum quasi saepe molestiae quisquam
        excepturi pariatur eveniet consequuntur?
      </div>
      <div className="bg h-screen w-2/5 overflow-y-auto bg-red-200">
        <InfiniteScroll
          dataLength={comments.length}
          next={fetchMoreData}
          hasMore={!!fetchedComment?.nextPageToken}
          loader={fetchedLoading && <h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          {comments?.map((item, index) => {
            return (
              <div className="my-9">
                <h1>{index}</h1>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Testing;
