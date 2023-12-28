import React from "react";
import Header from "./components/header/Header";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VideoPlayer from "./pages/VideoPlayer";
import SearchPage from "./pages/SearchPage";
// import PlayListTop from "./components/channel/PlayListTop";
import ChannelVideos from "./components/channel/channel pages/ChannelVideos";
import ChannelLives from "./components/channel/channel pages/ChannelLives";
import ChannelPlayLists from "./components/channel/channel pages/ChannelPlayLists";
import ChannelSearch from "./components/channel/channel pages/ChannelSearch";
import ChannelCommunities from "./components/channel/channel pages/ChannelCommunities";
import ChannelHome from "./components/channel/channel pages/ChannelHome";
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:videoID" element={<VideoPlayer />} />
        <Route path="/search/:query" element={<SearchPage />} />
        <Route path="/channel/:channelId" element={<ChannelHome />} />
        <Route path="/channel/:channelId/videos" element={<ChannelVideos />} />
        <Route path="/channel/:channelId/shorts" element={<ChannelVideos />} />
        <Route path="/channel/:channelId/live" element={<ChannelLives />} />
        <Route path="/channel/:channelId/playlist" element={<ChannelPlayLists />} />
        <Route path="/channel/:channelId/search" element={<ChannelSearch />} />
        <Route path="/channel/:channelId/community" element={<ChannelCommunities />} />
        {/* <Route path="/playlist/:playListId" element={<PlayListTop />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
