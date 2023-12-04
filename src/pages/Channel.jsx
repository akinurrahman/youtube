import React, { useState } from "react";

import useFetch from '../utils/useFetch'
import ChannelTopSection from "../components/channel/ChannelTopSection";
import ChannelSidebar from "../components/channel/ChannelSidebar";
import Home from "../components/channel/channel pages/Home";
import Videos from "../components/channel/channel pages/Videos";
import Shorts from "../components/channel/channel pages/Shorts";
import Live from "../components/channel/channel pages/Live";
import PlayList from "../components/channel/channel pages/PlayList";
import Search from "../components/channel/channel pages/Search";
import Community from "../components/channel/channel pages/Community";
import { useSelector } from "react-redux";

const Channel = () => {
  const [activeTab, setActiveTab] = useState("Home");
const {channelId} = useSelector((state)=>state.video.videoDetails)

  const renderActivePage = () => {
    switch (activeTab) {
      case "Home":
        return <Home />;
      case "Videos":
        return <Videos />;

      case "Shorts":
        return <Shorts />;
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

  // API call to get channel videos
  const { data:ChannelVideos, loading } = useFetch("search", {
    part: "snippet",
    type: "video",
    videoDuration: "medium",
    channelId: channelId,
    maxResults: 8,
  });


  return (
    <div className="mx-[15px] mt-5 space-y-3">
      <ChannelTopSection />
      <ChannelSidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      {/* {renderActivePage()} */}
      {activeTab === "Home" && <Home />}
      {activeTab === "Videos" && (
        <div className="mt-3 grid gap-4 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4">
          {ChannelVideos?.items?.map((video, index) => {
            return <Videos video={video} key={index}/>;
          })}
        </div>
      )}
    </div>
  );
};

export default Channel;
