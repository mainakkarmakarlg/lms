import { extractSubjectChapterLosFromQuestion } from "../../../utils/common/extractSubjectChapterLosFromQuestion";
import { MdKeyboardArrowRight } from "react-icons/md";
import parse from "html-react-parser";

const QuizExplanation = ({ question }) => {
  const data =
    question &&
    question?.FallNumber[0]?.FallNumber?.Subject[0] &&
    extractSubjectChapterLosFromQuestion(
      question?.FallNumber[0]?.FallNumber?.Subject[0]
    );
  return (
    <div className="w-full rounded-md ">
      <div className="rounded-md px-2 w-full" id="explanation">
        <div className="space-y-3">
          <h6 className="text-sm md:text-lg font-semibold border-b-primary border-b w-fit md:px-3">
            Explanation
          </h6>
          {data && (
            <div>
              <TopicBreadcrumb data={data} />
            </div>
          )}
        </div>

        <div className="mt-5">
          <ExplanationContent question={question} />
        </div>
      </div>
    </div>
  );
};

export default QuizExplanation;

function TopicBreadcrumb({ data }) {
  return (
    <div className="flex  items-center space-x-3 xl:text-sm text-xs w-full overflow-x-scroll text-[#a3a7ac]">
      <div className="flex items-center space-x-2 whitespace-nowrap">
        <span className="">{data?.subject?.name || ""}</span>
        <span className="">
          <MdKeyboardArrowRight />
        </span>
      </div>
      <div className="flex items-center space-x-2 whitespace-nowrap">
        <span className="">{data?.chapter?.name || ""}</span>
        <span className="">
          <MdKeyboardArrowRight />
        </span>
      </div>
      <div className="flex items-center space-x-2 whitespace-nowrap">
        <span className="">{data?.los?.name || ""}</span>
        <span className=""></span>
      </div>
    </div>
  );
}

const ExplanationContent = ({ question }) => {
  return (
    <div className="w-full flex flex-col space-y-3 rounded-md h-full">
      {question?.Option?.map((option, index) => (
        <ExplaintionOption
          key={option?.id}
          option={option}
          answer={question?.Answers?.[0]}
          index={index}
        />
      ))}
    </div>
  );
};

const ExplaintionOption = ({ option, answer, index }) => {
  let border = "border border-[#E5E7EB]";
  let textColor = "bg-white text-slate-700";
  let char = String.fromCharCode(65 + index);
  let string;
  if (answer?.optionId === option?.id) {
    if (option?.RightOption) {
      border = "border border-success";
      textColor = "text-success";
      string = `Correct option is ${char}`;
    } else {
      border = "border border-danger";
      textColor = "text-danger";
      string = `Incorrect option is ${char}`;
    }
  } else {
    if (option?.RightOption) {
      border = "border border-success";
      textColor = "text-success";
      string = `Correct option is ${char}`;
    } else {
      border = "border border-gray-300";
      textColor = "text-gray-300 text-slate-700";
      string = `Incorrect option is ${char}`;
    }
  }

  return (
    <>
      {option?.Explaination?.[0]?.text && (
        <div
          className={`bg-white flex flex-col text-xs md:text-base  rounded-md p-3 ck-content  ${border} `}
        >
          <span className={`${textColor}`}>{string}</span>
          {parse(option?.Explaination?.[0]?.text)}
        </div>
      )}
    </>
  );
};
