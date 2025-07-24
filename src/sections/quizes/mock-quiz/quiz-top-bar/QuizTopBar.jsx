import { useSelector } from "react-redux";
import Tooltip from "../../../../components/common/Tooltip";
import QuizTimer from "../../../../components/quizes/mock-quiz/QuizTimer";
import EachQuestionTimeTaken from "../../practice-quiz/quiz/EachQuestionTimeTaken";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../../components/common/Button";
// import { setReviewAnswerEnabled } from "../../../../redux/slices/mock-quiz/mockQuiz";
import { useState } from "react";
// import Switch from "../../../../components/common/Switch";
import QuizConfirmSubmitPopup from "./QuizConfirmSubmitPopup";
import PopupWrapper from "../../../../components/common/PopupWraper";

const QuizTopBar = () => {
  const { hasSubmitted } = useSelector((state) => state.mockQuestions);

  return (
    <div className="h-[60px] px-3 md:px-4 w-full flex items-center justify-between bg-[#E5E7EB] rounded-t-md ">
      <div className="hidden md:block"></div>
      <div className="flex   items-center text-slate-700">
        <Tooltip
          description={`${hasSubmitted ? "Total quiz time / each question time" : "Total quiz time"}`}
          position="bottom"
        >
          <QuizTimer hasSubmitted={hasSubmitted} />{" "}
          {hasSubmitted && (
            <>
              &nbsp; / &nbsp;
              <EachQuestionTimeTaken />
            </>
          )}
        </Tooltip>
      </div>
      <div className="flex items-center space-x-2 md:space-x-4 lg:space-x-12 text-xs">
        {/* Toggle Button for Review Answer */}
        {/* <ReviewToggleButton /> */}
        <SubmitButton />
      </div>
    </div>
  );
};

export default QuizTopBar;

const SubmitButton = () => {
  const { hasSubmitted } = useSelector((state) => state.mockQuestions);
  const { attempt } = useSelector((state) => state.mockQuizes);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const submitQuiz = () => {
    if (!hasSubmitted) {
      setShowConfirmSubmit(true);
    }
  };

  const navigateToResult = () => {
    console.log("at navigaton");
    navigate(
      `/mock-quiz/result/${params?.attemptId}/${params?.combination}/${params?.phone}`
    );
  };

  return (
    <div className="relative">
      {!hasSubmitted && (
        <Button onClick={submitQuiz} color="primary" size="small">
          Submit
        </Button>
      )}
      {attempt?.Quiz?.resultType !== "never" && hasSubmitted && (
        <div>
          <Button onClick={navigateToResult} color="primary" size="small">
            Result
          </Button>
        </div>
      )}
      {showConfirmSubmit && (
        <PopupWrapper
          onClose={() => setShowConfirmSubmit(false)}
          direction="bottom"
        >
          <QuizConfirmSubmitPopup />
        </PopupWrapper>
      )}
    </div>
  );
};

// const ReviewToggleButton = () => {
//   const { reviewAnswerEnabled } = useSelector((state) => state.mockQuizes);
//   const hasSubmitted = false; // Replace with actual state

//   const dispatch = useDispatch();

//   const toggleReviewButton = () => {
//     dispatch(setReviewAnswerEnabled(!reviewAnswerEnabled));
//   };

//   useEffect(() => {
//     return () => {
//       dispatch(setReviewAnswerEnabled(false));
//     };
//   }, [dispatch]);

//   return (
//     <div
//       className={`${hasSubmitted ? "hidden" : "flex"} items-center space-x-2`}
//     >
//       <span className="text-slate-500 whitespace-nowrap">Review Answer</span>

//       <Switch
//         disabled={false}
//         id="review-toggle"
//         value={reviewAnswerEnabled}
//         onClick={toggleReviewButton}
//       />
//     </div>
//   );
// };
