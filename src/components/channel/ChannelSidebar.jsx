import React, { useState } from "react";

const ChannelSidebar = () => {
  const [activeTab, setActiveTab] = useState("Home");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <ul className="flex justify-between sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-2/5">
      <li
        className={`cursor-pointer ${
          activeTab === "Home"
            ? "border-b-2 border-black text-black"
            : "text-gray-800"
        }`}
        onClick={() => handleTabClick("Home")}
      >
        Home
      </li>
      <li
        className={`cursor-pointer ${
          activeTab === "Videos"
            ? "border-b-2 border-black text-black"
            : "text-gray-800"
        }`}
        onClick={() => handleTabClick("Videos")}
      >
        Videos
      </li>
      <li
        className={`hidden sm:block cursor-pointer ${
          activeTab === "Shorts"
            ? "border-b-2 border-black text-black"
            : "text-gray-800"
        }`}
        onClick={() => handleTabClick("Shorts")}
      >
        Shorts
      </li>
      <li
        className={`cursor-pointer ${
          activeTab === "Live"
            ? "border-b-2 border-black text-black"
            : "text-gray-800"
        }`}
        onClick={() => handleTabClick("Live")}
      >
        Live
      </li>
      <li
        className={`cursor-pointer ${
          activeTab === "PlayList"
            ? "border-b-2 border-black text-black"
            : "text-gray-800"
        }`}
        onClick={() => handleTabClick("PlayList")}
      >
        PlayList
      </li>
      <li
        className={`cursor-pointer ${
          activeTab === "Search"
            ? "border-b-2 border-black text-black"
            : "text-gray-800"
        }`}
        onClick={() => handleTabClick("Search")}
      >
        Search
      </li>
      <li
        className={`hidden sm:block cursor-pointer  ${
          activeTab === "Community"
            ? "border-b-2 border-black text-black"
            : "text-gray-800"
        }`}
        onClick={() => handleTabClick("Community")}
      >
        Community
      </li>
    </ul>
  );
};

export default ChannelSidebar;
