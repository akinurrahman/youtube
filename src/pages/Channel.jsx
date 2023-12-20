// import React, { useState, useEffect } from "react";
// import useFetch from "../hooks/useFetch";
// import ChannelTopSection from "../components/channel/ChannelTopSection";
// import ChannelSidebar from "../components/channel/ChannelSidebar";
// import { useParams } from "react-router-dom";
// import Videos from "../components/channel/channel pages/Videos";
// import Home from "../components/channel/channel pages/Home";
// import PlayList from "../components/channel/channel pages/PlayLists";

// const Channel = () => {
//   const [activeTab, setActiveTab] = useState("Home");
//   const { channelId } = useParams();

//   const [statistics, setStatistics] = useState(null);
//   const [channelVideos, setChannelVideos] = useState(null);
//   const [channelShortVideos, setChannelShortVideos] = useState(null);
//   const [playLists, setPlayLists] = useState(null);

//   // Api call for channel top section
//   const { data: statisticsData } = useFetch("channels", {
//     part: "snippet,statistics,brandingSettings",
//     id: channelId,
//   });

//   useEffect(() => {
//     setStatistics(statisticsData);
//   }, [statisticsData]);

//   // API call to get channel Long videos
//   const { data: channelVideosData } = useFetch("search", {
//     part: "snippet",
//     type: "video",
//     videoDuration: "medium",
//     channelId: channelId,
//     maxResults: 5,
//   });

//   useEffect(() => {
//     setChannelVideos(channelVideosData);
//   }, [channelVideosData]);

//   // API call to get channel Short videos
//   const { data: channelShortVideosData } = useFetch("search", {
//     part: "snippet",
//     type: "video",
//     videoDuration: "short",
//     channelId: channelId,
//     maxResults: 5,
//   });

//   useEffect(() => {
//     setChannelShortVideos(channelShortVideosData);
//   }, [channelShortVideosData]);

//   // API call to get channel PlayLists
//   const { data: playListsData } = useFetch("playlists", {
//     part: "snippet,contentDetails",
//     channelId: channelId,
//     maxResults: 5,
//   });

//   useEffect(() => {
//     setPlayLists(playListsData);
//   }, [playListsData]);

//   // Render based on the stored state data
//   return (
//     <div className="mx-[15px] mt-5 space-y-3">
//       <ChannelTopSection statistics={statistics} />
//       <ChannelSidebar />
//     </div>
//   );
// };

// export default Channel;
import React from 'react'

const Channel = () => {
  return (
    <div>
      channel
    </div>
  )
}

export default Channel
