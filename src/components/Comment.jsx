import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { MdInsertComment } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";
import AllComments from "./AllComments";

const Comment = () => {
  const [showComment, setShowComment] = useState(false);
  return (
    <>
      <div
        className={`mx-2 mt-4 rounded-xl bg-gray-100 px-2 py-3 ${
          showComment && "hidden"
        }`}
        onClick={() => setShowComment((prev) => !prev)}
      >
        <p className="font-medium  ">Comments 2.2k</p>
        <div className="mt-2 flex  items-center gap-5">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTitWq1r4a-luuWlmEJxHZZKGdBLDGP1439qQ&usqp=CAU"
            alt=""
            className="w-[35px] rounded-full"
          />
          <p className="leading-none">
            Lorem ipsum dolor sit amet consectetur adipisicing elit
          </p>
        </div>
      </div>
      {/* show all comment container */}
      <div
        className={` ${
          showComment ? "block" : "hidden"
        } my-4  h-[100vh]  overflow-y-auto rounded-2xl shadow-[-3px_-5px_5px_0px_#000000BF]`}
      >
        <div className="sticky top-0 z-10 flex justify-between border-b-2 bg-white  px-4 py-5">
          <p className="text-xl font-semibold">
            Comments <sup className="font-normal text-gray-800">2.2k</sup>
          </p>
          <p>
            <RxCross2
              size={25}
              onClick={() => setShowComment((prev) => !prev)}
              className="cursor-pointer"
            />
          </p>
        </div>
        <hr className="my-[2px] border-t border-gray-300" />

        {/* add comment input field */}
        <div className="mx-2 my-6 flex gap-3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTitWq1r4a-luuWlmEJxHZZKGdBLDGP1439qQ&usqp=CAU"
            alt=""
            className="w-[45px] rounded-full"
          />
          <input
            type="text"
            className="w-full rounded-lg border border-gray-300 px-3 focus:border-gray-500 focus:outline-none"
            placeholder="Add a comment..."
          />
        </div>

        {/* all comments */}
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
        <AllComments />
      </div>
    </>
  );
};

export default Comment;
