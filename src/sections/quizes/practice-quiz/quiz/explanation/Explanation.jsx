import { useSelector } from "react-redux";
import TopicBreadcrumb from "../../../../../components/quizes/practice-quiz/quiz/TopicBreadcrumb";
import parse from "html-react-parser";
import { twMerge } from "tailwind-merge";
import findCurrentQuestion from "../../../../../utils/quizes/practice-quiz/findCurrentQuestion";

export default function Explanation() {
  const {
    submittedQuestions,
    questions,
    currentQuestionIdx,
    currentSubQuestionIdx,
  } = useSelector((state) => state.questions);
  const { hasSubmitted } = useSelector((state) => state.practiceQuiz);
  const currentQuestion = findCurrentQuestion(
    questions,
    currentQuestionIdx,
    currentSubQuestionIdx
  );
  const questionId = currentQuestion?.Question?.id;

  const showExplanation =
    hasSubmitted ||
    submittedQuestions?.includes(questionId) ||
    currentQuestion?.hasSubmitted;

  return (
    <div className="w-full  rounded-md">
      {showExplanation && (
        <div className="rounded-md p-4 w-full" id="explanation">
          <div className="space-y-3">
            <h6 className="font-semibold border-b-primary border-b w-fit px-3">
              Explanation
            </h6>
            <div>
              <TopicBreadcrumb />
            </div>
          </div>

          <div className="mt-5">
            <ExplanationContent />
          </div>
        </div>
      )}
    </div>
  );
}

const ExplanationContent = () => {
  const { answers, questions, currentQuestionIdx, currentSubQuestionIdx } =
    useSelector((state) => state.questions);

  const question = findCurrentQuestion(
    questions,
    currentQuestionIdx,
    currentSubQuestionIdx
  )?.Question;
  const answer = answers?.find((answer) => answer.questionId === question?.id);
  return (
    <div className="w-full flex flex-col space-y-3 rounded-md h-full">
      {question?.Explaination?.text && (
        <CorrectExplanation
          question={question}
          answer={question?.Explaination?.text}
          otherOptions={question?.Option}
        />
      )}

      {answer?.Option?.map((option, index) => (
        <OtherOption
          question={questions[currentQuestionIdx]}
          optionIndex={index}
          option={option}
          key={option?.id}
        />
      ))}
    </div>
  );
};

const CorrectExplanation = ({ question, answer, otherOptions }) => {
  const options = question?.Option;
  const correctOption = otherOptions?.find(
    (option) => option?.RightOption !== null
  );

  const correctOptionId = correctOption?.RightOption?.optionId;
  const index = options?.findIndex((option) => option?.id === correctOptionId);
  const char = String.fromCharCode(65 + index);

  return (
    <div className=" shadow p-3 rounded-md w-full scrollbar overflow-x-auto bg-white text-sm md:text-base">
      <p className="text-success">Correct option is {char}</p>
      <div className="mt-2">{parse(answer || "No explanation")}</div>
    </div>
  );
};

const OtherOption = ({ question, option, optionIndex }) => {
  // console.log(option);
  // console.log(question);

  const isSelected = option?.id === question?.optionId;
  const char = String.fromCharCode(65 + optionIndex);
  console.log("option in explanation", option);
  return (
    <div
      className={twMerge(
        "mt-3 bg-white shadow p-3 rounded-md text-sm md:text-base",
        option?.Explaination?.length > 0
          ? option?.Explaination[0]?.text
            ? "block"
            : "hidden"
          : "hidden"
      )}
    >
      <p className={isSelected ? "text-danger" : "text-slate-700"}>
        Reason for option {char}
      </p>
      <div className="mt-2 w-full max-h-[400px] overflow-y-auto break-words">
        <div className="[&>math]:break-words [&>math]:whitespace-normal [&>math]:max-w-full">
          {parse(
            option?.Explaination?.length > 0
              ? option?.Explaination[0]?.text
              : ""
          )}
        </div>
      </div>
    </div>
  );
};
