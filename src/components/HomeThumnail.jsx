import React from "react";
import { NavLink } from "react-router-dom";

const ThumnailCard = ({item, index}) => {
  return (
    <NavLink to="/videoID" key={index}>
      <img
        src="/assets/thumnail.jpg"
        alt="thumnail"
        className="rounded-xl border-2 border-red-500"
      />

      {/* statics */}
      <div className="info my-2 flex space-x-4 px-1">
        <div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="user icon"
            className="w-[120px]"
          />
        </div>
        <div>
          <h2 className="line-clamp-2 font-bold  text-gray-900 ">
            Yeh Ladka Hai Allah - Vishakha Mahore | Asha Bhosle & Mohammad Rafi
            | Yeh Ladka Hai Allah - Vishakha Mahore | Asha Bhosle & Mohammad
            Rafi |
          </h2>
          <p className="text-gray-700">CarryMinati</p>
          <p className="text-gray-700">13M views • 21 hours ago</p>
        </div>
      </div>
    </NavLink>
  );
};

export default ThumnailCard;
