import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentQuestionIdx,
  setCurrentSubQuestionIdx,
  updateAnswer,
  updateFlagged,
  updateOptions,
} from "../../../redux/slices/mock-quiz/mockQuestions";
import Button from "../../common/Button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useCallback, useState } from "react";
import PopupWrapper from "../../common/PopupWraper";
import ReportMockQuestionPopup from "./ReportMockQuestionPopup";
import getCurrentQuestion from "../../../utils/mock-quiz/getCurrentQuestion";
import { getSocket } from "../../../utils/socket";
import { GiConfirmed } from "react-icons/gi";
import { IoFlag, IoFlagOutline } from "react-icons/io5";
import { MdReportProblem } from "react-icons/md";
// import QuizAddNotePopup from "../../../sections/quizes/mock-quiz/quiz-content/QuizAddNotePopup";
import { questionFlagForQuiz } from "../../../apiCalls/mock-quiz/flage";
import { useResponsive } from "../../../hooks/useResponsive";
import ToggleNavigator from "../../../sections/quizes/mock-quiz/question-navigetor/ToggleNavigator";
import toast from "react-hot-toast";
import shuffleArray from "../../../utils/mock-quiz/suffleArray";

const BottomBar = ({
  questions,
  currentQuestionIdx,
  currentSubQuestionIdx,
}) => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const { reviewAnswerEnabled } = useSelector((state) => state.mockQuizes);
  const { isMobile } = useResponsive();
  const getNext = () => {
    const current = questions[currentQuestionIdx];

    // If we're on a parent with children and not at the last sub-question
    if (
      current.Questions &&
      current.Questions.length > 0 &&
      currentSubQuestionIdx !== null &&
      currentSubQuestionIdx < current.Questions.length - 1
    ) {
      dispatch(setCurrentSubQuestionIdx(currentSubQuestionIdx + 1));
      return;
    }

    // Move to next main question
    let nextIdx = currentQuestionIdx + 1;

    while (nextIdx < questions.length) {
      const next = questions[nextIdx];

      if (next.Questions && next.Questions.length > 0) {
        // Go to first child
        dispatch(setCurrentQuestionIdx(nextIdx));
        dispatch(setCurrentSubQuestionIdx(0));
        return;
      }

      if (!next.Questions || next.Questions.length === 0) {
        // Go to standalone question
        dispatch(setCurrentQuestionIdx(nextIdx));
        dispatch(setCurrentSubQuestionIdx(null));
        return;
      }

      nextIdx++; // ✅ Only happens if we didn’t return
    }
  };

  const getPrev = () => {
    const current = questions[currentQuestionIdx];

    // If we're on a sub-question and not the first one
    if (
      current.Questions &&
      current.Questions.length > 0 &&
      currentSubQuestionIdx !== null &&
      currentSubQuestionIdx > 0
    ) {
      dispatch(setCurrentSubQuestionIdx(currentSubQuestionIdx - 1));
      return;
    }

    // Loop backward through questions
    let prevIdx = currentQuestionIdx - 1;

    while (prevIdx >= 0) {
      const prev = questions[prevIdx];
      if (prev.Questions && prev.Questions.length > 0) {
        // Go to last sub-question
        dispatch(setCurrentQuestionIdx(prevIdx));
        dispatch(setCurrentSubQuestionIdx(prev.Questions.length - 1));
        return;
      }

      if (!prev.Questions || prev.Questions.length === 0) {
        // Go to previous standalone question
        dispatch(setCurrentQuestionIdx(prevIdx));
        dispatch(setCurrentSubQuestionIdx(null));
        return;
      }

      prevIdx--; // ✅ Only happens if we didn't return
    }
  };

  const handleReport = async () => {
    // Handle report logic here
    setShowPopup(true);
  };

  const currentQuestion = getCurrentQuestion(
    questions,
    currentQuestionIdx,
    currentSubQuestionIdx
  );
  // console.log("currentQuestion", currentQuestion);

  const handleQuestionSubmit = useCallback(() => {
    // Handle question submission logic here
    const socket = getSocket();
    if (socket) {
      socket.emit("get-quiz-question-explaination");
      socket.on("get-quiz-question-explaination-success", (data) => {
        dispatch(
          updateOptions({
            questionId: currentQuestion.id,
            updatedOptions: shuffleArray(data.Option),
          })
        );

        dispatch(
          updateAnswer({
            questionId: currentQuestion.id,
            updatedAnswer: {
              //i want take all key value pairs from previous answer and add hasSubmitted: true
              ...currentQuestion.Answers[0],
              hasSubmitted: true,
            },
          })
        );
        socket.off("get-quiz-question-explaination-success");
      });
    }
  }, [dispatch, currentQuestion]);

  // useEffect(() => {
  //   // const hasSubmitted = currentQuestion?.Answers?.[0]?.hasSubmitted;

  //   // if (hasSubmitted && watchQuiestionId === currentQuestion.id) {
  //   //   const socket = getSocket();
  //   //   if (socket) {
  //   //     socket.emit("get-quiz-question-explaination");
  //   //     socket.on("get-quiz-question-explaination-success", (data) => {
  //   //       console.log("Quiz question explanation:", data);
  //   //       dispatch(
  //   //         updateOptions({
  //   //           questionId: currentQuestion.id,
  //   //           updatedOptions: data?.Option,
  //   //         })
  //   //       );
  //   //     });
  //   //   }
  //   // }

  //   if (hasSubmitted && watchQuiestionId === currentQuestion.id) {
  //     handleQuestionSubmit();
  //   }
  // }, [watchQuiestionId]);

  return (
    <div className="w-full max-h-[60px] flex justify-between items-center p-2 md:p-4  border-t-4 border-primary shadow-lg bg-white rounded-b-md">
      <div className="w-[calc(100%-200px)] flex  items-center space-x-2 ">
        <ToggleNavigator />

        {currentQuestion?.UserReports?.length === 0 && (
          <Button
            startIcon={<MdReportProblem />}
            size="small"
            variant="outlined"
            color="danger"
            // rounded={true}
            onClick={handleReport}
          ></Button>
        )}
      </div>
      <div className="w-fit space-x-2 flex items-center justify-between self-end">
        <FlagActionButton question={currentQuestion} />

        <Button
          onClick={getPrev}
          size="small"
          variant="outlined"
          startIcon={<FaArrowLeft />}
          disabled={
            currentQuestionIdx === 0 &&
            (!currentSubQuestionIdx || currentSubQuestionIdx === 0)
          }
        >
          {!isMobile && <span className="">Previous</span>}
        </Button>
        {reviewAnswerEnabled && currentQuestion?.Answers?.[0]?.optionId ? (
          <Button
            size="small"
            variant="outlined"
            endIcon={<GiConfirmed />}
            onClick={handleQuestionSubmit}
          >
            <span className="hidden -w-0 md:w-fit md:block">Confirm</span>
          </Button>
        ) : (
          <Button
            onClick={getNext}
            size="small"
            variant="outlined"
            disabled={currentQuestionIdx === questions.length - 1}
            endIcon={<FaArrowRight />}
          >
            {!isMobile && <span className="">Next</span>}
          </Button>
        )}
      </div>

      {showPopup && (
        <PopupWrapper onClose={() => setShowPopup(false)} direction="bottom">
          {/* <StartQuizPopup quizId={quiz?.id} /> */}
          <ReportMockQuestionPopup />
        </PopupWrapper>
      )}
    </div>
  );
};

export default BottomBar;

const FlagActionButton = ({ question }) => {
  const { accessToken } = useSelector((state) => state.user);
  // const [showFlagPopup, setShowFlagPopup] = useState(false);
  const dispatch = useDispatch();
  const flagged = question?.UserFlags?.[0];

  const flagQuestion = async () => {
    const response = await questionFlagForQuiz(
      {
        questionId: question?.id,
      },
      accessToken
    );

    if (response?.status === 201) {
      toast.success("Question flagged successfully");
      dispatch(
        updateFlagged({
          questionId: question?.id,
          updatedFlagged: response?.data,
        })
      );
    } else {
      console.log(response);
    }
  };

  const removeFromFlag = async () => {
    const data = {
      questionId: question?.id,
      remove: true,
    };
    const response = await questionFlagForQuiz(data, accessToken);
    if (response?.status === 200 || response?.status === 201) {
      toast.success("Question unflagged successfully");
      dispatch(
        updateFlagged({
          questionId: question?.id,
          updatedFlagged: null,
        })
      );
    }
  };

  // const openAddTextPopup = () => {
  //   setShowFlagPopup(true);
  // };

  return (
    <div className={`  w-full  duration-300`}>
      {flagged ? (
        <Button
          size="small"
          variant="contained"
          color="highlight"
          startIcon={<IoFlag />}
          onClick={removeFromFlag}
          // className="p-[2px] rounded-full cursor-pointer"
        ></Button>
      ) : (
        <Button
          size="small"
          variant="outlined"
          color="highlight"
          startIcon={<IoFlagOutline />}
          // className="p-[2px] rounded-full cursor-pointer"
          onClick={flagQuestion}
        ></Button>
      )}

      {/* {showFlagPopup && (
        <PopupWrapper
          onClose={() => setShowFlagPopup(false)}
          direction="bottom"
        >
          <QuizAddNotePopup question={question} />
        </PopupWrapper>
      )} */}
    </div>
  );
};
