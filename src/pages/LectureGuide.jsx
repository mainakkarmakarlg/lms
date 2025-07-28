import React, { useState, useEffect } from "react";
import { MdChevronRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  chapterFilter,
  filterAllLectures,
} from "../redux/slices/lectureguide/lectureGuide"; // Import the actions
import LectureGuideDesktopHeader from "../components/lectureguide/LectureGuideDesktopHeader";
import { CgNotes } from "react-icons/cg";
import { CiFolderOn } from "react-icons/ci";
import { HiOutlineLightBulb } from "react-icons/hi";
import { AiOutlineLike } from "react-icons/ai";
import { LuFlag } from "react-icons/lu";
import { BiDislike, BiLike } from "react-icons/bi";
import { IoIosPlayCircle } from "react-icons/io";

function LectureGuide() {
  const [openedIndices, setOpenedIndices] = useState(new Set());
  const dispatch = useDispatch();
  const { customDetails, chapter } = useSelector((state) => state.lectureGuide);

  const handleLecture = (mid, cid) => {
    const newOpenedIndices = new Set(openedIndices);

    if (openedIndices.has(cid)) {
      newOpenedIndices.delete(cid);
    } else {
      newOpenedIndices.add(cid);
    }

    setOpenedIndices(newOpenedIndices);
  };

  useEffect(() => {
    dispatch(chapterFilter());
    // console.log(chapter);
    dispatch(filterAllLectures({ mid: null, cid: null }));
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center bg-gray-200 gap-2 min-h-screen">
      <LectureGuideDesktopHeader />

      <div className="flex flex-col gap-2 w-[78%] mt-10">
        {customDetails.map((m, index) => (
          <div key={index} className="flex flex-col gap-2 items-start w-full">
            {m.Subjects.map((s, subIndex) => (
              <div
                key={subIndex}
                className="flex flex-col bg-white justify-center w-full p-2 rounded-lg transition-all duration-150"
              >
                <button onClick={() => handleLecture(m.id, s.id)}>
                  <div className="flex bg-white justify-center items-center text-[#656871]">
                    <MdChevronRight
                      className={`transform transition-transform ${
                        openedIndices.has(s.id) ? "rotate-90" : ""
                      }`}
                    />
                    <div className="w-full p-2 flex items-center gap-2">
                      <p className="text-md font-bold">{m.name}</p>
                      <MdChevronRight />
                      <p className="text-md font-bold">{s.name}</p>
                    </div>
                  </div>
                </button>

                <div
                  className={`transition-slide-fade ${openedIndices.has(s.id) ? "open" : "close"}`}
                >
                  {openedIndices.has(s.id) && (
                    <div
                      className="p-2 flex overflow-x-auto w-full scrollbar-thin scrollbar-thumb-gray-400 relative"
                      onWheel={(e) => {
                        e.stopPropagation();
                        const container = e.currentTarget;
                        container.scrollLeft += e.deltaY;
                      }}
                      onMouseEnter={(e) => {
                        document.body.style.overflow = "hidden";
                      }}
                      onMouseLeave={(e) => {
                        document.body.style.overflow = "auto";
                      }}
                      style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "#9ca3af #f3f4f6",
                      }}
                    >
                      {s.chapterLectures.map((lecture, index) => (
                        <div
                          key={index}
                          className="flex-shrink-0 mr-4 min-w-[300px] min-h-[200px] border-2 p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
                        >
                          <div className="flex justify-between items-center mb-4">
                            <div className="flex gap-2 justify-center items-center">
                              <p className="font-semibold text-gray-700">1.</p>
                              <p className="font-medium text-lg text-gray-800">
                                Lorem Ipsum
                              </p>
                            </div>
                            <p className="text-sm text-gray-500">
                              Class Lecture
                            </p>
                          </div>

                          <div className="flex flex-col space-y-2">
                            <div className="flex items-center gap-2">
                              <CgNotes className="text-blue-500" />
                              <p className="text-sm text-gray-600">
                                LOS Covered in this topic
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <CiFolderOn className="text-green-500" />
                              <p className="text-sm text-gray-600">
                                Content Covered
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <HiOutlineLightBulb className="text-yellow-500" />
                              <p className="text-sm text-gray-600">
                                Complete This as soon as possible
                              </p>
                            </div>
                          </div>
                          <div className="mt-6 flex justify-between items-center">
                            <hr className="border-gray-400 w-full" />
                            <div className="flex gap-4 text-gray-500">
                              <LuFlag className="cursor-pointer hover:text-blue-500 transition-all" />
                              <CgNotes className="cursor-pointer hover:text-blue-500 transition-all" />
                              <BiLike className="cursor-pointer hover:text-green-500 transition-all" />
                              <BiDislike className="cursor-pointer hover:text-red-500 transition-all" />
                            </div>

                            <div className="border-l-2 h-10 mx-4" />
                            <div className="flex items-center gap-2">
                              <IoIosPlayCircle className="text-xl text-blue-600" />
                              <p className="text-sm text-gray-600">10:10:10</p>
                            </div>
                            <input
                              type="checkbox"
                              className="ml-4 cursor-pointer"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LectureGuide;
