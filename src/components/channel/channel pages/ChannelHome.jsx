import React, { useEffect } from "react";
import useChannelStatistics from "../../../hooks/useChannelStatistics";
import ChannelLayout from "../ChannelLayout";

const ChannelHome = () => {
  useChannelStatistics();

  return <ChannelLayout>this is homepage</ChannelLayout>;
};

export default ChannelHome;
