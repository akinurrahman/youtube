import React from "react";
import ChannelLayout from "../ChannelLayout";
import useChannelStatistics from "../../../hooks/useChannelStatistics";

const Live = () => {
  useChannelStatistics();
  return <ChannelLayout>this is live</ChannelLayout>;
};

export default Live;
