import { useCallback, useEffect, useRef, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import QuizTag from "../../../../components/common/QuizTag";
import useOutsideClick from "../../../../hooks/useOutside";
import QuizeSearchOptions from "./QuizeSearchOptions";
import { useDispatch, useSelector } from "react-redux";
import { setSearchResults } from "../../../../redux/slices/practice-quiz/searchSubjects";
import { getData } from "../../../../apiCalls/getData";

const SelectedTopics = () => {
  const { subjects } = useSelector((state) => state.quizSubjects);
  const searchRef = useRef();
  const dropdownRef = useRef();
  const [search, setSearch] = useState("");
  const { searchResults } = useSelector((state) => state.searchSubjects);
  const { accessToken } = useSelector((state) => state.user);
  const [showSearchComponent, setShowSearchComponent] = useState(false);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  // Debounce function
  const debounce = (fn, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  };

  // Memoized API call with debouncing
  const fetchSubjects = useCallback(
    debounce(async (query) => {
      if (!query.trim()) return;
      setShowSearchComponent(true);
      try {
        const response = await getData(
          `practice/searchsubject?courseId=${course?.course?.id}&searchString=${query}`,
          accessToken
        );
        dispatch(setSearchResults(response.data));
      } catch (error) {
        setShowSearchComponent(false);
        console.error("Error fetching subjects:", error);
      }
    }, 500),
    [dispatch, accessToken]
  );

  // Fetch subjects only if search is not empty
  useEffect(() => {
    if (search.trim() !== "") {
      fetchSubjects(search);
    } else {
      setShowSearchComponent(false);
    }
  }, [search, fetchSubjects]);

  // Correct useOutsideClick implementation
  useOutsideClick(dropdownRef, (e) => {
    if (searchRef.current.contains(e.target)) return; // Prevent closing if clicked inside search input
    setShowSearchComponent(false);
  });

  return (
    <div className="h-full w-full flex flex-col items-start justify-between p-2 lg:p-6 rounded-lg shadow-card text-custom-black bg-white">
      <div className="flex flex-col items-center justify-between w-full space-y-4">
        <h1 className="text-lg md:text-xl lg:text-2xl font-semibold w-full">
          Subjects and Topics Selected
        </h1>

        {/* Search Box */}
        <div className="flex relative w-full">
          <div
            ref={searchRef}
            className="rounded-[24px] w-full flex items-center px-3 py-2 relative border"
            onClick={(e) => {
              e.stopPropagation();
              setShowSearchComponent(true);
            }}
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Topics..."
              className="outline-none w-[90%] placeholder:text-sm"
            />
            <IoMdSearch size={20} className="absolute right-3" />
          </div>

          {/* Dropdown Search Results */}
          {showSearchComponent && searchResults?.length > 0 && (
            <div
              ref={dropdownRef}
              className="absolute w-full top-full left-0 mt-2 z-10 bg-white shadow-card overflow-auto rounded-lg h-[250px]"
              onClick={(e) => e.stopPropagation()} // Prevent click from bubbling up
            >
              <QuizeSearchOptions
                search={search}
                setSearch={setSearch}
                searchResults={searchResults}
                setShowSearchComponent={setShowSearchComponent}
              />
            </div>
          )}
        </div>
      </div>

      {/* Selected Topics */}
      <div className="h-fit  max-h-[250px] w-[calc(100%-5px)] overflow-y-auto flex flex-wrap scrollbar overflow-x-hidden mt-4">
        {subjects?.flatMap((subject, index) =>
          subject?.selected
            ? [<QuizTag key={index} obj={subject} subjectId={subject?.id} />]
            : subject?.Subjects?.map((sub, subIndex) =>
                sub?.selected ? (
                  <QuizTag
                    key={`${index}-${subIndex}`}
                    obj={sub}
                    subjectId={subject?.id}
                    topicId={sub?.id}
                  />
                ) : null
              ) || []
        )}
      </div>
    </div>
  );
};

export default SelectedTopics;
