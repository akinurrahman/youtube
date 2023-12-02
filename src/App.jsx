import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VideoPlayer from "./pages/VideoPlayer";
import SearchResult from "./components/SearchResult";
const App = () => {

  return (

    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:videoID" element={<VideoPlayer />} />
        <Route path="/search/:query" element={<SearchResult/>}/>
      </Routes>
    </Router>
  );
};

export default App;
