import React, { useState } from "react";
import { IoIosSearch, IoIosNotificationsOutline } from "react-icons/io";
import { FaRegWindowClose } from "react-icons/fa";

import { BsMicFill } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import Hamburger from "./Hamburger";

const Header = () => {
  const [menu, setMenu] = useState(false);
  return (
    <div className="mx-4 mt-3 flex items-center justify-between">
      {/* Column 1 */}
      <div className={`flex space-x-4 ${menu && 'pl-4 space-x-9 '}`}>
        {menu ? (
          <FaRegWindowClose
            size={28}
            onClick={() => setMenu((prev) => !prev)}
            className="z-20"
          />
        ) : (
          <RxHamburgerMenu
            size={26}
            onClick={() => setMenu((prev) => !prev)}
            className="z-20"
          />
        )}

        <img src="/assets/logo.svg" alt="logo" className="z-20 w-24" />
      </div>

      {/* column 2 */}
      <div className="hidden w-2/5 items-center space-x-4 md:flex">
        <div className="search-container flex h-11  w-full items-center rounded-3xl border-2 border-gray-300">
          <input
            type="text"
            placeholder="Search"
            className="mr-px flex h-full  w-full  rounded-l-3xl    px-4 "
          />
          <div className=" flex h-full  items-center justify-center  rounded-r-3xl  border-gray-300 bg-gray-300 px-4">
            <IoIosSearch size={26} />
          </div>
        </div>
        <div className="flex items-center justify-center rounded-full bg-gray-300 p-3 text-sm">
          <BsMicFill size={20} />
        </div>
      </div>

      {/* column 3 */}

      <div className="flex space-x-4">
        <IoIosSearch size={26} className="md:hidden" />

        <BsMicFill size={24} className="hidden sm:block md:hidden" />
        <img src="/assets/add.svg" alt="add video" />

        <IoIosNotificationsOutline className="hidden sm:flex" size={26} />
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="user icon"
          className="h-7 w-7"
        />
      </div>
      {menu && <Hamburger />}
    </div>
  );
};

export default Header;
