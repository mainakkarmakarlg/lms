import { MdReport } from "react-icons/md";
import Button from "../../../../components/common/Button";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  addInAnswers,
  addInSubmittedQuestions,
  decrementCurrentQuestionIdx,
  incrementCurrentQuestionIdx,
  setSelectedOption,
  updateCurrentQuestion,
} from "../../../../redux/slices/practice-quiz/questions";
import { getSocket } from "../../../../utils/socket";
import ReportQuestionPopup from "./popups/ReportQuestion";
import { openReportPopup } from "../../../../redux/slices/practice-quiz/reportQuestion";
import { useEffect } from "react";
import findCurrentQuestion from "../../../../utils/quizes/practice-quiz/findCurrentQuestion";
import { useResponsive } from "../../../../hooks/useResponsive";
import { CgMenuGridO } from "react-icons/cg";
import { toggleQuestionNavigator } from "../../../../redux/slices/practice-quiz/questionNavigator";
import { useParams } from "react-router-dom";

export default function BottomBar() {
  const { reviewEnabled } = useSelector((state) => state.practiceQuiz);
  const { hasSubmitted } = useSelector((state) => state.practiceQuiz);
  const params = useParams();
  const { reportedQuestions, showReportPopup } = useSelector(
    (state) => state.reportQuestion
  );
  const { isMobile } = useResponsive();
  const {
    questions,
    selectedOption,
    answers,
    currentQuestionIdx,
    currentSubQuestionIdx,
  } = useSelector((state) => state.questions);

  const currentQuestion = findCurrentQuestion(
    questions,
    currentQuestionIdx,
    currentSubQuestionIdx
  );

  const isReported = reportedQuestions?.includes(currentQuestion?.Question?.id);

  console.log("selectedOption", selectedOption);

  const dispatch = useDispatch();
  const socket = getSocket();

  const incrementQuestion = () => {
    dispatch(incrementCurrentQuestionIdx());
  };

  const decrementQuestion = () => {
    dispatch(decrementCurrentQuestionIdx());
  };

  const verifyAnswer = () => {
    getAnswer();

    dispatch(setSelectedOption(null));
  };

  const getAnswer = () => {
    const questionId = currentQuestion?.Question?.id;
    // console.log("getAnswer called for questionId:", questionId);
    const answerExists = answers?.find(
      (answer) => answer.questionId === questionId
    );
    if (answerExists) {
      console.log("Answer already exists for questionId:", questionId);
      return;
    }

    socket?.emit("get-practice-question-explaination", { questionId });

    socket?.on("get-practice-question-explaination-success", (data) => {
      console.log("data", data);
      const option = data?.Option?.find(
        (option) => option.RightOption !== null
      );

      if (option) {
        const newUpdatedCurrentQuestion = {
          ...currentQuestion,
          Question: {
            ...currentQuestion.Question,
            Option: data?.Option,
          },
          // optionId: option?.RightOption?.optionId,
          hasSubmitted: true,
        };
        dispatch(updateCurrentQuestion(newUpdatedCurrentQuestion));
        const answer = {
          questionId: questionId,
          answer: option?.RightOption?.optionId,
          explanation: data?.Explaination,
          Option: data?.Option,
        };
        dispatch(addInAnswers(answer));
        dispatch(addInSubmittedQuestions(questionId));
      }
    });
  };

  const openReport = () => {
    dispatch(openReportPopup());
  };

  const openQuestionNavigator = () => {
    // setShowFullQuestionNavigator(true);
    dispatch(toggleQuestionNavigator());
  };

  useEffect(() => {
    if (
      (currentQuestion?.hasSubmitted && currentQuestion?.optionId) ||
      hasSubmitted
    ) {
      socket?.on("watch-practice-question-success", () => {
        getAnswer();
      });
    }
  }, [currentQuestionIdx, currentSubQuestionIdx, dispatch]);

  useEffect(() => {
    console.log("selectedOption changed", selectedOption);
    dispatch(setSelectedOption(null));
  }, [currentQuestionIdx, currentSubQuestionIdx, dispatch]);

  return (
    <div className="w-full flex items-center justify-between px-3 md:px-6 h-[60px]">
      <div className="flex items-center justify-between space-x-2">
        <div>
          {!isReported &&
            Number(currentQuestion?.attemptId) ===
              Number(params?.attemptId) && (
              <Button
                startIcon={<MdReport />}
                color="danger"
                size="small"
                onClick={openReport}
              >
                {!isMobile && "Report"}
              </Button>
            )}
        </div>

        {isMobile && (
          <Button
            onClick={openQuestionNavigator}
            size="small"
            variant="outlined"
            startIcon={<CgMenuGridO />}
            //   className={`bg-white text-xl border  rounded-full cursor-pointer border-primary duration-300 px-3 py-1`}
          >
            {/* <CgMenuGridO className={`text-primary duration-300`} /> */}
          </Button>
        )}
      </div>
      {/* currentQuestion?.optionId &&
      !currentQuestion?.hasSubmitted && */}
      {/* selectedOption?.answer */}
      {reviewEnabled &&
      currentQuestion?.optionId &&
      !currentQuestion?.hasSubmitted ? (
        <div className="flex items-center justify-center space-x-2">
          <Button
            size="small"
            variant="outlined"
            onClick={incrementQuestion}
            disabled={
              currentSubQuestionIdx === null
                ? currentQuestionIdx >= questions?.length - 1
                : currentQuestionIdx >= questions?.length - 1 &&
                  currentSubQuestionIdx >=
                    questions?.[currentQuestionIdx]?.Questions?.length - 1
            }
          >
            Skip
          </Button>

          <Button
            size="small"
            variant="outlined"
            endIcon={<IoArrowForwardOutline />}
            onClick={verifyAnswer}
          >
            {!isMobile && "Confirm"}
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-center space-x-2">
          <Button
            size="small"
            variant="outlined"
            startIcon={<IoArrowBackOutline />}
            onClick={decrementQuestion}
            disabled={
              currentSubQuestionIdx === null
                ? currentQuestionIdx <= 0
                : currentQuestionIdx <= 0 && currentSubQuestionIdx <= 0
            }
          >
            {!isMobile && "Previous"}
          </Button>

          <Button
            size="small"
            variant="outlined"
            endIcon={<IoArrowForwardOutline />}
            onClick={incrementQuestion}
            disabled={
              currentSubQuestionIdx === null
                ? currentQuestionIdx >= questions?.length - 1
                : currentQuestionIdx >= questions?.length - 1 &&
                  currentSubQuestionIdx >=
                    questions?.[currentQuestionIdx]?.Questions?.length - 1
            }
          >
            {!isMobile && "Next"}
          </Button>
        </div>
      )}
      {showReportPopup && <ReportQuestionPopup />}
    </div>
  );
}
