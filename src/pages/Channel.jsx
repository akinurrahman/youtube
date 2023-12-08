import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import ChannelTopSection from "../components/channel/ChannelTopSection";
import ChannelSidebar from "../components/channel/ChannelSidebar";
import { useParams } from "react-router-dom";
import Videos from "./channel sections/Videos";
import Home from "./channel sections/Home";
import PlayList from "./channel sections/PlayList";

const Channel = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const { channelId } = useParams();

  const [statistics, setStatistics] = useState(null);
  const [channelVideos, setChannelVideos] = useState(null);
  const [channelShortVideos, setChannelShortVideos] = useState(null);
  const [playLists, setPlayLists] = useState(null);

  // Api call for channel top section
  const { data: statisticsData } = useFetch("channels", {
    part: "snippet,statistics,brandingSettings",
    id: channelId,
  });

  useEffect(() => {
    setStatistics(statisticsData);
  }, [statisticsData]);

  // API call to get channel Long videos
  const { data: channelVideosData } = useFetch("search", {
    part: "snippet",
    type: "video",
    videoDuration: "medium",
    channelId: channelId,
    maxResults: 5,
  });

  useEffect(() => {
    setChannelVideos(channelVideosData);
  }, [channelVideosData]);

  // API call to get channel Short videos
  const { data: channelShortVideosData } = useFetch("search", {
    part: "snippet",
    type: "video",
    videoDuration: "short",
    channelId: channelId,
    maxResults: 5,
  });

  useEffect(() => {
    setChannelShortVideos(channelShortVideosData);
  }, [channelShortVideosData]);

  // API call to get channel PlayLists
  const { data: playListsData } = useFetch("playlists", {
    part: "snippet,contentDetails",
    channelId: channelId,
    maxResults: 5,
  });

  useEffect(() => {
    setPlayLists(playListsData);
  }, [playListsData]);

  // Render based on the stored state data
  return (
    <div className="mx-[15px] mt-5 space-y-3">
      <ChannelTopSection statistics={statistics} />
      <ChannelSidebar setActiveTab={setActiveTab} activeTab={activeTab} />

      {/* Home Section */}
      {activeTab === "Home" && <Home />}

      {/* Long Video Section */}
      {activeTab === "Videos" && (
        <div className="mt-3 grid gap-4 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4">
          {channelVideos?.items?.map((video, index) => {
            return <Videos video={video} key={index} />;
          })}
        </div>
      )}

      {/* Short video section */}
      {activeTab === "Shorts" && (
        <div className="mt-3 grid gap-4 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4">
          {channelShortVideos?.items?.map((video, index) => {
            return <Videos video={video} key={index} />;
          })}
        </div>
      )}

      {/* PlayList video section */}
      {activeTab === "PlayList" && (
        <div className="mt-3 grid gap-4 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4">
          {playLists?.items?.map((playList, index) => {
            return <PlayList playList={playList} key={index} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Channel;
