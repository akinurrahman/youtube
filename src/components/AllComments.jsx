import React from 'react'
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { MdInsertComment } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";
const AllComments = () => {
  return (
    <div className="mx-2 flex gap-3">
    <div className=" h-fit w-[45px]">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTitWq1r4a-luuWlmEJxHZZKGdBLDGP1439qQ&usqp=CAU"
        alt=""
        className="w-full  rounded-full "
      />
    </div>

    <div className="w-5/6">
      <div className="mr-2 flex justify-between">
        <p>@akinurrahman</p> <p>13 hours ago</p>
      </div>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi
      </p>

      <div className="flex justify-between ">
        <p className="flex items-center">
          <AiOutlineLike className="mr-1"/> 11K <AiOutlineDislike className="mx-3" />
          <MdInsertComment className="mr-1"/>
          43
        </p>
        <p>
          <CiMenuKebab className="mr-2"/>
        </p>
      </div>
      <p className="text-center font-medium my-5">Show more replies</p>
    </div>
  </div>
  )
}

export default AllComments
