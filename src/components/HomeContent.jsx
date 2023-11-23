import React from 'react'

const HomeContent = () => {
    const dummyArray = Array.from({ length: 20 }, (_, index) => index + 1)
    // console.log(dummyArray)
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4'>
      {
        dummyArray.map((item,index)=>{
            return (
                <div className='border-2 border-red-500'>
                    <img src="/assets/thumnail.jpg" alt="thumnail" />
                </div>
            )
        })
      }
    </div>
  )
}

export default HomeContent
