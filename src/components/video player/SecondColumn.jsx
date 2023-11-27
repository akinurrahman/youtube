import React from "react";

const SecondColumn = () => {
  return (
    <div className="mx-2 my-4 flex space-x-2 sm:mx-3">
      <div className="sm:w-4/5 md:w-[35%] lg:w-auto">
        <img
          src="/assets/thumnail2.jpg"
          alt="thumnail"
          className="rounded-lg   sm:w-full md:h-[105px] md:w-full lg:h-full  "
        />
      </div>

      {/* video title - channel name - views and time */}
      <div className="flex flex-col gap-1     ">
        <h2 className="line-clamp-2  font-bold text-gray-900 ">
          Yeh Ladka Hai Allah - Vishakha Mahore | Asha Bhosle & Mohammad Rafi |
          Yeh Ladka Hai Allah - Vishakha Mahore | Asha Bhosle & Mohammad Rafi |
        </h2>

        <p className="line-clamp-1 text-sm text-gray-700">Music Fever</p>

        <p className="line-clamp-1 text-sm text-gray-700">
          13M views • 21 hours ago
        </p>
      </div>
    </div>
  );
};

export default SecondColumn;
