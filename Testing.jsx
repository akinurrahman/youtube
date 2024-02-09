import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getYouTubeData } from "./src/api/queries";

const Testing = ({ video }) => {
  const channelId = video.snippet.channelId;
  console.log("channelid  is ", channelId);

  const { data } = useQuery({
    queryKey: ["trending", channelId],
    queryFn: () =>
      getYouTubeData({
        endpoint: "channels",
        queryParams: {
          part: "snippet",
          id: channelId,
        },
      }),
    staleTime: 1000 * 60 * 5,
  });
  // const channelData = data?.pages.flatMap((page) => page.items) || [];

  // Log custom URL if available
  const customUrl = data?.items[0]?.snippet?.customUrl;
  return (
    <div>
      <h2>{customUrl}</h2>
      <img
        src={video.snippet.thumbnails.default.url}
        alt=""
        className="w-full"
      />
    </div>
  );
};

export default Testing;
