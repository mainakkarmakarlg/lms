import Button from "../../../../components/common/Button";
import Timer from "./timer/Timer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Switch from "../../../../components/common/Switch";
import {
  openConfirmSubmit,
  setReviewEnabled,
} from "../../../../redux/slices/practice-quiz/practiceQuiz";
import ConfirmSubmitPopup from "../../../../components/quizes/practice-quiz/quiz/popups/ConfirmSubmitPopup";
import Tooltip from "../../../../components/common/Tooltip";
import { useEffect } from "react";
import findCurrentQuestion from "../../../../utils/quizes/practice-quiz/findCurrentQuestion";
import formatTimeInHHMMSS from "../../../../utils/common/formatTimeInHHMMSS";

export default function PracticeTopBar() {
  const { hasSubmitted } = useSelector((state) => state.practiceQuiz);
  const { currentQuestionIdx, currentSubQuestionIdx, questions } = useSelector(
    (state) => state.questions
  );
  const currentQuestion = findCurrentQuestion(
    questions,
    currentQuestionIdx,
    currentSubQuestionIdx
  );

  // console.log("currentQuestionIdx :: ", currentQuestionIdx);
  const timeTaken = currentQuestion?.timeTaken;
  return (
    <div className="h-[60px] px-3 md:px-6 w-full flex items-center justify-between bg-[#E5E7EB] rounded-t-md ">
      <div className="flex   items-center text-slate-700">
        <Tooltip
          description={`${hasSubmitted ? "Total quiz time / each question time" : "Total quiz time"}`}
          position="bottom"
        >
          <Timer />{" "}
          {hasSubmitted && (
            <>
              &nbsp; / &nbsp;
              <EachQuestionTimeTaken timeTaken={timeTaken} />
            </>
          )}
        </Tooltip>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4 lg:space-x-12 text-xs">
        {/* Toggle Button for Review Answer */}
        <ReviewToggleButton />
        <PracticeSubmitButton />
      </div>
    </div>
  );
}

const PracticeSubmitButton = () => {
  const { hasSubmitted, showConfirmSubmit } = useSelector(
    (state) => state.practiceQuiz
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const submitQuiz = () => {
    if (!hasSubmitted) {
      dispatch(openConfirmSubmit());
    } else {
      navigate(
        `/practice-quiz/result/${params?.attemptId}/${params?.combination}/${params?.phone}`
      );
    }
  };
  return (
    <div className="relative">
      <Button onClick={submitQuiz} color="primary" size="small">
        {hasSubmitted ? "Result" : "Submit"}
      </Button>
      {showConfirmSubmit && <ConfirmSubmitPopup />}
    </div>
  );
};

const ReviewToggleButton = () => {
  const { reviewEnabled, hasSubmitted } = useSelector(
    (state) => state.practiceQuiz
  );

  const dispatch = useDispatch();

  const toggleReviewButton = () => {
    dispatch(setReviewEnabled(!reviewEnabled));
  };

  useEffect(() => {
    return () => {
      dispatch(setReviewEnabled(false));
    };
  }, [dispatch]);

  return (
    <div
      className={`${hasSubmitted ? "hidden" : "flex"} items-center space-x-2`}
    >
      <span className="text-slate-500 whitespace-nowrap">Review Answer</span>

      <Switch
        disabled={false}
        id="review-toggle"
        value={reviewEnabled}
        onClick={toggleReviewButton}
      />
    </div>
  );
};

const EachQuestionTimeTaken = ({ timeTaken, attempted }) => {
  return (
    <span className="md:text-sm text-xs mt-[2px] text-slate-700">
      {formatTimeInHHMMSS(timeTaken ? timeTaken * 1000 : attempted ? 1000 : 0)}
    </span>
  );
};
