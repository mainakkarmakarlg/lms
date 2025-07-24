import { twMerge } from "tailwind-merge";
import NavigatorItem from "./NavigatorItem";
import QuizFilter from "./QuizFilter";
import { useSelector } from "react-redux";
import NavigatorItemForCollapse from "./NavigatorItemForCollapse";
import { useEffect, useRef } from "react";

const QuestionNavigator = ({
  questions,
  currentQuestionIdx,
  currentSubQuestionIdx,
  navigatorCollapsed,
  hasSubmitted,
}) => {
  const { filteredQuestions } = useSelector(
    (state) => state.mockQuestionNavigator
  );

  const currentNavigatorRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const newQuestions = !navigatorCollapsed ? filteredQuestions : questions;

  const currentIndexStr =
    currentSubQuestionIdx !== null
      ? `${currentQuestionIdx + 1}.${currentSubQuestionIdx + 1}`
      : `${currentQuestionIdx + 1}`;

  // useEffect(() => {
  //   const element = currentNavigatorRef.current;
  //   if (element) {
  //     element.scrollIntoView({ behavior: "smooth", block: "center" });
  //   }
  // }, [currentNavigatorRef, currentQuestionIdx]);

  useEffect(() => {
    const element = currentNavigatorRef.current;
    const container = scrollContainerRef.current;

    if (element && container) {
      const containerTop = container.scrollTop;
      const containerBottom = containerTop + container.clientHeight;

      const elementTop = element.offsetTop;
      const elementBottom = elementTop + element.clientHeight;

      if (elementTop < containerTop || elementBottom > containerBottom) {
        container.scrollTo({
          top: elementTop - container.clientHeight / 2,
          behavior: "smooth",
        });
      }
    }
  }, [currentQuestionIdx]);

  return (
    <div
      className={`w-full h-full flex flex-col items-center border-r border-r-slate-300`}
    >
      {!navigatorCollapsed && (
        <div
          className={`${hasSubmitted ? "h-[110px]" : "h-[110px]"} w-full flex flex-col px-3 pt-6`}
        >
          {/* <Filters /> */}
          <QuizFilter questions={questions} />
        </div>
      )}
      {!navigatorCollapsed && <hr className="my-3 w-full border" />}
      <div
        ref={scrollContainerRef}
        className={twMerge(
          "w-full relative  flex   py-4 overflow-y-auto  ",
          navigatorCollapsed
            ? "flex-col px-2 items-center  h-full space-y-2"
            : `grid grid-cols-3 gap-2 pl-3 h-full  justify-start items-start`
        )}
      >
        {navigatorCollapsed &&
          newQuestions?.map((question, idx) => (
            <div
              key={idx}
              ref={idx === currentQuestionIdx ? currentNavigatorRef : null}
            >
              <NavigatorItemForCollapse
                key={idx}
                question={question}
                questionNumber={idx} // use the loop index (0-based)
                currentQuestionIdx={currentQuestionIdx}
                currentSubQuestionIdx={currentSubQuestionIdx}
              />
            </div>
          ))}

        {!navigatorCollapsed &&
          newQuestions?.map((question, idx) => (
            <div
              key={idx}
              ref={idx === currentQuestionIdx ? currentNavigatorRef : null}
            >
              <NavigatorItem
                key={question?.questionIndex}
                question={question}
                currentIndexStr={currentIndexStr}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default QuestionNavigator;
