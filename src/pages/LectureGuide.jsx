import React from "react";
import { useSelector } from "react-redux";
import { MdChevronRight } from "react-icons/md";

import LectureGuideDesktopHeader from "../components/lectureguide/LectureGuideDesktopHeader";

function LectureGuide() {
  const details = useSelector((state) => state.lectureGuide);

  function handleOpenLectures(id) {
    console.log(id);
  }
  console.log(details);
  return (
    <div className="flex flex-col items-center bg-gray-200 gap-2 min-h-screen">
      <LectureGuideDesktopHeader />

      <div className="flex flex-col gap-2 w-[78%] mt-10">
        {details.map((m, index) => (
          <div key={index} className="flex flex-col gap-2 items-start w-full">
            {m.Subjects.map((s, subIndex) => (
              <div
                key={subIndex}
                className="flex bg-white items-center w-full p-3 rounded-lg"
              >
                <MdChevronRight />
                <div className="bg-white w-full p-2 flex items-center gap-2">
                  <p className="text-md font-semibold">{m.name}</p>
                  <MdChevronRight />
                  <p className="text-md font-semibold">{s.name}</p>
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
