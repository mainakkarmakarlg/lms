import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentQuestionIdx,
  setCurrentSubQuestionIdx,
} from "../../../../redux/slices/practice-quiz/questions";
import { IoIosArrowForward } from "react-icons/io";
import {
  toggleAttempted,
  toggleCorrected,
  toggleFlagged,
  toggleInCorrected,
  toggleQuestionNavigator,
  toggleUnattempted,
} from "../../../../redux/slices/practice-quiz/questionNavigator";
import Switch from "../../../common/Switch";
import { twMerge } from "tailwind-merge";
import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function PracticeQuestionNavigator({ type }) {
  const { hasSubmitted } = useSelector((state) => state.practiceQuiz);

  const { navigatorCollapsed, filteredQuestions } = useSelector(
    (state) => state.questionNavigator
  );

  return (
    <div
      className={`w-full  space-y-3 h-full  ${type ? "border-0" : "border-r border-r-slate-300"}`}
    >
      {!navigatorCollapsed && type !== "mobile" && (
        <div
          className={`${hasSubmitted ? "h-[180px]" : "h-[110px]"} flex flex-col w-full px-3 pt-6`}
        >
          <Filters />
        </div>
      )}

      {!navigatorCollapsed && type !== "mobile" && <hr className="my-3" />}

      <div
        className={twMerge(
          "w-full  flex py-4 overflow-y-scroll",
          navigatorCollapsed
            ? type === "mobile"
              ? "flex flex-row space-x-3 items-center h-[60px] overflow-x-scroll"
              : "flex-col px-3 items-center space-x-0 h-full space-y-2"
            : type === "mobile"
              ? ""
              : `flex-row flex-wrap space-y-2 space-x-4 justify-start items-start h-fit ${hasSubmitted ? "max-h-[calc(100%-210px)]" : "max-h-[calc(100%-134px)]"}`
        )}
      >
        {!type && <ToggleButton />}
        {type && <div></div>}

        {filteredQuestions?.map((question, idx) => (
          <div key={question?.Question?.id}>
            <EachNavigatorItem
              question={question}
              key={question?.Question?.id}
              questionNumber={idx}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// const EachNavigatorItem = ({ question }) => {
//   const { currentQuestionIdx, questions } = useSelector(
//     (state) => state.questions
//   );
//   const { flaggedQuestions } = useSelector((state) => state.questionNavigator);

//   const questionId = question?.Question?.id;
//   const questionNumber = questions?.findIndex(
//     (q) => String(q?.Question?.id) === String(questionId)
//   );
//   const itemRef = useRef(null);
//   const isSelected = String(currentQuestionIdx) === String(questionNumber);
//   const isAttempted = question?.optionId ? true : false;
//   const isFlagged = flaggedQuestions?.find(
//     (q) => String(q.questionId) === String(questionId)
//   )?.questionId
//     ? true
//     : false;

//   useEffect(() => {
//     if (isSelected && itemRef.current) {
//       itemRef.current.scrollIntoView({
//         behavior: "smooth",
//         block: "nearest",
//         inline: "center",
//       });
//     }
//   }, [isSelected]);

//   const dispatch = useDispatch();
//   const setCurrentIdx = () => {
//     dispatch(setCurrentQuestionIdx(questionNumber));
//   };

//   let classes = "bg-white border border-slate-300 text-slate-700";

//   if (isSelected) {
//     classes = "bg-primary text-white border border-primary";
//   } else if (isAttempted) {
//     classes = "bg-primary text-white border border-primary";
//   }

//   if (isFlagged) {
//     classes = "bg-highlight text-white border border-highlight";
//   }

//   return (
//     <div className="flex relative w-[50px]" ref={itemRef}>
//       <button
//         onClick={setCurrentIdx}
//         className={`w-full h-[29px] rounded-md text-sm flex items-center justify-center ${classes}`}
//       >
//         {questionNumber + 1}
//       </button>
//       {/* create a triangle */}
//       {isSelected && !isFlagged && (
//         <div className="absolute top-0 right-[-11px] w-0 h-0 border-b-[15px]  border-t-[15px] border-l-[15px] border-l-primary border-t-transparent border-b-transparent"></div>
//       )}
//       {isSelected && isFlagged && (
//         <div className="absolute top-0 right-[-11px] w-0 h-0 border-b-[15px]  border-t-[15px] border-l-[15px] border-l-highlight border-t-transparent border-b-transparent"></div>
//       )}
//     </div>
//   );
// };

const ToggleButton = () => {
  const { navigatorCollapsed } = useSelector(
    (state) => state.questionNavigator
  );
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch(toggleQuestionNavigator());
  };
  return (
    <div
      onClick={toggle}
      className={`bg-white absolute z-10 top-[10px] p-[3px] border border-slate-400 rounded-full cursor-pointer hover:bg-gray-200 duration-300 ${navigatorCollapsed ? "left-20" : "left-[210px]"}`}
    >
      <IoIosArrowForward
        size={10}
        className={`${navigatorCollapsed ? "rotate-0" : "rotate-180"} text-slate-400 duration-300`}
      />
    </div>
  );
};

const Filters = () => {
  const { showFlagged, showAttempted, showUnattempted } = useSelector(
    (state) => state.questionNavigator
  );
  const { result } = useSelector((state) => state.result);

  const { hasSubmitted } = useSelector((state) => state.practiceQuiz);

  const dispatch = useDispatch();

  const toggleFlag = () => {
    dispatch(toggleFlagged(result));
  };

  const toggleAttempt = () => {
    dispatch(toggleAttempted(result));
  };

  const toggleUnAttempt = () => {
    dispatch(toggleUnattempted(result));
  };

  return (
    <div className="flex flex-col space-y-2 w-full">
      <div className="flex items-center w-full justify-between">
        <span>Flagged</span>
        <Switch
          disabled={false}
          id={"flagged"}
          onClick={toggleFlag}
          value={showFlagged}
        />
      </div>

      <div className="flex items-center w-full justify-between">
        <span>Attempted</span>

        <Switch
          id={"attempted"}
          disabled={showUnattempted}
          onClick={toggleAttempt}
          value={showAttempted}
        />
      </div>

      <div className="flex items-center w-full justify-between">
        <span>Unattempted</span>

        <Switch
          id={"unAttempted"}
          disabled={showAttempted}
          onClick={toggleUnAttempt}
          value={showUnattempted}
        />
      </div>

      {hasSubmitted && <ResultFilters />}
    </div>
  );
};

const ResultFilters = () => {
  const { result } = useSelector((state) => state.result);

  const { showCorrected, showInCorrected } = useSelector(
    (state) => state.questionNavigator
  );

  const dispatch = useDispatch();

  const toggleCorrect = () => {
    dispatch(toggleCorrected(result));
  };

  const toggleIncorrect = () => {
    dispatch(toggleInCorrected(result));
  };

  return (
    <>
      <div className="flex items-center w-full justify-between">
        <span>Correct</span>

        <Switch
          id={"corrected"}
          disabled={showInCorrected}
          onClick={toggleCorrect}
          value={showCorrected}
        />
      </div>

      <div className="flex items-center w-full justify-between">
        <span>Incorrect</span>

        <Switch
          id={"incorrected"}
          disabled={showCorrected}
          onClick={toggleIncorrect}
          value={showInCorrected}
        />
      </div>
    </>
  );
};

// const EachNavigatorItem = ({ question }) => {
//   const dispatch = useDispatch();
//   const { currentQuestionIdx, currentSubQuestionIdx } = useSelector(
//     (state) => state.questions
//   );
//   const { flaggedQuestions } = useSelector((state) => state.questionNavigator);

//   const questionId = question?.Question?.id;
//   const questionIndex = question?.questionIndex;
//   const isChild = questionIndex?.includes(".");

//   const [parentIdx, subIdx] = isChild
//     ? questionIndex.split(".").map(Number)
//     : [Number(questionIndex), null];

//   const itemRef = useRef(null);

//   const isSelected = isChild
//     ? currentQuestionIdx === parentIdx - 1 &&
//       currentSubQuestionIdx === subIdx - 1
//     : currentQuestionIdx === parentIdx - 1 && currentSubQuestionIdx == null;

//   const isFlagged = flaggedQuestions?.some(
//     (q) => String(q.questionId) === String(questionId)
//   );

//   const isAttempted = question?.optionId ? true : false;

//   const isParent =
//     Array.isArray(question.Questions) && question.Questions.length > 0;

//   // ✅ Parent should appear selected if a child is selected
//   const isParentSelected =
//     isParent &&
//     currentQuestionIdx === parentIdx - 1 &&
//     currentSubQuestionIdx != null;

//   // ✅ Parent is considered fully attempted if all children are attempted
//   const allChildrenAttempted =
//     isParent && question.Questions.every((child) => child?.optionId != null);

//   useEffect(() => {
//     if ((isSelected || isParentSelected) && itemRef.current) {
//       itemRef.current.scrollIntoView({
//         behavior: "smooth",
//         block: "nearest",
//         inline: "center",
//       });
//     }
//   }, [isSelected, isParentSelected]);

//   const setCurrentIdx = () => {
//     dispatch(setCurrentQuestionIdx(parentIdx - 1));
//     if (subIdx != null) {
//       dispatch(setCurrentSubQuestionIdx(subIdx - 1));
//     } else {
//       dispatch(setCurrentSubQuestionIdx(null));
//     }
//   };

//   let classes = "bg-white border border-slate-300 text-slate-700";

//   if (isSelected || isParentSelected) {
//     classes = "bg-primary text-white border border-primary";
//   } else if (isAttempted || allChildrenAttempted) {
//     classes = "bg-primary text-white border border-primary";
//   }

//   if (isFlagged) {
//     classes = "bg-highlight text-white border border-highlight";
//   }

//   return (
//     <div className="flex flex-col items-start" ref={itemRef}>
//       <div className="flex relative w-[50px] mb-1">
//         <button
//           onClick={setCurrentIdx}
//           className={`w-full h-[29px] rounded-md text-sm flex items-center justify-center ${classes}`}
//         >
//           {questionIndex}
//         </button>

//         {/* Triangle Indicator */}
//         {(isSelected || isParentSelected) && !isFlagged && (
//           <div className="absolute top-0 right-[-11px] w-0 h-0 border-b-[15px] border-t-[15px] border-l-[15px] border-l-primary border-t-transparent border-b-transparent"></div>
//         )}
//         {(isSelected || isParentSelected) && isFlagged && (
//           <div className="absolute top-0 right-[-11px] w-0 h-0 border-b-[15px] border-t-[15px] border-l-[15px] border-l-highlight border-t-transparent border-b-transparent"></div>
//         )}
//       </div>

//       {/* 🔁 Recursively render child questions if available */}
//       {isParent &&
//         question.Questions.map((child) => (
//           <div key={child.Question.id} className="ml-4">
//             <EachNavigatorItem question={child} />
//           </div>
//         ))}
//     </div>
//   );
// };

const EachNavigatorItem = ({ question }) => {
  const dispatch = useDispatch();
  const { currentQuestionIdx, currentSubQuestionIdx } = useSelector(
    (state) => state.questions
  );
  const { flaggedQuestions } = useSelector((state) => state.questionNavigator);

  const questionId = question?.Question?.id;
  const questionIndex = question?.questionIndex;
  const isChild = questionIndex?.includes(".");

  const [parentIdx, subIdx] = isChild
    ? questionIndex.split(".").map(Number)
    : [Number(questionIndex), null];

  const itemRef = useRef(null);

  const isSelected = isChild
    ? currentQuestionIdx === parentIdx - 1 &&
      currentSubQuestionIdx === subIdx - 1
    : currentQuestionIdx === parentIdx - 1 && currentSubQuestionIdx == null;

  const isFlagged = flaggedQuestions?.some(
    (q) => String(q.questionId) === String(questionId)
  );

  const isAttempted = question?.optionId ? true : false;
  // console.log("question in navigator", question);

  const isParent =
    Array.isArray(question.Questions) && question.Questions.length > 0;

  const isParentSelected =
    isParent &&
    currentQuestionIdx === parentIdx - 1 &&
    currentSubQuestionIdx != null;

  const allChildrenAttempted =
    isParent && question.Questions.every((child) => child?.optionId != null);

  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    if ((isSelected || isParentSelected) && itemRef.current) {
      itemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [isSelected, isParentSelected]);

  const toggleExpanded = () => {
    if (!isExpanded && isParent) {
      const firstChild = question.Questions[0];
      const childIndex = firstChild.questionIndex?.split(".").map(Number);
      if (childIndex && childIndex.length === 2) {
        dispatch(setCurrentQuestionIdx(childIndex[0] - 1));
        dispatch(setCurrentSubQuestionIdx(childIndex[1] - 1));
      }
    }
    setIsExpanded((prev) => !prev);
  };

  const setCurrentIdx = () => {
    if (isParent) {
      toggleExpanded();
      return;
    }

    dispatch(setCurrentQuestionIdx(parentIdx - 1));
    if (subIdx != null) {
      dispatch(setCurrentSubQuestionIdx(subIdx - 1));
    } else {
      dispatch(setCurrentSubQuestionIdx(null));
    }
  };

  let classes = "bg-white border border-slate-300 text-slate-700";

  if (isSelected || isParentSelected) {
    classes = "bg-primary text-white border border-primary";
  } else if (isAttempted || allChildrenAttempted) {
    classes = "bg-primary text-white border border-primary";
  }

  if (isFlagged) {
    classes = "bg-highlight text-white border border-highlight";
  }

  return (
    <div className="flex flex-col items-start" ref={itemRef}>
      <div
        className={`flex relative w-[50px] mb-1 ${
          isParent && isExpanded && "ml-1"
        }`}
      >
        <button
          onClick={setCurrentIdx}
          className={`w-full h-[29px] rounded-md text-sm flex items-center justify-center ${classes}`}
        >
          {questionIndex}
          {isParent && (
            <span className="ml-1">
              <FiChevronDown
                className={`text-xs duration-300 ${isExpanded ? "rotate-180" : ""}`}
              />
            </span>
          )}
        </button>

        {(isSelected || isParentSelected) && !isFlagged && (
          <div className="absolute top-0 right-[-11px] w-0 h-0 border-b-[14px] border-t-[15px] border-l-[15px] border-l-primary border-t-transparent border-b-transparent"></div>
        )}
        {(isSelected || isParentSelected) && isFlagged && (
          <div className="absolute top-0 right-[-11px] w-0 h-0 border-b-[15px] border-t-[15px] border-l-[15px] border-l-highlight border-t-transparent border-b-transparent"></div>
        )}
      </div>

      {isParent &&
        isExpanded &&
        question.Questions.map((child) => (
          <div key={child?.Question?.id} className="ml-2 mt-2">
            <EachNavigatorItem question={child} />
          </div>
        ))}
    </div>
  );
};
