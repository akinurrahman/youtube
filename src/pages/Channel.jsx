import React from "react";
import useFetch from "../utils/useFetch";
import { useSelector } from "react-redux";
import ChannelTopSection from "../components/channel/ChannelTopSection";
import ChannelSidebar from "../components/channel/ChannelSidebar";

const Channel = () => {
  const { channelId } = useSelector((state) => state.video.videoDetails);
  const { data, loding } = useFetch("channels", {
    part: "snippet,contentDetails,statistics,brandingSettings",
    id: "UCn4rEMqKtwBQ6-oEwbd4PcA",
  });
  return (
    <div className="mx-[15px] mt-5 space-y-3">
      <ChannelTopSection data={data} loding={loding} />
      <ChannelSidebar />
    </div>
  );
};

export default Channel;
