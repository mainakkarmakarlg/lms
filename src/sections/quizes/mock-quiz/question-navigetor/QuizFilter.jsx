import { useDispatch, useSelector } from "react-redux";
import Switch from "../../../../components/common/Switch";
import {
  toggleAttempted,
  // toggleCorrected,
  toggleFlagged,
  // toggleInCorrected,
  toggleUnattempted,
} from "../../../../redux/slices/mock-quiz/mockQuestionNavigator";

const QuizFilter = ({ questions }) => {
  const {
    showFlagged,
    showAttempted,
    showUnattempted,
    // showCorrected,
    // showInCorrected,
  } = useSelector((state) => state.mockQuestionNavigator);
  // const { hasSubmitted } = useSelector((state) => state.mockQuestions);
  const dispatch = useDispatch();

  const toggleFlag = () => {
    dispatch(toggleFlagged({ questions }));
  };
  const toggleAttempt = () => {
    dispatch(toggleAttempted({ questions }));
  };
  const toggleUnAttempt = () => {
    dispatch(toggleUnattempted({ questions }));
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
      {/* {hasSubmitted && (
        <ResultFilters
          showInCorrected={showInCorrected}
          showCorrected={showCorrected}
        />
      )} */}
    </div>
  );
};

export default QuizFilter;

// const ResultFilters = ({ showInCorrected, showCorrected }) => {
//   const dispatch = useDispatch();

//   const toggleCorrect = () => {
//     dispatch(toggleCorrected());
//   };
//   const toggleInCorrect = () => {
//     dispatch(toggleInCorrected());
//   };

//   return (
//     <>
//       <div className="flex items-center w-full justify-between">
//         <span>Corrected</span>
//         <Switch
//           id={"corrected"}
//           onClick={toggleCorrect}
//           value={showCorrected}
//         />
//       </div>
//       <div className="flex items-center w-full justify-between">
//         <span>Incorrected</span>
//         <Switch
//           id={"inCorrected"}
//           onClick={toggleInCorrect}
//           value={showInCorrected}
//         />
//       </div>
//     </>
//   );
// };
