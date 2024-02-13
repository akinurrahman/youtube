import React from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";

const ChannelSidebar = () => {
  const { channelId } = useParams();
  const location = useLocation();

  // Data for NavLinks: label and path
  const navLinks = [
    { label: "Home", path: "" },
    { label: "Videos", path: "/videos" },
    { label: "Shorts", path: "/shorts" },
    { label: "Live", path: "/live" },
    { label: "Playlist", path: "/playlist" },
    { label: "Search", path: "/search" },
    { label: "Community", path: "/community" },
  ];

  // Helper function to determine if a NavLink should be active
  const isActive = (path) => {
    return location.pathname === `/channel/${channelId}${path}`;
  };

  // Apply active style conditionally
  const getNavLinkStyle = (path) => {
    return isActive(path)
      ? { borderBottom: "2px solid blue", color: "blue" }
      : {};
  };

  const scrollbarStyles = {
    /* For WebKit browsers like Chrome and Safari */
    WebkitScrollbar: {
      width: "0",
    },
    /* For Firefox */
    scrollbarWidth: "none",
  };

  return (
    <ul
      className=" mx-5 my-3  flex justify-between space-x-7 overflow-x-auto sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-2/5"
      style={scrollbarStyles}
    >
      {navLinks.map((link, index) => (
        <li key={index}>
          <NavLink
            to={`/channel/${channelId}${link.path}`}
            className="cursor-pointer text-gray-800"
            style={getNavLinkStyle(link.path)}
          >
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default ChannelSidebar;
