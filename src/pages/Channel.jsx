import React, { useState } from "react";

import ChannelTopSection from "../components/channel/ChannelTopSection";
import ChannelSidebar from "../components/channel/ChannelSidebar";
import Home from "../components/channel/channel pages/Home";
import Videos from "../components/channel/channel pages/Videos";
import Shorts from "../components/channel/channel pages/Shorts";
import Live from "../components/channel/channel pages/Live";
import PlayList from "../components/channel/channel pages/PlayList";
import Search from "../components/channel/channel pages/Search";
import Community from "../components/channel/channel pages/Community";

const Channel = () => {
  const [activeTab, setActiveTab] = useState("Home");

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
  return (
    <div className="mx-[15px] mt-5 space-y-3">
      <ChannelTopSection />
      <ChannelSidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      {renderActivePage()}
    </div>
  );
};

export default Channel;
