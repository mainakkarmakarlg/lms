import React from "react";
import { useSelector } from "react-redux";
import LectureGuideHeader from "../components/lectureguide/LectureGuideHeader";

function LectureGuide() {
  const details = useSelector((state) => state.lectureGuide);
  console.log(details);
  return (
    <div className="flex justify-center items-center bg-gray-200">
      <LectureGuideHeader />
    </div>
  );
}

export default LectureGuide;
