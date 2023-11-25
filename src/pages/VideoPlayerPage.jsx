import React from 'react'
import VideoPlayer from '../components/VideoPlayer'

const VideoPlayerPage = () => {
  return (
   <div className='lg:flex '>
    <div className='column-1 h-screen lg:w-[70%]  '>
        <VideoPlayer/>
    </div>
    <div className='column-2 h-screen lg:w-[30%] bg-red-500'></div>
   </div>
  )
}

export default VideoPlayerPage
