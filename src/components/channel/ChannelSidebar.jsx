import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const ChannelSidebar = () => {
  const [activeTab, setActiveTab] = useState("Home");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <ul className="flex justify-between sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-2/5">
      <NavLink to='/'
        className={`cursor-pointer ${
          activeTab === "Home"
            ? "border-b-2 border-black text-black"
            : "text-gray-800"
        }`}
        onClick={() => handleTabClick("Home")}
      >
        Home
      </NavLink>
      <NavLink to='/'
        className={`cursor-pointer ${
          activeTab === "Videos"
            ? "border-b-2 border-black text-black"
            : "text-gray-800"
        }`}
        onClick={() => handleTabClick("Videos")}
      >
        Videos
      </NavLink>
      <NavLink to='/'
        className={`hidden sm:block cursor-pointer ${
          activeTab === "Shorts"
            ? "border-b-2 border-black text-black"
            : "text-gray-800"
        }`}
        onClick={() => handleTabClick("Shorts")}
      >
        Shorts
      </NavLink>
      <NavLink to='/'
        className={`cursor-pointer ${
          activeTab === "Live"
            ? "border-b-2 border-black text-black"
            : "text-gray-800"
        }`}
        onClick={() => handleTabClick("Live")}
      >
        Live
      </NavLink>
      <NavLink to='/'
        className={`cursor-pointer ${
          activeTab === "PlayList"
            ? "border-b-2 border-black text-black"
            : "text-gray-800"
        }`}
        onClick={() => handleTabClick("PlayList")}
      >
        PlayList
      </NavLink>
      <NavLink to='/'
        className={`cursor-pointer ${
          activeTab === "Search"
            ? "border-b-2 border-black text-black"
            : "text-gray-800"
        }`}
        onClick={() => handleTabClick("Search")}
      >
        Search
      </NavLink>
      <NavLink to='/'
        className={`hidden sm:block cursor-pointer  ${
          activeTab === "Community"
            ? "border-b-2 border-black text-black"
            : "text-gray-800"
        }`}
        onClick={() => handleTabClick("Community")}
      >
        Community
      </NavLink>
    </ul>
  );
};

export default ChannelSidebar;
