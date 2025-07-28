import React from "react";
import { CgNotes } from "react-icons/cg";
import { CiFolderOn } from "react-icons/ci";
import { HiOutlineLightBulb } from "react-icons/hi";
import { LuFlag } from "react-icons/lu";
import { BiDislike, BiLike } from "react-icons/bi";
import { IoIosPlayCircle } from "react-icons/io";

function ChapterCardComponent() {
  return (
    <div className="flex-shrink-0 mr-4 min-w-[300px] min-h-[200px] border-2 p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 justify-center items-center">
          <p className="font-medium text-lg text-[#656D77]">1. Lorem Ipsum</p>
        </div>
        <div className="border rounded-xl p-1 bg-[#FFF2E4]">
          <p className="text-[13px] text-[#FFAF5E]">Class Lecture</p>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <div className="flex items-center gap-2 text-[#8C8F9F]">
          <CgNotes className="text-[#595b66] text-[17px]" />
          <p className="text-sm text-[#8C8F9F]">LOS Covered in this topic</p>
        </div>
        <div className="flex items-center gap-2">
          <CiFolderOn className="text-[#595b66] text-[17px]" />
          <p className="text-sm text-[#8C8F9F]">Content Covered</p>
        </div>
        <div className="flex items-center gap-2">
          <HiOutlineLightBulb className="text-[#595b66] text-[17px]" />
          <p className="text-sm text-[#8C8F9F]">
            Complete This as soon as possible
          </p>
        </div>
      </div>
      <div className="mt-6 flex justify-between items-center">
        <hr className="border-gray-400 w-full mb-10" />
        <div className="flex gap-4 text-gray-500">
          <LuFlag className="cursor-pointer hover:text-blue-500 transition-all" />
          <CgNotes className="cursor-pointer hover:text-blue-500 transition-all" />
          <BiLike className="cursor-pointer hover:text-green-500 transition-all" />
          <BiDislike className="cursor-pointer hover:text-red-500 transition-all" />
        </div>

        <div className="border-l-2 h-5 mx-4" />
        <div className="flex items-center gap-2">
          <IoIosPlayCircle className="text-xl text-red-600" />
          <p className="text-sm text-gray-600">10:10:10</p>
        </div>
        <input type="checkbox" className="ml-4 cursor-pointer" />
      </div>
    </div>
  );
}

export default ChapterCardComponent;
