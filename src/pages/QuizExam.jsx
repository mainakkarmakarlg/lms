import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import QuizTopBar from "../sections/quizes/mock-quiz/quiz-top-bar/QuizTopBar";
import { getSocket } from "../utils/socket";
import { useNavigate, useParams } from "react-router-dom";
import { setAttempt } from "../redux/slices/mock-quiz/mockQuiz";
import { setMockQuestions } from "../redux/slices/mock-quiz/mockQuestions";
import QuizProgress from "../components/quizes/mock-quiz/QuizProgress";
import QuestionNavigator from "../sections/quizes/mock-quiz/question-navigetor/QuestionNavigator";
import { MdClose } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import QuizContent from "../components/quizes/mock-quiz/QuizContent";
import {
  setFilteredQuestions,
  toggleQuestionNavigator,
} from "../redux/slices/mock-quiz/mockQuestionNavigator";
import getCurrentQuestion from "../utils/mock-quiz/getCurrentQuestion";
import QuizExplanation from "../components/quizes/mock-quiz/QuizExplanation";
import Loader from "../components/common/Loader";
import { mockQuizLoaderText } from "../constants/loaderText";

const QuizExam = () => {
  const { questions, currentQuestionIdx, currentSubQuestionIdx, hasSubmitted } =
    useSelector((state) => state.mockQuestions);
  const { navigatorCollapsed, filteredQuestions } = useSelector(
    (state) => state.mockQuestionNavigator
  );
  const { isCourseWatched } = useSelector((state) => state.app);

  const [showLoader, setShowLoader] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const closeQuestionNavigator = () => {
    dispatch(toggleQuestionNavigator());
  };

  useEffect(() => {
    console.log("questions", questions);
    if ((!questions || questions?.length === 0) && isCourseWatched) {
      setShowLoader(true);
      const { attemptId } = params;
      const socket = getSocket();
      socket.emit("make-quiz-attempt", { attemptId });

      socket.once("make-quiz-attempt-success", (data) => {
        dispatch(setAttempt(data?.attempt));
        socket.emit("give-quiz-questions");

        socket.once("give-quiz-questions-success", (data) => {
          if (data?.Quiz?.Questions?.length > 0) {
            dispatch(setMockQuestions(data));
            setShowLoader(false);
            // dispatch(setFilteredQuestions(data?.Quiz?.Questions));
          }
        });
      });
    }
  }, [questions, dispatch, params, isCourseWatched]);
  const currentQuestion = getCurrentQuestion(
    questions,
    currentQuestionIdx,
    currentSubQuestionIdx
  );

  useEffect(() => {
    const socket = getSocket();
    socket?.once("quiz-end", (data) => {
      if (data?.quiz?.resultType === "aftersubmit") {
        navigate(
          `/mock-quiz/result/${params?.attemptId}/${params?.combination}/${params?.phone}`
        );
      }
    });
  }, [navigate, params]);

  useEffect(() => {
    if (!navigatorCollapsed) dispatch(setFilteredQuestions(questions));
  }, [questions, dispatch, navigatorCollapsed]);

  return (
    <div className="h-full w-full ">
      {showLoader ? (
        <Loader fullHeight={true} loadingTexts={mockQuizLoaderText} />
      ) : (
        <div className="w-full h-full">
          <div className="h-full w-[95%] md:w-[90%] lg:w-[80%] mx-auto flex flex-col items-center justify-center overflow-y-scroll">
            {questions?.length > 0 && (
              <div className="w-full h-[90%] xl:h-[90%]  flex justify-center items-center ">
                <div className="w-full h-[100%] ">
                  <div className="w-full h-[88px]">
                    <QuizTopBar />
                    <QuizName />
                    <QuizProgress />
                  </div>
                  <div className="w-full h-[calc(100%-83px)]">
                    <QuizContent />
                  </div>
                  <div className="w-full h-fit pb-4">
                    {currentQuestion?.Option?.some(
                      (option) => option.RightOption
                    ) && <QuizExplanation question={currentQuestion} />}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            className={twMerge(
              "w-[300px] md:hidden bg-white fixed top-0 left-0 h-full flex flex-col p-2 duration-300",
              navigatorCollapsed ? "-translate-x-full" : " translate-x-0"
            )}
          >
            <div
              onClick={closeQuestionNavigator}
              className="relative cursor-pointer p-1 rounded-full border-2 self-end w-fit"
            >
              <MdClose />
            </div>
            <QuestionNavigator
              questions={filteredQuestions}
              currentQuestionIdx={currentQuestionIdx}
              currentSubQuestionIdx={currentSubQuestionIdx}
              navigatorCollapsed={navigatorCollapsed}
              filteredQuestions={filteredQuestions}
              hasSubmitted={hasSubmitted}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizExam;

const QuizName = () => {
  const { attempt } = useSelector((state) => state.mockQuizes);
  return (
    <div className="w-full h-[25px] flex items-center bg-primary text-white py-[2px] px-4">
      <h1 className="text-xs md:text-base font-semibold">
        {attempt?.Quiz?.name}
      </h1>
    </div>
  );
};
