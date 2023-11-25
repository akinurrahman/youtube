import React from 'react'
import HomeThumnail from '../components/HomeThumnail';

const HomePage = () => {
  const dummyArray = Array.from({ length: 20 }, (_, index) => index + 1);
  // console.log(dummyArray)
  return (
    <div className="m-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4">
      {dummyArray.map((item, index) => {
        return (
         <div>
          <HomeThumnail item={item} index={index} />
         </div>
        );
      })}
    </div>
  );
}

export default HomePage
