import { useCallback, useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useResponsive } from "../../../hooks/useResponsive";
import {
  addTopicInSubject,
  updateSubject,
  updateSubjectTopics,
} from "../../../redux/slices/practice-quiz/quizSubjects";
import { setSelectedSearchId } from "../../../redux/slices/practice-quiz/searchSubjects";
import instance from "../../../utils/instance";
import CircularProgressChart from "./stats-section/CircularProgressChart";
import TopicList from "./TopicList";
import monitoringImg from "/practise-quiz/monitoring.png";
import questionIcon from "/practise-quiz/question-icon.png";
import Tooltip from "../../../components/common/Tooltip";

export default function SubjectItem({ subject, type }) {
  // const [isExpanded, setIsExpanded] = useState(false);
  const [expandedSubjects, setExpandedSubjects] = useState({});
  const { course } = useSelector((state) => state.course);
  const { accessToken } = useSelector((state) => state.user);
  const { selectedSearchId } = useSelector((state) => state.searchSubjects);
  const [selectedStatus, setSelectedStatus] = useState(false);
  // const subjectRef = useRef(null);
  const dispatch = useDispatch();
  const checkboxRef = useRef(null);
  const { isMobile, isTablet } = useResponsive();
  const isExpanded = expandedSubjects[subject.id] || false;

  useEffect(() => {
    if (subject?.Subjects?.length) {
      const selectedTopics = subject.Subjects.filter(
        (topic) => topic?.selected
      );
      const allSelected = selectedTopics.length === subject.Subjects.length;
      const noneSelected = selectedTopics.length === 0;

      setSelectedStatus(allSelected);

      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = !allSelected && !noneSelected;
      }

      if (allSelected !== subject.selected) {
        dispatch(updateSubject({ ...subject, selected: allSelected }));
      }
    }
  }, [subject, dispatch]);

  const handleSelectAll = (e) => {
    e.stopPropagation();
    const newTopics = subject?.Subjects?.map((topic) => ({
      ...topic,
      selected: true,
    }));
    setSelectedStatus(true);
    dispatch(updateSubjectTopics({ subjectId: subject.id, topics: newTopics }));
  };

  const handleUnselectAll = (e) => {
    e.stopPropagation();
    const newTopics = subject?.Subjects?.map((topic) => ({
      ...topic,
      selected: false,
    }));
    setSelectedStatus(false);
    dispatch(updateSubjectTopics({ subjectId: subject.id, topics: newTopics }));
  };
  const getTopics = useCallback(
    async (subjectId) => {
      if (!isExpanded && !subject.Subjects?.length) {
        try {
          const response = await instance.get(
            `/practice/subject?subjectId=${subjectId}&courseId=${course?.course?.id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          if (response?.data.length === 0) {
            return;
          }
          response.data = response.data.filter(
            (topic) => topic.questionCount > 0
          );
          dispatch(addTopicInSubject({ topics: response?.data, subjectId }));
        } catch (error) {
          console.error("Error fetching topics:" + error);
        }
      }
      toggleExpand(subjectId);
    },
    [isExpanded, subject.Subjects, course?.course?.id, accessToken, dispatch]
  );

  useEffect(() => {
    if (selectedSearchId === subject.id) {
      getTopics(selectedSearchId);
      dispatch(setSelectedSearchId(null));
    }
  }, [selectedSearchId, getTopics, dispatch, subject.id]);

  const toggleExpand = (subjectId) => {
    setExpandedSubjects((prev) => ({
      ...prev,
      [subjectId]: !prev[subjectId],
    }));
  };

  return (
    <div
      // ref={subjectRef}
      className={`w-full shadow-subject md:p-2 p-0 `}
      onClick={() => getTopics(subject?.id)}
    >
      <div
        className={`w-full flex justify-between items-center  cursor-pointer `}
      >
        <div className={`flex items-center  ${!type ? "w-[50%]" : "w-[80%]"}`}>
          {!type && (
            <CircularProgressChart
              length={subject?.attemptedQuestionCount}
              atempted={subject?.correctQuestionCount}
              height={isMobile ? 40 : isTablet ? 40 : 50}
              width={isMobile ? 40 : isTablet ? 40 : 50}
              textClassName={` ${isMobile || isTablet ? "text-[7px]" : "text-[10px]"}  text-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
            />
          )}
          <span
            className={`text-[10px] sm:text-xs font-semibold ${type ? "md:text-sm" : " md:text-base lg:text-xs xl:text-base "}`}
          >
            {subject?.name}
          </span>
        </div>
        <div
          className={` flex items-center  ${!type ? "justify-between w-[40%]" : "justify-end   w-[20%]"} `}
        >
          {!type && (
            <div className="w-[60%] flex space-x-2 items-center justify-between ">
              <Tooltip
                position="top"
                description={"Correct / Attempted"}
                classNames={"text-xs bg-black text-white text-center"}
              >
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <img
                    src={monitoringImg}
                    alt="monitoring"
                    className="w-[10px] md:h-[13px] lg:w-[10px] xl:w-[13px] h-[10px]  md:w-[13px] lg:h-[10px] xl:h-[13px]"
                  />
                  <p className="text-[10px] md:text-xs lg:text-[10px] xl:text-xs">
                    {subject?.correctQuestionCount}/
                    {subject?.attemptedQuestionCount}
                  </p>
                </div>
              </Tooltip>

              <Tooltip
                position="top"
                description={"Total Questions"}
                classNames={"text-xs bg-black text-white text-center"}
              >
                <div className="flex items-center space-x-1">
                  <img
                    src={questionIcon}
                    alt="questionIcon"
                    className="w-[13px] md:h-[16px] lg:w-[13px] xl:w-[16px] h-[13px] md:w-[16px] lg:h-[13px] xl:h-[16px]"
                  />
                  <p className="text-gray-500 text-[10px] md:text-xs lg:text-[10px] xl:text-xs flex">
                    {subject?.questionCount}
                  </p>
                </div>
              </Tooltip>
            </div>
          )}

          <div className="flex items-center space-x-1 w-[40%]  justify-end">
            {/* Animated Checkbox */}

            <div
              className={`transition-all duration-300 ease-in-out ${
                subject?.Subjects?.length &&
                (selectedStatus || checkboxRef.current?.indeterminate)
                  ? "opacity-100 scale-100"
                  : isExpanded
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-0 pointer-events-none"
              }`}
            >
              <input
                ref={checkboxRef}
                type="checkbox"
                onClick={(e) => e.stopPropagation()}
                checked={selectedStatus}
                onChange={selectedStatus ? handleUnselectAll : handleSelectAll}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
            {subject?.type === "subject" && (
              <button
                className="px-1 xl:px-4 py-1 text-gray-500 cursor-pointer bg-inherit outline-none text-xs md:text-sm lg:text-xs xl:text-sm "
                // onClick={() => getTopics(subject?.id)}
              >
                <FaChevronDown
                  className={`${isExpanded ? "rotate-180" : ""} transition-transform duration-300`}
                />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Topic List Section with Animation */}
      <div
        className={`overflow-hidden transition-all duration-300 ${!type ? "px-2 lg:px-4" : ""} ${
          isExpanded
            ? "max-h-[500px] opacity-100 overflow-y-auto"
            : "max-h-0 opacity-0"
        }`}
      >
        <TopicList
          subjectId={subject?.id}
          topics={subject?.Subjects}
          type={type}
        />
      </div>
    </div>
  );
}
