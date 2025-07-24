import { useDispatch, useSelector } from "react-redux";
import { extractSubjectChapterLosFromQuestion } from "../../../../../utils/common/extractSubjectChapterLosFromQuestion";

import { closeQuestionDetails } from "../../../../../redux/slices/doubt-forum/doubtForumQuestionDetails";
import {
  setSelectedPoints,
  setSelectedSubjects,
  setSelectedTopics,
} from "../../../../../redux/slices/doubt-forum/doubtForumQuestionsFilters";
import {
  filterPointsByTopic,
  filterTopicsBySubject,
} from "../../../../../redux/slices/doubt-forum/doubtForumSubjects";

const QuestionFallNumber = ({ question }) => {
  const { allSubjects, allTopics } = useSelector(
    (state) => state.doubtForumSubjects
  );
  const { selectedSubjects, selectedTopics, selectedPoints } = useSelector(
    (state) => state.doubtForumQuestionsFilters
  );

  const dispatch = useDispatch();

  const { chapter, los, subject } = extractSubjectChapterLosFromQuestion(
    question?.FallNumber?.Subject[0]
  );

  const onSubjectClick = () => {
    const selectedSubject = {
      name: subject?.name,
      value: subject?.id,
    };
    dispatch(
      filterTopicsBySubject({ subjectId: selectedSubject.value, allSubjects })
    );
    dispatch(setSelectedSubjects([...selectedSubjects, selectedSubject]));
    dispatch(closeQuestionDetails());
  };
  const onChapterClick = () => {
    const selectedTopic = {
      name: chapter?.name,
      value: chapter?.id,
    };
    dispatch(filterPointsByTopic({ topicId: selectedTopic.value, allTopics }));
    dispatch(setSelectedTopics([...selectedTopics, selectedTopic]));
    dispatch(closeQuestionDetails());
  };
  const onLosClick = () => {
    const selectedPoint = {
      name: los?.name,
      value: los?.id,
    };
    dispatch(setSelectedPoints([...selectedPoints, selectedPoint]));
    dispatch(closeQuestionDetails());
  };

  return (
    <p className="text-gray-500 font-semibold select-none text-sm">
      <span onClick={onSubjectClick} className="cursor-pointer">
        {subject?.name !== "" && subject?.name !== "empty" ? subject?.name : ""}
      </span>

      {subject !== "" && subject !== "empty" && (
        <span className="mx-3 text-highlight text-xs md:text-lg">&gt;</span>
      )}

      <span onClick={onChapterClick} className="cursor-pointer">
        {chapter?.name !== "" && chapter?.name !== "empty" ? chapter?.name : ""}
      </span>

      {chapter?.name !== "" && chapter?.name !== "empty" && (
        <span className="mx-3 text-highlight text-xs md:text-lg">&gt;</span>
      )}

      <span onClick={onLosClick} className="cursor-pointer">
        {los?.name}
      </span>
    </p>
  );
};

export default QuestionFallNumber;
