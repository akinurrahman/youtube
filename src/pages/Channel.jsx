import React from "react";

import ChannelTopSection from "../components/channel/ChannelTopSection";
import ChannelSidebar from "../components/channel/ChannelSidebar";

const Channel = () => {
  return (
    <div className="mx-[15px] mt-5 space-y-3">
      <ChannelTopSection />
      <ChannelSidebar />
    </div>
  );
};

export default Channel;
