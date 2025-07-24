import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSearchId } from "../../../../redux/slices/practice-quiz/searchSubjects";
import SubjectList from "../SubjectList";

const QuizeSearchOptions = ({ search, searchResults }) => {
  const { subjects } = useSelector((state) => state.quizSubjects);
  const [showSubjects, setShowSubjects] = useState(false);
  const dispatch = useDispatch();

  const handleClick = (subject) => {
    const subjectId =
      subject?.type === "chapter" ? subject.subjectId : subject.id;
    dispatch(setSelectedSearchId(subjectId));
    // setSearch("");
    setShowSubjects(true);
  };

  useEffect(() => {
    if (!search) {
      // Reset when search is cleared and nothing is selected
      setShowSubjects(false);
    }
  }, [search]);

  return (
    <div
      // ref={dropdownRef}
      className="h-full w-full relative"
    >
      {showSubjects ? (
        <SubjectList subjects={subjects} type="search" />
      ) : (
        <div className="w-full h-full">
          {searchResults?.map((subject) => (
            <div
              key={subject.id}
              onClick={() => handleClick(subject)}
              className="w-full p-2 hover:bg-gray-100 cursor-pointer"
            >
              {subject.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizeSearchOptions;
