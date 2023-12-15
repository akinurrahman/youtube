import React from "react";
import { NavLink } from "react-router-dom";

const Channel = ({ channelId, title, customUrl, subsCount, thumbnail }) => {
  return (
    <NavLink
      to={`/channel/${channelId}`}
      className="mx-8 my-4  flex gap-2 space-x-10 sm:mx-5 sm:justify-start  lg:mx-[187px]"
    >
      <img
        src={thumbnail}
        alt=""
        className="aspect-square h-[100px] rounded-full sm:h-[125px]"
      />
      <div className="space-y-1">
        <h2 className="text-lg font-medium">{title}</h2>
        <p className=" text-sm leading-none">{customUrl}</p>
        <p className=" text-sm leading-none ">{subsCount} subscriber</p>

        <button
          className="rounded-3xl bg-black px-5 py-2 text-white "
          style={{ marginTop: "8px" }}
        >
          Subscribe
        </button>
      </div>
    </NavLink>
  );
};

export default Channel;
