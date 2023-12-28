import React from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineSubscriptions } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { PiUserSquareFill } from "react-icons/pi";
import { LiaHistorySolid } from "react-icons/lia";
import { BiSolidVideos } from "react-icons/bi";
import { BsClockHistory } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
const Hamburger = () => {
  return (
    <div>
        
        {/* overlay */}
      <div className="fixed left-0 top-0 z-40 h-screen w-full bg-black/80"></div>
      {/* side drawer menu */}
      <div className='fixed top-0 left-0 w-[300px] h-screen bg-white z-40 duration-300'>
        <nav>
            <ul className='flex flex-col   mt-12   text-gray-800 '>
                


                
                <li className='flex py-4 px-4 text-xl items-center hover:bg-gray-300  '>
                <IoHomeOutline className='mr-10' siz={24}/> Home
                </li>
                <li className='flex py-4 px-4 text-xl items-center hover:bg-gray-300  '>
                <SiYoutubeshorts className='mr-10' siz={24}/> Shorts
                </li>
                <li className='flex py-4 px-4 text-xl items-center hover:bg-gray-300  '>
                <MdOutlineSubscriptions className='mr-10' siz={24}/> Subscriptions
                </li>
                
                <li className='flex py-4 px-4 text-xl items-center hover:bg-gray-300  '>
                <PiUserSquareFill className='mr-10' siz={32}/> Your Profile
                </li>
                <li className='flex py-4 px-4 text-xl items-center hover:bg-gray-300  '>
                <LiaHistorySolid className='mr-10' siz={24}/> History
                </li>
                <li className='flex py-4 px-4 text-xl items-center hover:bg-gray-300  '>
                <BiSolidVideos className='mr-10' siz={24}/> Your Videos
                </li>
                <li className='flex py-4 px-4 text-xl items-center hover:bg-gray-300  '>
                <BsClockHistory className='mr-10' siz={24}/> Watch Later
                </li>
                <li className='flex py-4 px-4 text-xl items-center hover:bg-gray-300  '>
                <AiOutlineLike className='mr-10' siz={24}/> Liked Videos
                </li>
               
            </ul>
        </nav>

      </div>
    </div>
  )
}

export default Hamburger
