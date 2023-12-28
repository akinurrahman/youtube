import React, { useState } from "react";
import { IoIosSearch, IoIosNotificationsOutline } from "react-icons/io";
import { FaRegWindowClose } from "react-icons/fa";

import { BsMicFill } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import Hamburger from "./Hamburger";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../redux/features/infoSlice";
import Suggestions from "../search/Suggestions";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((state) => state.info);
  const [mobileSearch, setMobileSearch] = useState(false);
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (searchQuery !== "") {
        navigate(`/search/${searchQuery}`);
        dispatch(setSearchQuery(""));
      }
    }
  };
  console.log(searchQuery);

  const handleNevigate = () => {
    if (searchQuery !== "") {
      navigate(`/search/${searchQuery}`);
      dispatch(setSearchQuery(""));
    }
  };

  return (
    <div>
      <div className="fixed left-0 top-0 z-30 flex w-full items-center justify-between bg-white  px-4 py-3 ">
        {/* Column 1 */}
        <div className={` flex  space-x-9 ${menu && " space-x-9 "} `}>
          {menu ? (
            <FaRegWindowClose
              size={28}
              onClick={() => setMenu((prev) => !prev)}
              className=" z-50 cursor-pointer"
            />
          ) : (
            <RxHamburgerMenu
              size={26}
              onClick={() => setMenu((prev) => !prev)}
              className=" z-50 cursor-pointer"
            />
          )}
          <NavLink to="/" className=" z-50 w-24">
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
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              value={searchQuery}
              onKeyDown={handleKeyDown}
            />
            <div
              onClick={handleNevigate}
              className=" flex h-full  items-center justify-center  rounded-r-3xl  border-gray-300 bg-gray-300 px-4"
            >
              <IoIosSearch size={26} className="cursor-pointer" />
            </div>
          </div>
          <div className="flex cursor-pointer items-center justify-center rounded-full bg-gray-300 p-3 text-sm">
            <BsMicFill size={20} />
          </div>
        </div>

        {/* column 3 */}

        <div className=" flex items-center space-x-4">
          <IoIosSearch
            size={26}
            className="cursor-pointer md:hidden"
            onClick={() => setMobileSearch((prev) => !prev)}
          />

          <BsMicFill
            size={24}
            className="hidden cursor-pointer sm:block md:hidden"
          />
          <img
            src="/assets/add.svg"
            alt="add video"
            className="cursor-pointer"
          />

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
      {/* this part is for mobile device only */}
      <div className={`z-50 mx-4 mt-2  ${!mobileSearch && "hidden"}`}>
        <input
          type="text"
          className="w-full rounded-md border border-gray-400 px-2  py-[2px] outline-none focus:border-gray-600 "
          placeholder="Search"
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          value={searchQuery}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="h-14"></div>
      <Suggestions />
    </div>
  );
};

export default Header;
