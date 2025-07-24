import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentQuestionIdx,
  setCurrentSubQuestionIdx,
} from "../../../../redux/slices/mock-quiz/mockQuestions";
import { FaFlag } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";

const NavigatorItemForCollapse = ({
  question,
  currentQuestionIdx,
  currentSubQuestionIdx,
  questionNumber,
}) => {
  const [collapseChildren, setCollapseChildren] = useState(false);
  const { navigatorCollapsed } = useSelector(
    (state) => state.mockQuestionNavigator
  );
  const dispatch = useDispatch();

  const handleMainClick = (questionIndexStr) => {
    const mainIdx = questionIndexStr?.split(".")[0] - 1;
    const subIdx = questionIndexStr?.split(".")[1] - 1;
    const hasChild = question?.Questions?.length > 0;
    if (!collapseChildren && hasChild) {
      setCollapseChildren(!collapseChildren);
      return;
    } else {
      dispatch(setCurrentQuestionIdx(mainIdx));
      if (subIdx) {
        dispatch(setCurrentSubQuestionIdx(subIdx));
      } else {
        setCollapseChildren(!collapseChildren);
        dispatch(setCurrentSubQuestionIdx(null));
      }
    }
  };

  const handleSubClick = (questionIndexStr) => {
    const mainIdx = questionIndexStr?.split(".")[0] - 1;
    const subIdx = questionIndexStr?.split(".")[1] - 1;
    dispatch(setCurrentQuestionIdx(mainIdx));
    if (subIdx) {
      dispatch(setCurrentSubQuestionIdx(subIdx));
    } else {
      dispatch(setCurrentSubQuestionIdx(null));
    }
  };

  const hasSubQuestions = question?.Questions?.length > 0;
  const isActive = currentQuestionIdx === questionNumber;

  return (
    <div className="w-full flex flex-col relative items-center">
      {/* Main Question */}
      {(navigatorCollapsed || !hasSubQuestions) && (
        <MainQuestionButton
          question={question}
          collapseChildren={collapseChildren}
          isActive={isActive}
          onClick={() => handleMainClick(question?.questionIndex)}
        />
      )}

      {/* Sub Questions */}
      {((navigatorCollapsed && !collapseChildren && hasSubQuestions) ||
        (!navigatorCollapsed && hasSubQuestions)) && (
        <SubQuestionGrid
          question={question}
          isActive={isActive}
          navigatorCollapsed={navigatorCollapsed}
          currentSubQuestionIdx={currentSubQuestionIdx}
          onClick={handleSubClick}
        />
      )}
    </div>
  );
};

export default NavigatorItemForCollapse;

const MainQuestionButton = ({
  question,
  isActive,
  onClick,
  collapseChildren,
}) => {
  const attempted = question?.Answers?.[0]?.optionId;
  const flagged = question?.UserFlags?.length > 0;
  const hasSubQuestions = question?.Questions?.length > 0;

  let backgroundColor = "bg-white text-gray-700";

  if (attempted || isActive) {
    backgroundColor = "bg-primary text-white";
  } else if (flagged) {
    if (isActive) {
      backgroundColor = "bg-primary text-white";
    } else {
      backgroundColor = "bg-highlight text-white";
    }
  } else if (hasSubQuestions) {
    const allSubAttempted = question.Questions.every(
      (subQ) => subQ?.Answers?.[0]?.optionId
    );
    if (allSubAttempted) {
      backgroundColor = "bg-primary text-white";
    }
  }

  const attemptedWithFlag = attempted && flagged;

  return (
    <div
      className="flex relative items-center w-[50px] cursor-pointer"
      onClick={onClick}
    >
      <span
        className={`w-full border h-[30px] ${isActive ? "rounded-md " : "rounded-md"} text-sm flex items-center justify-center ${backgroundColor}`}
      >
        {question?.questionIndex}
        {attemptedWithFlag && (
          <FaFlag className="text-xs ml-1 text-highlight" />
        )}
        {hasSubQuestions && (
          <IoMdArrowDropdown
            className={`text-base ml-1 duration-300 ${collapseChildren ? "" : "rotate-180"}`}
          />
        )}
      </span>
      {isActive && (
        <div className="absolute top-1/2 right-[-10px] transform -translate-y-1/2 w-0 h-0 border-b-[15px] border-t-[14px] border-l-[14.7px] border-l-primary border-t-transparent border-b-transparent" />
      )}
    </div>
  );
};

const SubQuestionGrid = ({
  question,
  isActive,
  navigatorCollapsed,
  currentSubQuestionIdx,
  onClick,
}) => {
  const layoutClass = navigatorCollapsed
    ? "flex flex-col items-center space-y-2 pl-2"
    : "grid grid-cols-3 gap-2 pl-3";

  return (
    <div className={`w-full h-fit mt-1 ${layoutClass}`}>
      {question.Questions.map((subQuestion, subIdx) => {
        const attempted = subQuestion?.Answers?.[0]?.optionId;
        const flagged = subQuestion?.UserFlags?.length > 0;

        let bgClass = "border border-gray-300 text-gray-700";
        if ((isActive && currentSubQuestionIdx === subIdx) || attempted) {
          bgClass = "bg-primary text-white";
        } else if (flagged) {
          bgClass = "bg-highlight text-white";
        }

        const showFlag = flagged && attempted;
        const isCurrent = isActive && currentSubQuestionIdx === subIdx;

        return (
          <div
            key={subIdx}
            className="flex relative items-center w-[50px] cursor-pointer"
            onClick={() => onClick(subQuestion?.questionIndex)}
          >
            <span
              className={`w-full h-[29px] rounded-md text-sm flex items-center justify-center ${bgClass}`}
            >
              {subQuestion?.questionIndex}
              {showFlag && <FaFlag className="text-xs ml-1 text-highlight" />}
            </span>
            {isCurrent && (
              <div className="absolute top-1/2 right-[-11px] transform -translate-y-1/2 w-0 h-0 border-b-[14px] border-t-[14px] border-l-[14px] border-l-primary border-t-transparent border-b-transparent" />
            )}
          </div>
        );
      })}
    </div>
  );
};
