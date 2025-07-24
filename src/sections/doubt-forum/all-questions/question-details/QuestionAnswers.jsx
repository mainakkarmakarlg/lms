import AllAnswers from "./question-answers/AllAnswers";
import AnswerBox from "./question-answers/AnswerBox";
import AnswersHeaderAndFilter from "./question-answers/AnswersHeaderAndFilter";

const QuestionAnswers = () => {
  return (
    <div className="w-full mt-7 flex flex-col space-y-7">
      <AnswerBox />
      <AnswersHeaderAndFilter />
      <AllAnswers />
    </div>
  );
};

export default QuestionAnswers;
