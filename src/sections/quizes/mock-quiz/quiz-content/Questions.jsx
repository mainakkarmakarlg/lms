import { useCallback, useEffect, useRef, useState } from "react";
import Question from "./Question";
import { getSocket } from "../../../../utils/socket";
import {
  setCurrentSubQuestionIdx,
  setWatchQuestionId,
} from "../../../../redux/slices/mock-quiz/mockQuestions";
import { useDispatch } from "react-redux";
import Watermark from "../../../../components/common/WaterMark";
import { useParams } from "react-router-dom";

const Questions = ({
  questions,
  currentQuestionIdx,
  currentSubQuestionIdx,
}) => {
  const [prevIndex, setPrevIndex] = useState({
    main: currentQuestionIdx,
    sub: currentSubQuestionIdx,
  });
  const [direction, setDirection] = useState("next");
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const params = useParams();

  // 🧠 Check and redirect if parent has no content but has children
  useEffect(() => {
    const currentQuestion = questions[currentQuestionIdx];
    const isParentWrapper =
      currentQuestion?.Questions?.length > 0 &&
      (!currentQuestion.content || currentQuestion.content.trim() === "");

    if (isParentWrapper && currentSubQuestionIdx === null) {
      // Automatically set first child as current sub-question
      dispatch(setCurrentSubQuestionIdx(0));
    }
  }, [currentQuestionIdx, currentSubQuestionIdx, questions, dispatch]);

  const getCurrentQuestion = useCallback(() => {
    const mainQuestion = questions[currentQuestionIdx];

    if (mainQuestion?.Questions?.length > 0) {
      if (currentSubQuestionIdx !== null) {
        return {
          question: mainQuestion.Questions[currentSubQuestionIdx],
          parent: mainQuestion,
        };
      } else {
        return { question: null, parent: null };
      }
    }

    return { question: mainQuestion, parent: null };
  }, [currentQuestionIdx, currentSubQuestionIdx, questions]);

  const getPreviousQuestion = () => {
    const mainQuestion = questions[prevIndex.main];

    if (mainQuestion?.Questions?.length > 0) {
      if (prevIndex.sub !== null) {
        return {
          question: mainQuestion.Questions[prevIndex.sub],
          parent: mainQuestion,
        };
      } else {
        return { question: null, parent: null };
      }
    }

    return { question: mainQuestion, parent: null };
  };

  useEffect(() => {
    const socket = getSocket();
    const { question: questionToWatch } = getCurrentQuestion();

    if (questionToWatch?.id) {
      socket?.emit("watch-quiz-question", {
        questionId: questionToWatch.id,
      });
    }

    socket?.on("watch-quiz-question-success", (data) => {
      dispatch(setWatchQuestionId(data?.questionId));
    });

    return () => {
      socket?.off("watch-quiz-question-success");
    };
  }, [currentQuestionIdx, currentSubQuestionIdx, dispatch, getCurrentQuestion]);

  useEffect(() => {
    if (
      currentQuestionIdx > prevIndex.main ||
      (currentQuestionIdx === prevIndex.main &&
        (currentSubQuestionIdx ?? -1) > (prevIndex.sub ?? -1))
    ) {
      setDirection("next");
    } else {
      setDirection("prev");
    }

    setPrevIndex({ main: currentQuestionIdx, sub: currentSubQuestionIdx });
  }, [currentQuestionIdx, currentSubQuestionIdx]);

  const current = getCurrentQuestion();
  const previous = getPreviousQuestion();

  return (
    <div className="relative w-full h-full  overflow-hidden" ref={containerRef}>
      <div className="w-full h-full relative">
        {/* Previous Question */}
        {previous.question && (
          <div
            key={`prev-${previous.question?.id}`}
            className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out
              ${direction === "next" ? "translate-x-0 animate-slide-out-left" : "translate-x-0 animate-slide-out-right"}`}
          >
            <Question
              question={previous.question}
              parentQuestion={previous.parent}
              index={prevIndex.main}
              subIndex={prevIndex.sub}
            />
          </div>
        )}

        {/* Current Question */}
        {current.question && (
          <div
            key={`current-${current.question?.id}`}
            className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out
              ${direction === "next" ? "translate-x-full animate-slide-in-left" : "-translate-x-full animate-slide-in-right"}`}
          >
            <Question
              question={current.question}
              parentQuestion={current.parent}
              index={currentQuestionIdx}
              subIndex={currentSubQuestionIdx}
            />
          </div>
        )}
      </div>
      <Watermark
        containerRef={containerRef}
        content={{ heading: "", subheading: params?.phone }}
      />
    </div>
  );
};

export default Questions;
