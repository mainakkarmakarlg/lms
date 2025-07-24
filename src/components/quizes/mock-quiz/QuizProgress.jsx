import { useEffect, useState } from "react";
import extractQuestionFromchild from "../../../utils/mock-quiz/extractQuestionFromchild";
import ProgressBar from "../../common/ProgressBar";
import { useSelector } from "react-redux";
import getCurrentQuestion from "../../../utils/mock-quiz/getCurrentQuestion";

const QuizProgress = () => {
  const [totalQuestions, setTotalQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const { questions, currentQuestionIdx, currentSubQuestionIdx } = useSelector(
    (state) => state.mockQuestions
  );

  useEffect(() => {
    setTotalQuestions(extractQuestionFromchild(questions));
  }, [questions]);

  useEffect(() => {
    if (totalQuestions?.length === 0) return;
    const currentQuestion = getCurrentQuestion(
      questions,
      currentQuestionIdx,
      currentSubQuestionIdx
    );
    const currentIndex =
      currentQuestion &&
      totalQuestions?.findIndex(
        (question) => question.id === currentQuestion?.id
      );
    setIndex(currentIndex + 1 || 0);
  }, [totalQuestions, questions, currentQuestionIdx, currentSubQuestionIdx]);

  const length = totalQuestions?.length;

  const percentage = length > 0 ? (index / length) * 100 : 0;
  return (
    <div className=" h-[3px]">
      <ProgressBar percentage={percentage} filledColor="#FFAF5E" height="3px" />
    </div>
  );
};

export default QuizProgress;
