import QuestionCounts from "./quiz-customization/QuestionCounts";
import QuizeCustomizeOptions from "./quiz-customization/QuizeCustomizeOptions";
import SelectedTopics from "./quiz-customization/SelectedTopics";

const QuizCustomization = () => {
  return (
    <div className="w-full h-full flex flex-col p-4 sm:p-6 space-y-6 overflow-y-auto ">
      <div className="w-full flex flex-col xl:flex-row justify-between xl:space-x-4 space-y-6 xl:space-y-0">
        <div className="w-full xl:w-[60%] flex flex-col">
          <SelectedTopics />
        </div>
        <div className="w-full xl:w-[35%] flex flex-col">
          <QuestionCounts />
        </div>
      </div>
      <QuizeCustomizeOptions />
    </div>
  );
};

export default QuizCustomization;
