import React from "react";
import Header from "./components/header/Header";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VideoPlayer from "./pages/VideoPlayer";
import SearchPage from "./pages/SearchPage";
// import PlayListTop from "./components/channel/PlayListTop";
import Videos from "./components/channel/channel pages/Videos";
import Live from "./components/channel/channel pages/Live";
import PlayLists from "./components/channel/channel pages/PlayLists";
import Search from "./components/channel/channel pages/Search";
import Community from "./components/channel/channel pages/Community";
import ChannelHome from "./components/channel/channel pages/ChannelHome";
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:videoID" element={<VideoPlayer />} />
        <Route path="/search/:query" element={<SearchPage />} />
        <Route path="/channel/:channelId" element={<ChannelHome/>} />
         <Route path="/channel/:channelId/videos" element={<Videos/>} />
        <Route path="/channel/:channelId/shorts" element={<Videos />} />
        <Route path="/channel/:channelId/live" element={<Live/>} />
        <Route path="/channel/:channelId/playlist" element={<PlayLists/>} />
        <Route path="/channel/:channelId/search" element={<Search/>} />
        <Route path="/channel/:channelId/community" element={<Community/>} />
        {/* <Route path="/playlist/:playListId" element={<PlayListTop />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
