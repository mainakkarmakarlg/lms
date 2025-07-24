import { useEffect, useState } from "react";
import CircularProgressChart from "./stats-section/CircularProgressChart";
import { useDispatch } from "react-redux";
import { updateTopic } from "../../../redux/slices/practice-quiz/quizSubjects";
import monitoringImg from "/practise-quiz/monitoring.png";
import questionIcon from "/practise-quiz/question-icon.png";
import { useResponsive } from "../../../hooks/useResponsive";
import Tooltip from "../../../components/common/Tooltip";

export default function TopicItem({ topic, subjectId, index, type }) {
  const [isChecked, setIsChecked] = useState(topic.selected);
  const dispatch = useDispatch();
  const { isMobile, isTablet } = useResponsive();
  useEffect(() => {
    setIsChecked(topic.selected);
    // topic.selected = isChecked;
  }, [topic]);
  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    setIsChecked(!isChecked);
    dispatch(
      updateTopic({
        subjectId,
        topicId: topic.id,
        topic: {
          ...topic,
          selected: !isChecked,
        },
      })
    );
  };

  return (
    <label
      htmlFor={topic.id}
      onClick={(e) => e.stopPropagation()}
      className={`w-full flex items-center justify-between  ${index !== 0 && "border-t border-gray-200"} py-2  `}
    >
      <div
        className={`flex items-center space-x-2 ${type ? "w-[80%]" : "w-[58%] "}`}
      >
        {!type && (
          <CircularProgressChart
            length={topic?.attemptedQuestionCount}
            atempted={topic?.correctQuestionCount}
            height={isMobile ? 40 : isTablet ? 40 : 50}
            width={isMobile ? 40 : isTablet ? 40 : 50}
            textClassName={` ${isMobile || isTablet ? "text-[7px]" : "text-[10px]"}  text-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
          />
        )}
        {/* < className="text-sm cursor-pointer"> */}
        <span
          className={`text-[10px] sm:text-xs font-semibold ${type ? "md:text-sm" : " md:text-base lg:text-xs xl:text-base "}`}
        >
          {topic.name}
        </span>
        {/* </label> */}
      </div>

      <div
        className={` flex space-x-2 items-center ${type ? "justify-end w-[20%]" : "justify-between w-[39%]"} `}
      >
        {!type && (
          <div className="w-[65%] flex items-center justify-between space-x-2 text-gray-500">
            <Tooltip
              position="top"
              description={"Correct / Attempted"}
              classNames={
                "text-xs bg-black text-white text-center cursor-pointer"
              }
            >
              <div className="flex items-center space-x-1 lg:space-x-2">
                <img
                  src={monitoringImg}
                  alt="monitoring"
                  className="w-[10px] md:h-[13px] lg:w-[10px] xl:w-[13px] h-[10px]  md:w-[13px] lg:h-[10px] xl:h-[13px]"
                />
                <p className="text-[10px] md:text-xs lg:text-[10px] xl:text-xs">
                  {topic?.correctQuestionCount}/{topic?.attemptedQuestionCount}
                </p>
              </div>
            </Tooltip>
            <Tooltip
              position="top"
              description={"Total Questions"}
              classNames={
                "text-xs bg-black text-white text-center cursor-pointer"
              }
            >
              <div className="flex items-center space-x-1 lg:space-x-2">
                <img
                  src={questionIcon}
                  alt="questionIcon"
                  className="w-[13px] md:h-[16px] lg:w-[13px] xl:w-[16px] h-[13px] md:w-[16px] lg:h-[13px] xl:h-[16px]"
                />
                <p className="text-gray-500 text-[10px] md:text-xs lg:text-[10px] xl:text-xs flex">
                  {topic?.questionCount}
                </p>
              </div>
            </Tooltip>
          </div>
        )}
        <input
          id={topic.id}
          type="checkbox"
          onClick={(e) => e.stopPropagation()}
          checked={isChecked}
          className="cursor-pointer"
          onChange={handleCheckboxChange}
        />
      </div>
    </label>
  );
}
