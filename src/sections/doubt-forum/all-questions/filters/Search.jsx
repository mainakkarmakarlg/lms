import { FiSearch } from "react-icons/fi";
import Switch from "../../../../components/common/Switch";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchText,
  setSearchType,
} from "../../../../redux/slices/doubt-forum/doubtForumQuestionsFilters";
import { useState } from "react";
import useDebounce from "../../../../hooks/useDebounce";
import {
  openQuestionDetails,
  setSelectedQuestion,
} from "../../../../redux/slices/doubt-forum/doubtForumQuestionDetails";
import { twMerge } from "tailwind-merge";

const Search = () => {
  const { searchType } = useSelector(
    (state) => state.doubtForumQuestionsFilters
  );

  const [searchTextLocal, setSearchTextLocal] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const debouncedSearch = useDebounce((value) => {
    dispatch(setSearchText(value));
  }, 300);

  const handleChange = (e) => {
    setSearchTextLocal(e.target.value);
    if (searchType === "by-doubt-number") {
      const divisions = e.target.value?.split("/");
      const questionId = Number(divisions?.[divisions?.length - 1]);
      if (divisions?.length > 5) {
        setError("");
        const data = {
          questionId: Number(questionId),
        };
        dispatch(setSelectedQuestion(data));
        dispatch(openQuestionDetails());
      } else {
        setError("Please enter a valid doubt number");
        return;
      }
    } else {
      debouncedSearch(e.target.value);
    }
  };

  return (
    <div
      className={twMerge(
        "flex items-center justify-between border bg-white py-[6px] rounded-md w-full px-3",
        error ? "border-red-500" : "border-[#D5D7DA]"
      )}
    >
      <div className="w-full flex items-center space-x-2">
        <div>
          <span className="text-xl">
            <FiSearch />
          </span>
        </div>

        <div className="w-full">
          <input
            type="text"
            placeholder={
              searchType === "by-doubt-number"
                ? "Search by doubt"
                : "Search by question"
            }
            className="w-full outline-none"
            value={searchTextLocal}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="w-[1px] h-full bg-[#D5D7DA]"></div>

      <SearchTypeToggle />
    </div>
  );
};

export default Search;

const SearchTypeToggle = () => {
  const { searchType } = useSelector(
    (state) => state.doubtForumQuestionsFilters
  );

  const dispatch = useDispatch();

  const changeSearchType = () => {
    if (searchType === "by-question") {
      dispatch(setSearchType("by-doubt-number"));
    } else {
      dispatch(setSearchType("by-question"));
    }
  };

  return (
    <div className="w-fit text-gray-400 text-sm whitespace-nowrap flex space-x-3 items-center">
      <Switch
        value={searchType === "by-doubt-number"}
        onClick={changeSearchType}
      />
    </div>
  );
};
