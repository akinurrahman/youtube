import React from 'react'

const Hamburger = () => {
  return (
    <div>
        {/* overlay */}
      <div className="fixed left-0 top-0 z-10 h-screen w-full bg-black/80"></div>
      {/* side drawer menu */}
      <div className='fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300'>

      </div>
    </div>
  )
}

export default Hamburger
