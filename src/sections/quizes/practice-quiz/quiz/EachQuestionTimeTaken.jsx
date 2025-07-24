import { useSelector } from "react-redux";
import formatTimeInHHMMSS from "../../../../utils/common/formatTimeInHHMMSS";
import getCurrentQuestion from "../../../../utils/mock-quiz/getCurrentQuestion";

const EachQuestionTimeTaken = () => {
  const { questions, currentQuestionIdx, currentSubQuestionIdx } = useSelector(
    (state) => state.mockQuestions
  );
  const currentQuestion = getCurrentQuestion(
    questions,
    currentQuestionIdx,
    currentSubQuestionIdx
  );
  const timeTaken = currentQuestion?.Answers?.[0]?.timeTaken;
  const attempted = currentQuestion?.Answers?.[0]?.optionId;
  return (
    <span className="md:text-sm text-xs mt-[2px] text-slate-700">
      {formatTimeInHHMMSS(timeTaken ? timeTaken * 1000 : attempted ? 1000 : 0)}
    </span>
  );
};

export default EachQuestionTimeTaken;
