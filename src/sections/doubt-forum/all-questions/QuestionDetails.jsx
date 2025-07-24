import QuestionAnswers from "./question-details/QuestionAnswers";
import QuestionContent from "./question-details/QuestionContent";
import QuestionHeader from "./question-details/QuestionHeader";

const QuestionDetails = () => {
  return (
    <div className="w-full h-full overflow-y-scroll">
      <QuestionHeader />

      <div className="w-full h-[calc(100%-40px)] bg-white p-3 rounded-md overflow-y-scroll">
        <QuestionContent />
        <QuestionAnswers />
      </div>
    </div>
  );
};

export default QuestionDetails;
