import React from 'react'

const HomeSkeleton = () => {
  return (
    <div className="animate-pulse">
    <div className="thumnail bg-gray-300 h-[205px] w-full"></div>

    <div className="info my-2 flex space-x-4 px-1">
      <div className="logo h-[41px] w-[50px] bg-gray-300 rounded-full "></div>
      <div className="w-full space-y-1">
        <h2 className="bg-gray-300 w-full h-[13px] "></h2>
        <h2 className="bg-gray-300 w-full h-[13px] "></h2>
        <h2 className="bg-gray-300 w-full h-[13px] "></h2>
       
      </div>
    </div>
  </div>
  )
}

export default HomeSkeleton
