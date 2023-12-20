import { NavLink, useParams } from "react-router-dom";
import React from "react";

const ChannelSidebar = () => {
  const { channelId } = useParams();
  return (
    <ul className="flex justify-between sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-2/5">
      <li>
        <NavLink
          to={`/channel/${channelId}`}
          // activeClassName="border-b-2 border-black text-black"
          className="cursor-pointer text-gray-800"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/channel/${channelId}/videos`}
          // activeClassName="border-b-2 border-black text-black"
          className="cursor-pointer text-gray-800"
        >
          Videos
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/channel/${channelId}/shorts`}
          // activeClassName="border-b-2 border-black text-black"
          className="cursor-pointer text-gray-800"
        >
          Shorts
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/channel/${channelId}/live`}
          // activeClassName="border-b-2 border-black text-black"
          className="cursor-pointer text-gray-800"
        >
          Live
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/channel/${channelId}/playlist`}
          // activeClassName="border-b-2 border-black text-black"
          className="cursor-pointer text-gray-800"
        >
          Playlist
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/channel/${channelId}/search`}
          // activeClassName="border-b-2 border-black text-black"
          className="cursor-pointer text-gray-800"
        >
          Search
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/channel/${channelId}/community`}
          // activeClassName="border-b-2 border-black text-black"
          className="cursor-pointer text-gray-800"
        >
          Community
        </NavLink>
      </li>
    </ul>
  );
};

export default ChannelSidebar;
