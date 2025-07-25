import React, { useState, useEffect } from "react";
import { MdChevronRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  filterAllLectures,
  subjectFilter,
  updateCustomDetails,
} from "../redux/slices/lectureguide/lectureGuide"; // Import the actions
import LectureGuideDesktopHeader from "../components/lectureguide/LectureGuideDesktopHeader";

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
    dispatch(subjectFilter());
    console.log(chapter);;
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
                      className="bg-green-100 p-2 flex overflow-x-auto w-full scrollbar-thin scrollbar-thumb-gray-400 relative"
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
                          className="flex-shrink-0 mr-4 min-w-[200px] min-h-[150px] bg-yellow-300"
                        >
                          <p className="whitespace-nowrap p-2">
                            {lecture.name}
                          </p>
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
