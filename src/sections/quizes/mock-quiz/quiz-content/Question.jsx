import Option from "./Option";
import parse from "html-react-parser";
import QuestionBar from "./QuestionBar";

const Question = ({ question, index, subIndex, parentQuestion }) => {
  return (
    <div className="w-full h-full flex flex-col py-2">
      <QuestionBar index={index} subIndex={subIndex} question={question} />

      {/* If parentQuestion exists, split screen */}
      {parentQuestion ? (
        <div className="flex flex-col md:flex-row w-full h-full overflow-y-auto md:overscroll-y-none  p-4 gap-4 flex-1 min-h-0">
          {/* Left side: Parent Question (50%) */}
          <div className="w-full md:w-1/2 bg-[#F0F8FF] rounded-md md:p-3 md:overflow-y-auto flex">
            <div className="text-sm md:text-base bg-[#F0F8FF] rounded-md p-3">
              {/* {parentQuestion?.questionIndex} . */}
              {parse(parentQuestion?.question || "")}
            </div>
          </div>

          {/* Right side: Child (Sub) Question (50%) */}
          <div className="w-full md:w-1/2 flex flex-col  flex-1 md:overflow-y-auto  min-h-0">
            <div className="text-sm md:text-base bg-[#F0F8FF] rounded-md p-3 flex items-start space-x-1">
              <div className="">{question?.questionIndex}.</div>
              <div className="">{parse(question?.question || "")}</div>
            </div>

            <hr className="my-4" />

            {/* Options */}
            <div className="flex flex-col space-y-3  flex-1 min-h-0">
              <h2 className="font-semibold">Options</h2>
              {question?.Option?.map((option, index) => (
                <Option
                  key={option.id}
                  option={option}
                  index={index}
                  answer={question?.Answers}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Normal full width question (no parent)
        <div className="p-4 space-y-4 h-full flex flex-col flex-1   min-h-0 overflow-y-auto ">
          {question?.question && (
            <div className="text-sm md:text-base bg-[#F0F8FF] rounded-md p-3 flex items-start space-x-1">
              {/* <div className="h-fit">{question?.questionIndex}.</div>{" "} */}
              <div className="">{parse(question?.question)}</div>
            </div>
          )}
          <hr />
          <div className="flex flex-col space-y-3 py-5  flex-1 min-h-0">
            <h2 className="font-semibold">Options</h2>
            {question?.Option?.map((option, index) => (
              <Option
                key={option.id}
                option={option}
                index={index}
                answer={question?.Answers}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Question;
