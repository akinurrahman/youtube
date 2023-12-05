import React, { useState } from "react";

import useFetch from "../utils/useFetch";
import ChannelTopSection from "../components/channel/ChannelTopSection";
import ChannelSidebar from "../components/channel/ChannelSidebar";
import Home from "../components/channel/channel pages/Home";
import Videos from "../components/channel/channel pages/Videos";
import Live from "../components/channel/channel pages/Live";
import PlayList from "../components/channel/channel pages/PlayList";
import Search from "../components/channel/channel pages/Search";
import Community from "../components/channel/channel pages/Community";
import { useParams } from "react-router-dom";

const Channel = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const { channelId } = useParams();
  const renderActivePage = () => {
    switch (activeTab) {
      case "Home":
        return <Home />;
      case "Videos":
        return <Videos />;

      case "Shorts":
        return <Videos />;
      case "Live":
        return <Live />;
      case "PlayList":
        return <PlayList />;
      case "Search":
        return <Search />;
      case "Community":
        return <Community />;
      default:
        return <Home />;
    }
  };

  // Api call for channel top section
  const { data: statistics } = useFetch("channels", {
    part: "snippet,statistics,brandingSettings",
    id: channelId,
  });

  // API call to get channel Long videos
  // const { data: ChannelVideos } = useFetch("search", {
  //   part: "snippet",
  //   type: "video",
  //   videoDuration: "medium",
  //   channelId: channelId,
  //   maxResults: 8,
  // });

  // API call to get channel Short videos
  // const { data: ChannelShortVideos } = useFetch("search", {
  //   part: "snippet",
  //   type: "video",
  //   videoDuration: "short",
  //   channelId: channelId,
  //   maxResults: 8,
  // });

  // API call to get channel PlayLists
  const { data: playLists } = useFetch("playlists", {
    part: "snippet,contentDetails",
    channelId: channelId,
    maxResults: 8,
  });

  return (
    <div className="mx-[15px] mt-5 space-y-3">
      <ChannelTopSection statistics={statistics} />
      <ChannelSidebar setActiveTab={setActiveTab} activeTab={activeTab} />

      {/* Home Section */}
      {activeTab === "Home" && <Home />}

      {/*Long Video Section */}
      {/* {activeTab === "Videos" && (
        <div className="mt-3 grid gap-4 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4">
          {ChannelVideos?.items?.map((video, index) => {
            return <Videos video={video} key={index} />;
          })}
        </div>
      )} */}

      {/* Short video section */}
      {/* {activeTab === "Shorts" && (
        <div className="mt-3 grid gap-4 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4">
          {ChannelShortVideos?.items?.map((video, index) => {
            return <Videos video={video} key={index} />;
          })}
        </div>
      )} */}

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