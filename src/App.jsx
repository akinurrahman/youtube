import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VideoPlayerPage from "./pages/VideoPlayerPage";
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videoID" element={<VideoPlayerPage/>} />
      </Routes>
    </Router>
  );
};

export default App;
