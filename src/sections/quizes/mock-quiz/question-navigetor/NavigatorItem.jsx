import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentQuestionIdx,
  setCurrentSubQuestionIdx,
} from "../../../../redux/slices/mock-quiz/mockQuestions";
import { FaFlag } from "react-icons/fa6";

const NavigatorItem = ({ question, currentIndexStr }) => {
  const { navigatorCollapsed } = useSelector(
    (state) => state.mockQuestionNavigator
  );
  const dispatch = useDispatch();

  const handleMainClick = () => {
    const [mainStr, subStr] = question?.questionIndex?.split(".") || [];
    const mainIdx = parseInt(mainStr) - 1;
    const subIdx = subStr ? parseInt(subStr) - 1 : null;

    dispatch(setCurrentQuestionIdx(mainIdx));
    dispatch(setCurrentSubQuestionIdx(subIdx));
  };

  const handleSubClick = (subIndexStr) => {
    const [mainStr, subStr] = subIndexStr.split(".");
    const mainIdx = parseInt(mainStr) - 1;
    const subIdx = subStr ? parseInt(subStr) - 1 : null;

    dispatch(setCurrentQuestionIdx(mainIdx));
    dispatch(setCurrentSubQuestionIdx(subIdx));
  };

  const hasSubQuestions = question?.Questions?.length > 0;
  const isActive = currentIndexStr === question?.questionIndex;

  return (
    <div className="flex flex-col relative items-start w-full">
      {(navigatorCollapsed || !hasSubQuestions) && (
        <MainQuestionButton
          question={question}
          isActive={isActive}
          onClick={handleMainClick}
        />
      )}

      {((navigatorCollapsed && isActive && hasSubQuestions) ||
        (!navigatorCollapsed && hasSubQuestions)) && (
        <SubQuestionGrid
          question={question}
          currentIndexStr={currentIndexStr}
          navigatorCollapsed={navigatorCollapsed}
          onClick={handleSubClick}
        />
      )}
    </div>
  );
};

export default NavigatorItem;

const MainQuestionButton = ({ question, isActive, onClick }) => {
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
        className={`w-full border h-[30px] rounded-md text-sm flex items-center justify-center ${backgroundColor}`}
      >
        {question?.questionIndex}
        {attemptedWithFlag && (
          <FaFlag className="text-xs ml-1 text-highlight" />
        )}
      </span>
      {isActive && (
        <div className="absolute top-1/2 right-[-10px] transform -translate-y-1/2 w-0 h-0 border-b-[15px] border-t-[14px] border-l-[14px] border-l-primary border-t-transparent border-b-transparent" />
      )}
    </div>
  );
};

const SubQuestionGrid = ({
  question,
  currentIndexStr,
  navigatorCollapsed,
  onClick,
}) => {
  const layoutClass = navigatorCollapsed
    ? "flex flex-col space-y-2 pl-2"
    : "grid grid-cols-3 gap-2 pl-3";

  return (
    <div className={`w-full h-fit mt-1 ${layoutClass}`}>
      {question.Questions.map((subQuestion, subIdx) => {
        const attempted = subQuestion?.Answers?.[0]?.optionId;
        const flagged = subQuestion?.UserFlags?.length > 0;

        const isCurrent = subQuestion?.questionIndex === currentIndexStr;

        let bgClass = "border border-gray-300 text-gray-700";
        if (isCurrent || attempted) {
          bgClass = "bg-primary text-white";
        } else if (flagged) {
          bgClass = "bg-highlight text-white";
        }

        const showFlag = flagged && attempted;

        return (
          <div
            key={subIdx}
            className="flex relative items-center w-[50px] cursor-pointer"
            onClick={() => onClick(subQuestion?.questionIndex)}
          >
            <span
              className={`w-full h-[30px] rounded-md text-sm flex items-center justify-center ${bgClass}`}
            >
              {subQuestion?.questionIndex}
              {showFlag && <FaFlag className="text-xs ml-1 text-highlight" />}
            </span>
            {isCurrent && (
              <div className="absolute top-1/2 right-[-10px] transform -translate-y-1/2 w-0 h-0 border-b-[10px] border-t-[14px] border-l-[11px] border-l-primary border-t-transparent border-b-transparent" />
            )}
          </div>
        );
      })}
    </div>
  );
};
