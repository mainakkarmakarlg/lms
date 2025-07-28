import React from "react";
import { CgNotes } from "react-icons/cg";
import { CiFolderOn } from "react-icons/ci";
import { HiOutlineLightBulb } from "react-icons/hi";
import { AiOutlineLike } from "react-icons/ai";
import { LuFlag } from "react-icons/lu";
import { BiDislike, BiLike } from "react-icons/bi";
import { IoIosPlayCircle } from "react-icons/io";

function ChapterCardComponent() {
  return (
    <div className="flex-shrink-0 mr-4 min-w-[300px] min-h-[200px] border-2 p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 justify-center items-center">
          <p className="font-semibold text-gray-700">1.</p>
          <p className="font-medium text-lg text-gray-800">Lorem Ipsum</p>
        </div>
        <p className="text-sm text-gray-500">Class Lecture</p>
      </div>

      <div className="flex flex-col space-y-2">
        <div className="flex items-center gap-2">
          <CgNotes className="" />
          <p className="text-sm text-gray-600">LOS Covered in this topic</p>
        </div>
        <div className="flex items-center gap-2">
          <CiFolderOn className="" />
          <p className="text-sm text-gray-600">Content Covered</p>
        </div>
        <div className="flex items-center gap-2">
          <HiOutlineLightBulb className="" />
          <p className="text-sm text-gray-600">
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

        <div className="border-l-2 h-10 mx-4" />
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
