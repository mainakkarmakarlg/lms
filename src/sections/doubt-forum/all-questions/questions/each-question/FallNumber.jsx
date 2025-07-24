import { MdArrowRight } from "react-icons/md";
import { extractSubjectChapterLosFromQuestion } from "../../../../../utils/common/extractSubjectChapterLosFromQuestion";

const FallNumber = ({ question }) => {
  const { chapter, los, subject } = extractSubjectChapterLosFromQuestion(
    question?.FallNumber?.Subject[0]
  );
  return (
    <div className="w-full text-sm flex whitespace-break-spaces items-center text-gray-400 overflow-x-scroll">
      <span className="whitespace-nowrap">{subject?.name}</span>
      <MdArrowRight />
      <span className="whitespace-nowrap">{chapter?.name}</span>
      <MdArrowRight />
      <span className="whitespace-nowrap">{los?.name}</span>
    </div>
  );
};

export default FallNumber;
