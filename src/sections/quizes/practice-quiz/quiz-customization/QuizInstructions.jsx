import { instructions } from "../../../../constants";

const QuizInstructions = () => {
  return (
    <div className="h-full w-full text-custom-black flex flex-col justify-between  ">
      <div className="w-full flex flex-col  space-y-4">
        <h3 className="text-xl lg:text-2xl text-custom-black font-bold">
          Instructions
        </h3>
        <ul className="pl-8 pt-2">
          {instructions?.map((item) => {
            return (
              <li className="list-disc text-sm md:text-base" key={item?.id}>
                {item?.desc}
              </li>
            );
          })}
        </ul>
        {/* <p className="text-sm md:text-base">
          Use Next and Previous to navigate. Flag tricky questions for review;
          add comments if needed. Mark Confidence Level before or after
          reviewing answers. Click Submit to finalize—answers cannot be changed
          afterward. Only selected responses are scored Score is based on
          correct answers from attempted questions. Review all questions at the
          end of the quiz. Use Feedback to report any ambiguous or incorrect
          questions.
        </p> */}
      </div>
    </div>
  );
};

export default QuizInstructions;
