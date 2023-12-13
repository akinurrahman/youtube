import React from "react";
import Header from "./components/header/Header";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VideoPlayer from "./pages/VideoPlayer";
import SearchPage from "./pages/SearchPage";
import Channel from "./pages/Channel";
import PlayListTop from "./components/channel/PlayListTop";
import Testing from "./Testing";
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:videoID" element={<VideoPlayer />} />
        <Route path="/search/:query" element={<SearchPage />} />
        <Route path="/channel/:channelId" element={<Channel />} />
        <Route path="/playlist/:playListId" element={<PlayListTop />} />
        <Route path="/testing" element={<Testing />} />
      </Routes>
    </Router>
  );
};

export default App;
