import React from "react";
import Header from "./components/header/Header";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VideoPlayer from "./pages/VideoPlayer";
import SearchPage from "./pages/SearchPage";
import Channel from "./pages/Channel";
const App = () => {

  return (

    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:videoID" element={<VideoPlayer />} />
        <Route path="/search/:query" element={<SearchPage/>}/>
        <Route path="/channel/:channelID" element={<Channel/>}/>
      </Routes>
    </Router>
  );
};

export default App;
