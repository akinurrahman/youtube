import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VideoPlayer from "./pages/VideoPlayer";
import SearchPage from "./pages/SearchPage";
const App = () => {

  return (

    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:videoID" element={<VideoPlayer />} />
        <Route path="/search/:query" element={<SearchPage/>}/>
      </Routes>
    </Router>
  );
};

export default App;
