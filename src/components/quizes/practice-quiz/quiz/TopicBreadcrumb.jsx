import { MdKeyboardArrowRight } from "react-icons/md";
import { useSelector } from "react-redux";
import { extractSubjectChapterLosFromQuestion } from "../../../../utils/common/extractSubjectChapterLosFromQuestion";
import findCurrentQuestion from "../../../../utils/quizes/practice-quiz/findCurrentQuestion";

export default function TopicBreadcrumb() {
  const { questions, currentQuestionIdx, currentSubQuestionIdx } = useSelector(
    (state) => state.questions
  );

  const currentQuestion = findCurrentQuestion(
    questions,
    currentQuestionIdx,
    currentSubQuestionIdx
  );
  const question = currentQuestion?.Question;

  const data =
    question &&
    question?.FallNumber?.[0]?.FallNumber?.Subject?.[0] &&
    extractSubjectChapterLosFromQuestion(
      question?.FallNumber?.[0]?.FallNumber?.Subject?.[0]
    );

  return (
    <div className="flex items-center space-x-3 xl:text-sm text-xs w-full overflow-x-scroll text-[#a3a7ac]">
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

//
