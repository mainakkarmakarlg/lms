import { useSelector } from "react-redux";
import QuestionNavigator from "../../../sections/quizes/mock-quiz/question-navigetor/QuestionNavigator";
import { twMerge } from "tailwind-merge";
import Questions from "../../../sections/quizes/mock-quiz/quiz-content/Questions";
import BottomBar from "./BottomBar";
import ConfidenceLevel from "../../../sections/quizes/mock-quiz/quiz-content/ConfidenceLevel";
import getCurrentQuestion from "../../../utils/mock-quiz/getCurrentQuestion";
const QuizContent = () => {
  const { questions, currentQuestionIdx, currentSubQuestionIdx, hasSubmitted } =
    useSelector((state) => state.mockQuestions);
  const { navigatorCollapsed, filteredQuestions } = useSelector(
    (state) => state.mockQuestionNavigator
  );

  return (
    <div className="w-full h-full flex flex-col space-y-4">
      <div className="w-full h-[calc(100%-120px)] flex rounded-b-md bg-white ">
        <div
          className={twMerge(
            " h-full relative duration-300 hidden md:flex justify-center ",
            navigatorCollapsed ? "md:w-[100px] " : "md:w-[255px]"
          )}
        >
          <QuestionNavigator
            questions={!navigatorCollapsed ? filteredQuestions : questions}
            currentQuestionIdx={currentQuestionIdx}
            currentSubQuestionIdx={currentSubQuestionIdx}
            navigatorCollapsed={navigatorCollapsed}
            filteredQuestions={filteredQuestions}
            hasSubmitted={hasSubmitted}
            mobile={false}
          />
        </div>

        <Questions
          questions={questions}
          currentQuestionIdx={currentQuestionIdx}
          currentSubQuestionIdx={currentSubQuestionIdx}
        />
        {/* i want render a bottom bar compoent where i can navigate to next or previous question */}
      </div>
      <div className="h-[60px] w-full">
        <BottomBar
          questions={questions}
          currentQuestionIdx={currentQuestionIdx}
          currentSubQuestionIdx={currentSubQuestionIdx}
        />
      </div>
      <div className="w-full h-[60px]  flex justify-center items-center ">
        <ConfidenceLevel
          question={getCurrentQuestion(
            questions,
            currentQuestionIdx,
            currentSubQuestionIdx
          )}
        />
      </div>
    </div>
  );
};

export default QuizContent;
