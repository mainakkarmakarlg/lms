import { useEffect, useState } from "react";
import { updateAnswer } from "../../../../redux/slices/mock-quiz/mockQuestions";
import { useDispatch } from "react-redux";
import { getSocket } from "../../../../utils/socket";
import { twMerge } from "tailwind-merge";

const ConfidenceLevel = ({ question }) => {
  const [difficulty, setDifficulty] = useState("");
  const dispatch = useDispatch();

  const changeDifficulty = (difficulty) => {
    setDifficulty(difficulty);
    const socket = getSocket();
    socket?.emit("add-quiz-question-difficulty", {
      difficulty,
    });

    socket?.on("add-quiz-question-difficulty-success", (data) => {
      console.log("data of difficulty", data);
      console.log("questionId", question?.id);
      dispatch(
        updateAnswer({
          questionId: data?.questionId,
          updatedAnswer: data,
        })
      );
    });

    return () => {
      socket?.off("add-quiz-question-difficulty-success");
      socket?.off("add-quiz-question-difficulty");
    };
  };

  useEffect(() => {
    if (question?.Answers?.[0]?.difficulty === 1) {
      setDifficulty("easy");
    } else if (question?.Answers?.[0]?.difficulty === 5) {
      setDifficulty("medium");
    } else if (question?.Answers?.[0]?.difficulty === 10) {
      setDifficulty("hard");
    } else {
      setDifficulty("");
    }
  }, [question]);

  return (
    <div className="w-full h-full flex items-center space-x-1 sm:space-x-3 text-sm justify-between sm:justify-end     border-t-2 border-primary py-2 ">
      <span className="whitespace-nowrap text-xs md:text-base">
        Rate your confidence
      </span>

      <div className="flex items-center">
        <button
          onClick={() => changeDifficulty("easy")}
          className={twMerge(
            "py-1 px-2 md:px-4 border border-gray-200 rounded-l text-xs md:text-base",
            difficulty === "easy" &&
              "bg-primary/50 text-white border border-primary/50"
          )}
        >
          Low
        </button>

        <button
          onClick={() => changeDifficulty("medium")}
          className={twMerge(
            "py-1 px-2 md:px-4 border border-gray-200 border-r-0 border-l-0 text-xs md:text-base",
            difficulty === "medium" &&
              "bg-primary/75 text-white border border-primary/75 border-r-0 border-l-0"
          )}
        >
          Medium
        </button>

        <button
          onClick={() => changeDifficulty("hard")}
          className={twMerge(
            "py-1 px-2 md:px-4 border border-gray-200 rounded-r text-xs md:text-base",
            difficulty === "hard" &&
              "bg-primary text-white border border-primary"
          )}
        >
          High
        </button>
      </div>
    </div>
  );
};

export default ConfidenceLevel;
