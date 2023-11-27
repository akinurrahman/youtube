import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VideoPlayer from "./pages/VideoPlayer";
import { useSelector } from "react-redux";
const App = () => {
// const {video} = useSelector((state)=>state.video)
// console.log(video)
  return (

    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:videoID" element={<VideoPlayer />} />
      </Routes>
    </Router>
  );
};

export default App;
