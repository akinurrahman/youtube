import React from "react";
import { IoIosSearch, IoIosNotificationsOutline } from "react-icons/io";
import { BsMicFill } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = () => {
  return (
    <div className="mx-4 mt-3 flex items-center justify-between">
      {/* Column 1 */}
      <div className=" flex space-x-4">
        <RxHamburgerMenu size={26} />
        <img src="/assets/logo.svg" alt="logo" className="w-24" />
      </div>

      {/* column 2 */}
      <div className="hidden w-2/5 items-center space-x-4 md:flex">
        <div className="search-container flex h-11  w-full items-center border-2 border-gray-300 rounded-3xl">
          <input
            type="text"
            placeholder="Search"
            className="flex h-full w-full  rounded-l-3xl  px-4    mr-px "
          />
          <div className=" flex h-full  items-center justify-center  border-gray-300  rounded-r-3xl bg-gray-300 px-4">
            <IoIosSearch size={26} />
          </div>
        </div>
        <div className="flex p-3 items-center justify-center rounded-full bg-gray-300 text-sm">
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
    </div>
  );
};

export default Header;
