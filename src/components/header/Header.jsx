import React, { useEffect, useState } from "react";
import { IoIosSearch, IoIosNotificationsOutline } from "react-icons/io";
import { FaRegWindowClose } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { BsMicFill } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import Hamburger from "./Hamburger";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../redux/features/infoSlice";
import Suggestions from "../search/Suggestions";
import { IoIosArrowRoundBack } from "react-icons/io";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../../../firebaseConfig";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((state) => state.info);
  const [mobileSearch, setMobileSearch] = useState(false);
  const navigate = useNavigate();

  // Function to handle search query on Enter press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (searchQuery !== "") {
        navigate(`/search/${searchQuery}`);
        dispatch(setSearchQuery(""));
      }
    }
  };

  // Function to navigate on search icon click
  const handleNavigate = (query) => {
    if (query !== "") {
      navigate(`/search/${query}`);
      dispatch(setSearchQuery(""));
    }
  };

  // Function to handle sign-in with Firebase using pop-up
  const handleSignIn = async () => {
    try {
      // Check if the user is already signed in
      if (auth.currentUser) {
        // If already signed in, sign out
        await auth.signOut();
      }

      // Sign in with popup
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Successfully SignedIn");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    // Check if a user is signed in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserInfo(user);
      }
    });

    return () => {
      // Clean up subscription when component unmounts
      unsubscribe();
    };
  }, []);

  return (
    <header className={`mx-auto  flex h-10 flex-col items-center md:h-12`}>
      {/* Navbar */}
      <nav
        className={`fixed left-0 top-0 z-30 flex w-full items-center justify-between bg-white px-4 py-3 ${
          mobileSearch && "hidden"
        }`}
      >
        {/* Col 1 */}
        <section className={`flex space-x-9 ${menu && " space-x-9 "}`}>
          {menu ? (
            <FaRegWindowClose
              size={28}
              onClick={() => setMenu((prev) => !prev)}
              className="z-50 cursor-pointer"
            />
          ) : (
            <RxHamburgerMenu
              size={26}
              onClick={() => setMenu((prev) => !prev)}
              className="z-50 cursor-pointer"
            />
          )}
          <NavLink to="/" className="z-50 w-24">
            <img src="/assets/logo.svg" alt="logo" />
          </NavLink>
        </section>

        {/* Col 2 */}
        <section className="hidden w-2/5 items-center space-x-4 md:flex">
          <div className="search-container flex h-11 w-full items-center rounded-3xl border-2 border-gray-300">
            <input
              type="text"
              placeholder="Search"
              className="mr-px flex h-full w-full rounded-l-3xl px-4"
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              value={searchQuery}
              onKeyDown={handleKeyDown}
            />
            <div
              onClick={() => handleNavigate(searchQuery)}
              className="flex h-full items-center justify-center rounded-r-3xl border-gray-300 bg-gray-300 px-4"
            >
              <IoIosSearch size={26} className="cursor-pointer" />
            </div>
          </div>
          <div className="flex cursor-pointer items-center justify-center rounded-full bg-gray-300 p-3 text-sm">
            <BsMicFill size={20} />
          </div>
        </section>

        {/* col 3 */}
        <section className="flex items-center space-x-4">
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
          {!userInfo ? (
            <img
              src={"https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              alt="user icon"
              className=" w-[35px] cursor-pointer rounded-full object-cover"
              onClick={handleSignIn}
            />
          ) : (
            <img
              src={
                userInfo.photoURL ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="User Avatar"
              className=" w-[35px] cursor-pointer rounded-full object-cover "
              onClick={handleSignIn}
            />
          )}
        </section>
        {menu && <Hamburger />}
      </nav>

      {/* For Mobile Searchbar*/}
      <section
        className={`fixed left-0 top-0 z-50 mx-4 mt-2 flex h-9 items-center rounded-3xl ${
          !mobileSearch && "hidden"
        }`}
      >
        <IoIosArrowRoundBack
          size={40}
          onClick={() => setMobileSearch((prev) => !prev)}
          className="cursor-pointer"
        />
        <div className="ml-2 flex h-full w-full items-center space-x-3 rounded-full border-2 bg-gray-200 pr-3">
          <input
            type="text"
            className="w-4/5 rounded-md bg-transparent px-4 py-[2px] outline-none focus:border-gray-600"
            placeholder="Search"
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            value={searchQuery}
            onKeyDown={handleKeyDown}
          />
          <IoMdClose
            size={22}
            onClick={() => dispatch(setSearchQuery(""))}
            className="cursor-pointer"
          />
          <IoIosSearch
            size={22}
            onClick={() => handleNavigate(searchQuery)}
            className="cursor-pointer"
          />
        </div>
      </section>

      {/* for suggestion section */}
      <section
        className={`fixed   z-50  mt-12 w-full rounded-xl bg-white sm:mt-[53px] sm:w-[70%] md:mt-[65px] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[38%]`}
      >
        <Suggestions />
      </section>
    </header>
  );
};

export default Header;
