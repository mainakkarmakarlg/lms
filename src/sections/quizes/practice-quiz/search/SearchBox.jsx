import { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterSubjects from "./FilterSubjects";
import searchIcon from "/practise-quiz/search-icon.png";
import { getData } from "../../../../apiCalls/getData";
import {
  setSearchResults,
  setSelectedSearchId,
} from "../../../../redux/slices/practice-quiz/searchSubjects";
import useOutsideClick from "../../../../hooks/useOutside";

const SearchBox = () => {
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("all");
  const { searchResults } = useSelector((state) => state.searchSubjects);
  const { accessToken } = useSelector((state) => state.user);
  // const { subjects } = useSelector((state) => state.quizSubjects);
  const { course } = useSelector((state) => state.course);
  const searchRef = useRef();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dispatch = useDispatch();

  useOutsideClick(searchRef, () => {
    if (isFilterOpen) {
      setIsFilterOpen(false);
    }
  });

  // Debounce function
  const debounce = (fn, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  // Memoized API call with debouncing
  const fetchSubjects = useCallback(
    debounce(async (query) => {
      setIsFilterOpen(true);
      try {
        const response = await getData(
          `practice/searchsubject?courseId=${course?.course?.id}&searchString=${query}`,
          accessToken
        );
        const filterdData = response?.data?.filter((item) => {
          if (searchType === "all") {
            return item;
          } else if (searchType === "subject") {
            return item.type === "subject";
          } else if (searchType === "chapter") {
            return item.type === "chapter";
          }
        });

        dispatch(setSearchResults(filterdData));
      } catch (error) {
        setIsFilterOpen(false);
        console.error("Error fetching subjects:", error);
      }
    }, 500), // Debounce delay of 500ms
    [dispatch, searchType, accessToken, search]
  );

  // Call debounced API when search changes
  useEffect(() => {
    if (search.trim() !== "") {
      fetchSubjects(search);
    }
  }, [search]);

  const handleResultClick = (subject) => {
    const subjectId =
      subject?.type === "chapter" ? subject.subjectId : subject.id;
    dispatch(setSelectedSearchId(subjectId));
    setSearch("");
    setIsFilterOpen(false);
  };

  return (
    <div className="w-full py-2 border border-gray-200 rounded-md relative  bg-white">
      <div className="w-full flex items-center">
        <div className="w-[90%] flex justify-start items-center px-2 lg:px-6">
          <img
            src={searchIcon}
            alt="search"
            className="w-[10px] h-[10px] lg:w-[20px] lg:h-[20px]"
          />
          <input
            type="text"
            className="px-2 lg:pl-4 w-[80%] outline-none mr-1"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-fit flex justify-end items-center lg:px-6">
          <FilterSubjects
            searchType={searchType}
            setSearchType={setSearchType}
          />
        </div>
      </div>
      {searchResults?.length > 0 && isFilterOpen && (
        <div
          ref={searchRef}
          className="w-full flex flex-col space-y-2 absolute top-[100%] bg-gray-50 z-10 shadow-lg mt-2 overflow-y-auto max-h-[400px] border border-gray-200 p-2 rounded-md"
        >
          {searchResults?.map((subject) => (
            <div
              onClick={() => {
                handleResultClick(subject);
              }}
              key={subject?.id}
              className="w-full flex items-center justify-start px-4 py-2 shadow-subject rounded-md cursor-pointer bg-white"
            >
              <p className="text-sm text-custom-black">{subject?.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
