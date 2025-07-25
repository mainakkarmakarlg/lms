import React, { useState } from "react";

function ChapterDropdown({ chapters, onChapterSelect }) {
  const [selectedChapter, setSelectedChapter] = useState("");

  const handleChapterChange = (e) => {
    const chapter = e.target.value;
    setSelectedChapter(chapter); 
    onChapterSelect(chapter);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <label htmlFor="chapter" className="block text-lg font-semibold mb-2">
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
        {chapters.map((chap, index) => (
          <option key={index} value={chap}>
            {`Chapter ${index + 1}: ${chap}`} {/* Chapter format */}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ChapterDropdown;
