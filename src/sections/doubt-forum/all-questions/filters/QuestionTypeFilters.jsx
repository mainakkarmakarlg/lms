import {
  QUESTION_SORT_FILTERS,
  QUESTION_TYPE_FILTERS,
} from "../../../../constants/doubtForum";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuestionType,
  setSortOptions,
} from "../../../../redux/slices/doubt-forum/doubtForumQuestionsFilters";
import Popover from "../../../../components/common/popover/Popover";
import Lists from "../../../../components/common/lists/Lists";
import ListItem from "../../../../components/common/lists/ListItem";
import { BsFilter } from "react-icons/bs";

const QuestionTypeFilters = () => {
  const { questionType, sortOption } = useSelector(
    (state) => state?.doubtForumQuestionsFilters
  );

  const dispatch = useDispatch();

  const onChangeQuestionType = (data) => {
    dispatch(setQuestionType(data));
  };

  const onChangeSortOption = (data) => {
    dispatch(setSortOptions(data));
  };

  return (
    <div>
      <Popover
        position="bottom"
        displayComponent={
          <div className="rounded-md border w-fit px-2 py-1 lg:space-x-3 flex items-center justify-between h-[40px] bg-white">
            <span className="hidden lg:flex text-sm">Filter</span>
            <span>
              <BsFilter />
            </span>
          </div>
        }
      >
        <div className="flex flex-col">
          <div className="">
            <div className="text-sm text-gray-500 font-semibold px-[3px]">
              <span>Filters</span>
            </div>
            <Lists className="mt-2">
              {QUESTION_TYPE_FILTERS.map((filter) => (
                <ListItem
                  key={filter?.value}
                  id={filter?.value}
                  selected={questionType === filter?.value}
                  type="simple"
                  onClick={() => onChangeQuestionType(filter?.value)}
                  className="text-sm"
                >
                  {filter?.name}
                </ListItem>
              ))}
            </Lists>
          </div>

          <hr className="mt-1 mb-2" />

          <div>
            <div className="text-sm text-gray-500 font-semibold px-[3px]">
              <span>Sort By</span>
            </div>
            <Lists className="mt-2">
              {QUESTION_SORT_FILTERS.map((filter) => (
                <ListItem
                  key={filter?.value}
                  id={filter?.value}
                  selected={sortOption === filter?.value}
                  type="simple"
                  onClick={() => onChangeSortOption(filter?.value)}
                  className={"text-sm"}
                >
                  {filter?.name}
                </ListItem>
              ))}
            </Lists>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default QuestionTypeFilters;
