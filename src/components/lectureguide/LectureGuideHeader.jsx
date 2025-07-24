import React, { useState } from "react";

function LectureGuideHeader() {
  const [activeTab, setActiveTab] = useState("All Lectures");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="flex flex-col bg-white w-full max-w-[1500px] mt-20 p-4 justify-center gap-6 rounded-t-2xl shadow-lg">
      <div>
        <p className="text-3xl font-semibold text-gray-800">
          Lecture Guide 2025
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-6 font-semibold text-gray-600">
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
            } hover:text-blue-500 transition duration-200`}
          >
            Exam Mentoring
          </button>

          <button
            onClick={() => handleTabClick("Revision")}
            className={`${
              activeTab === "Revision"
                ? "text-blue-500 border-b-2 border-blue-500"
                : ""
            } hover:text-blue-500 transition duration-200`}
          >
            Revision
          </button>
        </div>

        <div className="flex items-center gap-6">
          <p className="text-gray-600">Duration: 20:10:30</p>
          <p className="text-gray-600">Total Lectures 132</p>

          <div className="relative">
            <input
              type="text"
              className="search-box w-[250px] h-10 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search"
            />
          </div>

          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
            Filter
          </button>
        </div>
      </div>
    </div>
  );
}

export default LectureGuideHeader;
