import React, { useEffect, useState } from "react";
import { PiTimer } from "react-icons/pi";
import { MdSearch } from "react-icons/md";
import { FaToggleOff } from "react-icons/fa";
import { PiNotebookBold } from "react-icons/pi";
import { FaToggleOn } from "react-icons/fa";
import PopupWrapper from "../common/PopupWraper";
import { useDispatch, useSelector } from "react-redux";
import {
  chapterFilter,
  filterChapterFromSubjects,
} from "../../redux/slices/lectureguide/lectureGuide";

function LectureGuideDesktopHeader() {
  const [activeTab, setActiveTab] = useState("All Lectures");
  const [isToggle, setISToggle] = useState(true);
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [popupActive, setPopUpActive] = useState(false);
  const dispatch = useDispatch();
  const { customDetails, chapter } = useSelector((state) => state.lectureGuide);
  console.log(chapter);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleChapterChange = (e) => {
    const selectedChapterData = JSON.parse(e.target.value);
    const { selectedChapter, subjectId } = selectedChapterData;
    setSelectedChapter(selectedChapter);
  };

  const handleSubjectChange = (e) => {
    const subjectId = e.target.value;
    setSelectedSubject(subjectId);
    dispatch(filterChapterFromSubjects(subjectId));
    console.log("Selected ID:", subjectId);
  };

  const handleSubmit = () => {};

  useEffect(() => {
    dispatch(chapterFilter());
  }, [dispatch, selectedChapter]);

  return (
    <div className="flex flex-col w-[750px] mt-12 bg-white py-4 px-10 justify-center gap-6 rounded-t-2xl shadow-lg lg:w-[1000px] xl:w-[1250px] 2xl:w-[1500px] ">
      <div className="flex justify-between items-center">
        <p className="text-3xl font-semibold text-gray-800">
          Lecture Guide 2025
        </p>
      </div>

      <div className="flex justify-between w-[100%] flex-col xl:flex-row 2xl:w-[1400px] mx-auto">
        <div className="flex gap-5 lg:justify-between">
          <div className="flex font-semibold text-gray-600 gap-5 p-2 xl:w-[350px]">
            <button
              onClick={() => handleTabClick("All Lectures")}
              className={`${
                activeTab === "All Lectures"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : ""
              } hover:text-blue-500 transition duration-200`}
            >
              All Lectures
            </button>

            <button
              onClick={() => handleTabClick("Exam Mentoring")}
              className={`${
                activeTab === "Exam Mentoring"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : ""
              } hover:text-blue-500 transition duration-200 text-nowrap`}
            >
              Exam Mentoring
            </button>

            <button
              onClick={() => handleTabClick("Revision")}
              className={`${
                activeTab === "Revision"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : ""
              } hover:text-blue-500 transition duration-200 text-nowrap`}
            >
              Revision
            </button>
          </div>
          <div className="flex items-center p-3 gap-3">
            <div className="flex justify-center items-center gap-2">
              <PiTimer />
              <p className="text-gray-600">20:10:30</p>
            </div>
            <div className="flex justify-center items-center gap-2">
              <PiNotebookBold />
              <p className="text-gray-600">Total Lectures 132</p>
            </div>
          </div>
        </div>

        <div className="relative flex  justify-center items-center min-w-[600px] p-2 gap-2">
          <div className="flex w-full gap-2 border border-gray-300 rounded-md justify-between">
            <div className="flex items-center ml-2">
              <MdSearch className="text-2xl" />
              <input
                type="text"
                className="search-box w-[200px] h-10 px-4 py-2 border-none focus:outline-none"
                placeholder="Search"
              />
            </div>
            <div className="flex justify-center items-center gap-2 p-2">
              <p className="flex-end">Search by LOS</p>
              <button
                onClick={() => setISToggle(!isToggle)}
                className="transition duration-200"
              >
                {isToggle ? (
                  <FaToggleOn className="text-2xl" />
                ) : (
                  <FaToggleOff className="text-2xl" />
                )}
              </button>
            </div>
          </div>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            onClick={() => setPopUpActive(true)}
          >
            Filter
          </button>
          {popupActive && (
            <PopupWrapper onClose={() => setPopUpActive(false)}>
              <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
                {/* Select Subject */}
                <label
                  htmlFor="subject"
                  className="block text-lg font-semibold mb-2"
                >
                  Select Subject
                </label>
                <select
                  id="subject"
                  value={selectedSubject}
                  onChange={handleSubjectChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="" disabled>
                    Select a Subject
                  </option>
                  {customDetails.map((subject, index) => (
                    <option key={index} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>

                {/* Select Chapter */}
                <label
                  htmlFor="chapter"
                  className="block text-lg font-semibold mb-2"
                >
                  Select Chapter
                </label>
                <select
                  id="chapter"
                  value={selectedChapter}
                  onChange={handleChapterChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="" disabled>
                    Select a Chapter
                  </option>
                  {chapter.map((chap, index) => (
                    <option key={index} value={chap.id}>
                      {`Chapter ${index + 1}: ${chap.name}`}
                    </option>
                  ))}
                </select>
                <button>Submit</button>
              </form>
            </PopupWrapper>
          )}
        </div>
      </div>
    </div>
  );
}

export default LectureGuideDesktopHeader;
