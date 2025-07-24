import { useSelector } from "react-redux";

const UnattemptedQuestions = () => {
  const { questions } = useSelector((state) => state.questions);

  const getUnattemptedQuestionsIndex = () => {
    const unattemptedQuestionsIndex = [];
    questions.forEach((question) => {
      if (question.Questions?.length > 0) {
        question.Questions.forEach((subQuestion) => {
          if (!subQuestion.optionId) {
            // console.log("subQuestion.optionId", subQuestion.optionId);
            unattemptedQuestionsIndex.push(subQuestion.questionIndex);
          }
        });
      } else {
        if (!question.optionId) {
          unattemptedQuestionsIndex.push(question.questionIndex);
        }
      }
    });
    return unattemptedQuestionsIndex;
  };
  const unAttempted = getUnattemptedQuestionsIndex();

  return (
    <>
      {unAttempted?.length > 0 && (
        <div className="w-full h-fit p-2 bg-sky-100 rounded-md shadow-subject space-y-2 2xl:space-y-4">
          <h1 className="text-lg font-semibold text-custom-black text-center">
            {unAttempted.length} Unattempted Questions
          </h1>
          <div className="w-full flex flex-wrap justify-center items-center ">
            {unAttempted.map((index) => (
              <div
                key={index}
                className="flex items-center justify-center w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]   rounded-full m-1"
              >
                <p className="text-[10px] lg:text-xs">{index}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default UnattemptedQuestions;
