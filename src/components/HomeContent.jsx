import React from "react";

const HomeContent = () => {
  const dummyArray = Array.from({ length: 20 }, (_, index) => index + 1);
  // console.log(dummyArray)
  return (
    <div className="m-4 grid grid-cols-1 gap-4 sm:grid-cols-2  lg:grid-cols-4">
      {dummyArray.map((item, index) => {
        return (
          <div className=" ">
            <img
              src="/assets/thumnail.jpg"
              alt="thumnail"
              className="rounded-xl border-2 border-red-500"
            />
            <div className="info my-2 flex space-x-4 px-1">
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="user icon"
                  className="w-[64px]"
                />
              </div>
              <div>
                <h2 className="line-clamp-2 font-bold  text-gray-900 ">
                  Yeh Ladka Hai Allah - Vishakha Mahore | Asha Bhosle & Mohammad
                  Rafi |...
                </h2>
                <p className="text-gray-700">CarryMinati</p>
                <p className="text-gray-700">13M views • 21 hours ago</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HomeContent;
