import EachOption from "../../../../../components/common/select/EachOption";
import Select from "../../../../../components/common/select/Select";
import { useDispatch, useSelector } from "react-redux";
import { setAnswerSortOption } from "../../../../../redux/slices/doubt-forum/doubtForumQuestionDetailsAnswer";
import { ANSWER_SORT_FILTERS } from "../../../../../constants/doubtForum";

const AnswersHeaderAndFilter = ({ question }) => {
  const { answerSortOption } = useSelector(
    (state) => state.doubtForumQuestionDetailsAnswer
  );

  const dispatch = useDispatch();

  const changeSortType = (data) => {
    dispatch(setAnswerSortOption(data));
  };

  return (
    <div
      id="answers-heading"
      className="w-full px-5 flex justify-between items-center h-[50px]"
    >
      <h4 className="text-xl font-semibold">Answers</h4>
      <Select
        id={`answer-type-filter-${question?.id}`}
        className={"w-[150px]"}
        value={answerSortOption}
        onChange={changeSortType}
        width="100%"
      >
        {ANSWER_SORT_FILTERS?.map((filterType) => (
          <EachOption
            key={filterType?.value}
            name={filterType?.name}
            value={filterType?.value}
          />
        ))}
      </Select>
    </div>
  );
};

export default AnswersHeaderAndFilter;
