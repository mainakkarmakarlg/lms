import { useSelector } from "react-redux";
import Question from "../../../../components/quizes/practice-quiz/quiz/Question";
import { twMerge } from "tailwind-merge";
import PracticeQuestionNavigator from "../../../../components/quizes/practice-quiz/quiz/PracticeQuestionNavigator";
import { useRef } from "react";
import Watermark from "../../../../components/common/WaterMark";
import { useParams } from "react-router-dom";

export default function PracticeQuizContent() {
  const contentContainerRef = useRef();
  const params = useParams();
  const { navigatorCollapsed } = useSelector(
    (state) => state.questionNavigator
  );
  return (
    <div className="w-full h-[calc(100%-60px-60px)] flex rounded-b-md bg-white">
      <div
        className={twMerge(
          " h-full relative duration-300 hidden md:flex ",
          navigatorCollapsed ? "md:w-[90px]" : "md:w-[220px]"
        )}
      >
        <PracticeQuestionNavigator navigatorCollapsed={navigatorCollapsed} />
      </div>

      <div
        ref={contentContainerRef}
        className={twMerge(
          "overflow-y-auto duration-300 px-3 md:px-6 w-full h-full relative",
          navigatorCollapsed
            ? "w-full md:w-[calc(100%-90px)]"
            : "w-full md:w-[calc(100%-220px)]"
        )}
      >
        <Watermark
          containerRef={contentContainerRef}
          content={{ heading: "", subheading: params?.phone }}
        />
        <Question />
      </div>
    </div>
  );
}
