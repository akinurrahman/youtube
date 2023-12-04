import React, { useState } from "react";
import { IoIosSearch, IoIosNotificationsOutline } from "react-icons/io";
import { FaRegWindowClose } from "react-icons/fa";

import { BsMicFill } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import Hamburger from "./Hamburger";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const [query, setQuery] = useState("");
  return (
    <div className=" mx-4 mt-3 flex items-center justify-between">
      {/* Column 1 */}
      <div className={` flex  space-x-9 ${menu && " space-x-9 "} `}>
        {menu ? (
          <FaRegWindowClose
            size={28}
            onClick={() => setMenu((prev) => !prev)}
            className=" z-20 cursor-pointer"
          />
        ) : (
          <RxHamburgerMenu
            size={26}
            onClick={() => setMenu((prev) => !prev)}
            className=" z-20 cursor-pointer"
          />
        )}
        <NavLink to="/" className=" z-20 w-24">
          <img src="/assets/logo.svg" alt="logo" />
        </NavLink>
      </div>

      {/* column 2 */}
      <div className=" hidden w-2/5 items-center space-x-4 md:flex">
        <div className="search-container flex h-11  w-full items-center rounded-3xl border-2 border-gray-300">
          <input
            type="text"
            placeholder="Search"
            className="mr-px flex h-full  w-full  rounded-l-3xl    px-4 "
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <NavLink
            to={`/search/${query}`}
            className=" flex h-full  items-center justify-center  rounded-r-3xl  border-gray-300 bg-gray-300 px-4"
          >
            <IoIosSearch size={26} className="cursor-pointer" />
          </NavLink>
        </div>
        <div className="flex cursor-pointer items-center justify-center rounded-full bg-gray-300 p-3 text-sm">
          <BsMicFill size={20} />
        </div>
      </div>

      {/* column 3 */}

      <div className=" flex items-center space-x-4">
        <IoIosSearch size={26} className="cursor-pointer md:hidden" />

        <BsMicFill
          size={24}
          className="hidden cursor-pointer sm:block md:hidden"
        />
        <img src="/assets/add.svg" alt="add video" className="cursor-pointer" />

        <IoIosNotificationsOutline
          className="hidden cursor-pointer sm:flex"
          size={26}
        />
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="user icon"
          className="w-[30px] cursor-pointer"
        />
      </div>
      {menu && <Hamburger />}
    </div>
  );
};

export default Header;
