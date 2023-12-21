import React, { useEffect } from "react";
import ChannelLayout from "../ChannelLayout";
import { useLocation, useParams } from "react-router-dom";
import useApi from "../../../hooks/useApi";

const Videos = () => {
  const { channelId } = useParams();

  const {
    fetchData: fetchChannelVideo,
    data: channelVideos,
    error: videoError,
  } = useApi();


 

  const location = useLocation();
  const path = location.pathname;

  let videoDuration;

  if (path === `/channel/${channelId}/shorts`) {
    videoDuration = "short";
  } else if (path === `/channel/${channelId}/videos`) {
    videoDuration = "medium";
  }

  useEffect(() => {
    if (channelId && videoDuration) {
      const url = "search";
      const params = {
        part: "snippet",
        type: "video",
        videoDuration: videoDuration,
        channelId: channelId,
        maxResults: 5,
      };
      fetchChannelVideo(url, params);
    }
  }, [videoDuration, channelId]);
  console.log(channelVideos);

  return <ChannelLayout>this is videos</ChannelLayout>;
};

export default Videos;
