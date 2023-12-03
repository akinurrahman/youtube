import React from "react";
import useFetch from "../utils/useFetch";
import { useSelector } from "react-redux";
import ChannelTopSection from "../components/channel/ChannelTopSection";

const Channel = () => {
  const { channelId } = useSelector((state) => state.video.videoDetails);
  const { data, loding } = useFetch("channels", {
    part: "snippet,contentDetails,statistics,brandingSettings",
    id: 'UCn4rEMqKtwBQ6-oEwbd4PcA',
  });
  return (
    <div className="mt-5 mx-[15px]">
      <ChannelTopSection data={data} loding={loding} />
    </div>
  );
};

export default Channel;
