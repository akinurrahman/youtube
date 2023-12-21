import React from "react";

import ChannelLayout from "../ChannelLayout";

import useChannelStatistics from "../../../hooks/useChannelStatistics";

const Community = () => {
  useChannelStatistics();

  return <ChannelLayout>community</ChannelLayout>;
};

export default Community;
