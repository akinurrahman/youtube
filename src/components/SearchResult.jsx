import React from "react";

const SearchResult = () => {
  return (
    <div className="mt-3 gap-4 sm:flex md:mx-5 lg:mx-[187px]">
      {/* col - 1  */}
      <div className=" md:max-w-[400px]">
        <img
          src="/assets/thumnail.jpg"
          alt=""
          className=" border-2 border-red-400 sm:rounded-xl "
        />
      </div>
      {/* col-2 */}
      <div className="mx-2 mt-2 flex items-center sm:hidden">
        <div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt=""
            className="mr-3 max-w-[40px] rounded-full "
          />
        </div>
        <div>
          <h2 className="line-clamp-2 font-semibold leading-none">
            How to Avoid Procrastination ? 4 Steps to reduce Procrastination |
            Late Night Talk How to Avoid Procrastination ? 4 Steps to reduce
            Procrastination | Late Night Talk
          </h2>
          <p className="line-clamp-1 text-gray-700">
            Aman Dhatarwal • 3.5M views • 4 months ago
          </p>
        </div>
      </div>
      {/* show this for column 2 when size is small */}
      <div className="mt-1 hidden flex-col sm:flex ">
        <h2 className="mb-1 line-clamp-2 font-semibold ">
          How to Avoid Procrastination ? 4 Steps to reduce Procrastination |
          Late Night Talk How to Avoid Procrastination ? 4 Steps to reduce
          Procrastination | Late Night Talk
        </h2>
        <p className="mb-2 line-clamp-1 text-gray-700">
          3.5M views • 4 months ago
        </p>
        <p className="mb-2 line-clamp-1  flex items-center text-gray-700">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt=""
            className="mr-3 max-w-[25px] rounded-full "
          />{" "}
          Aman Dhatarwal
        </p>
        <p className="line-clamp-2 text-gray-600 md:line-clamp-3">
          How to Avoid Procrastination ? 4 Steps to reduce Procrastination |
          Late Night Talk How to Avoid Procrastination ? 4 Steps to reduce
          Procrastination | Late Night Talk
        </p>
      </div>
    </div>
  );
};

export default SearchResult;
