import { useEffect } from "react";
import BottomBar from "../sections/quizes/practice-quiz/quiz/BottomBar";
import { getSocket } from "../utils/socket";
import Explanation from "../sections/quizes/practice-quiz/quiz/explanation/Explanation";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setQuestions } from "../redux/slices/practice-quiz/questions";
import {
  setFilteredQuestions,
  toggleQuestionNavigator,
} from "../redux/slices/practice-quiz/questionNavigator";
import { setHasSubmitted } from "../redux/slices/practice-quiz/practiceQuiz";
import { setTimeTaken } from "../redux/slices/practice-quiz/timer";
import { setFlaggedQuestions } from "../redux/slices/practice-quiz/questionNavigator";
import { setReportedQuestions } from "../redux/slices/practice-quiz/reportQuestion";
import MobileQuestionNavigator from "../components/quizes/practice-quiz/quiz/MobileQuestionNavigator";
import { MdClose } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import ProgressBar from "../components/common/ProgressBar";
import useGetQuizResult from "../hooks/quiz/useGetQuizResult";
import PracticeTopBar from "../sections/quizes/practice-quiz/quiz/PracticeTopBar";
import PracticeQuizContent from "../sections/quizes/practice-quiz/quiz/PracticeQuizContent";
import combineChildAndParentQuestions from "../utils/quizes/practice-quiz/combineChildAndParentQuestions";
import findCurrentQuestion from "../utils/quizes/practice-quiz/findCurrentQuestion";

export default function PracticeQuizExam() {
  const { questions, navigatorCollapsed } = useSelector(
    (state) => state.questionNavigator
  );

  console.log("navigatorCollapsed", navigatorCollapsed);
  const { accessToken } = useSelector((state) => state.user);
  const { course } = useSelector((state) => state.course);
  const { hasSubmitted, isAttempted } = useSelector(
    (state) => state.practiceQuiz
  );

  const courseId = course?.course?.id;
  const params = useParams();
  const socket = getSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useGetQuizResult({ canRequest: hasSubmitted ? true : false });

  const closeQuestionNavigator = () => {
    dispatch(toggleQuestionNavigator());
  };

  useEffect(() => {
    if (courseId && params?.attemptId && !isAttempted) {
      const handlePracticeAttempt = async () => {
        socket?.emit("make-practice-attempt", {
          courseId: Number(courseId),
          attemptId: Number(params?.attemptId),
        });

        socket?.on("make-practice-attempt-success", async (data) => {
          const { mergedAnswers, flagged, reported } =
            await combineChildAndParentQuestions(
              accessToken,
              [...data.Answer],
              socket
            );
          // console.log(mergedAnswers, "mergedAnswers");
          dispatch(setQuestions(mergedAnswers));
          dispatch(setFlaggedQuestions(flagged));
          dispatch(setReportedQuestions(reported));
          dispatch(setFilteredQuestions(mergedAnswers));
          dispatch(setHasSubmitted(data?.hasSubmitted));
          dispatch(setTimeTaken(data?.timeTaken || 0));
        });

        socket?.on("make-practice-attempt-error", () => {
          navigate(`/error/${params?.combination}/${params?.phone}`);
        });
      };

      handlePracticeAttempt();
    }

    return () => {
      socket?.off("make-practice-attempt");
      socket?.off("make-practice-attempt-success");
      socket?.off("make-practice-attempt-error");
    };
  }, [
    courseId,
    dispatch,
    params?.attemptId,
    socket,
    navigate,
    params?.phone,
    isAttempted,
    params?.combination,
    accessToken,
  ]);

  return (
    <div className="h-full w-full py-5">
      <div className="h-full w-[95%] md:w-[90%] lg:w-[80%] mx-auto flex flex-col items-center justify-center overflow-y-scroll">
        {questions.length > 0 && (
          <div className="w-full h-[90%] xl:h-[90%]">
            <PracticeTopBar />
            <Progress />
            <PracticeQuizContent />
            <BottomBar />
            <Explanation />
          </div>
        )}
      </div>
      {/* {!navigatorCollapsed && ( */}
      <div
        className={twMerge(
          "w-[300px] bg-white md:hidden fixed top-0 left-0 h-full flex flex-col p-2 duration-300 ",
          !navigatorCollapsed ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div
          onClick={closeQuestionNavigator}
          className="relative cursor-pointer p-1 rounded-full border-2 self-end w-fit"
        >
          <MdClose />
        </div>
        <MobileQuestionNavigator type={"desktop"} />
      </div>
      {/* )} */}
    </div>
  );
}
const Progress = () => {
  const {
    currentQuestionIdx,
    currentSubQuestionIdx,
    flatMappedQuestions,
    questions,
  } = useSelector((state) => state.questions);

  const currentQuestion = findCurrentQuestion(
    questions,
    currentQuestionIdx,
    currentSubQuestionIdx
  )?.Question;

  const totalQuestions = flatMappedQuestions?.length;
  const currentIndex =
    currentQuestion &&
    flatMappedQuestions?.findIndex(
      (question) => question?.Question?.id === currentQuestion?.id
    );
  const index = currentIndex + 1 || 0;
  const percentage = totalQuestions > 0 ? (index / totalQuestions) * 100 : 0;

  return (
    <div className=" min-h-[3px]">
      <ProgressBar percentage={percentage} filledColor="#FFAF5E" height="3px" />
    </div>
  );
};
