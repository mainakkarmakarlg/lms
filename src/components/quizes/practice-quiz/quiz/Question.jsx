import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { getSocket } from "../../../../utils/socket";
import { IoFlag, IoFlagOutline } from "react-icons/io5";
import { questionFlag } from "../../../../apiCalls/quiz/questions";
import { openFlagPopup } from "../../../../redux/slices/practice-quiz/flagQuestions";
import { addInFlaggedQuestions } from "../../../../redux/slices/practice-quiz/questionNavigator";
import AddNotePopup from "../../../../sections/quizes/practice-quiz/quiz/popups/AddFlagNote";
import { twMerge } from "tailwind-merge";
import {
  setCurrentQuestionIdx,
  setCurrentSubQuestionIdx,
  setQuestions,
} from "../../../../redux/slices/practice-quiz/questions";
import Options from "./Options";
import findCurrentQuestion from "../../../../utils/quizes/practice-quiz/findCurrentQuestion";
import { useParams } from "react-router-dom";

export default function Question() {
  const socket = getSocket();
  const { questions, currentQuestionIdx, currentSubQuestionIdx } = useSelector(
    (state) => state.questions
  );
  const params = useParams();

  const dispatch = useDispatch();

  const newQuestion = findCurrentQuestion(
    questions,
    currentQuestionIdx,
    currentSubQuestionIdx
  );

  const currentQuestion = newQuestion?.Question;
  console.log(
    "params : ",
    params,
    "currentQuestion?.attemptId",
    currentQuestion
  );

  const parentQuestion =
    currentSubQuestionIdx !== null ? questions?.[currentQuestionIdx] : null;

  console.log("parentQuestion : ", parentQuestion);

  // questions?.length > 0 && questions[currentQuestionIdx]?.Question;

  useEffect(() => {
    socket?.emit("watch-practice-question", {
      questionId: currentQuestion?.id,
    });

    return () => {
      socket?.off("watch-practice-question-success");
    };
  }, [currentQuestion?.id, socket]);

  useEffect(() => {
    console.log("newQuestion : ", newQuestion);
    if (newQuestion?.Questions?.length > 0) {
      // If there is a sub-question, and currentQustion is parent quston then i should show the first child
      const firstChild = newQuestion?.Questions[0];
      const childIndex = firstChild?.questionIndex?.split(".").map(Number);
      if (childIndex && childIndex.length > 1) {
        dispatch(setCurrentQuestionIdx(childIndex[0] - 1));
        dispatch(setCurrentSubQuestionIdx(childIndex[1] - 1));
      }
    }
  }, [
    currentQuestionIdx,
    currentSubQuestionIdx,
    questions,
    dispatch,
    newQuestion,
  ]);

  return (
    <div className="flex flex-col space-y-5 lg:h-full h-fit py-5">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="w-full flex justify-between items-center mt-2 sm:mt-0">
          <h3 className="text-xs md:text-base xl:text-2xl text-[#374051] font-bold text-left w-full">
            Question
          </h3>
          <div className="sm:hidden">
            <FlagActionButton question={currentQuestion} />
          </div>
        </div>
        {Number(params?.attemptId) === Number(newQuestion?.attemptId) && (
          <div className="flex  items-center space-x-3 w-full md:w-fit">
            <ConfidenceLevel question={newQuestion} />

            <div className="hidden sm:block">
              <FlagActionButton question={currentQuestion} />
            </div>
          </div>
        )}
      </div>

      <div className="lg:h-[calc(100%-60px)] flex flex-col lg:flex-row w-full justify-between space-y-5 lg:space-y-0">
        <div
          className={twMerge(
            parentQuestion ? "lg:w-[48%]  w-full " : "w-0 overflow-hidden",
            "flex overflow-y-auto h-full text-justify"
          )}
        >
          {parentQuestion ? (
            <div className=" h-fit p-3 bg-[#F0F8FF] rounded-md   ck-content text-sm md:text-base flex items-start space-x-1">
              <p className="">{parentQuestion.questionIndex + "."}</p>

              {parentQuestion?.question && (
                <div className="h-full ">{parse(parentQuestion?.question)}</div>
              )}
            </div>
          ) : null}
        </div>
        {/* {parentQuestion ? (
          <div className="w-[2px] h-full bg-gray-300"></div>
        ) : null} */}
        <div
          className={twMerge(
            currentQuestion?.questionId ? "lg:w-[50%] w-full" : "w-full",
            "font-medium text-base text-[#374051] flex flex-col space-y-3 overflow-y-auto"
          )}
        >
          <div className="bg-[#F0F8FF]  rounded-md p-3 ">
            <div className="ck-content text-sm md:text-base flex items-start space-x-1">
              <div className="">{newQuestion?.questionIndex + "."}</div>
              <div className="">{parse(currentQuestion?.question || "")}</div>
            </div>
          </div>

          <hr />

          <Options />
        </div>
      </div>
    </div>
  );
}

const FlagActionButton = ({ question }) => {
  const { showFlagPopup } = useSelector((state) => state.flaggedQuestion);
  const { flaggedQuestions } = useSelector((state) => state.questionNavigator);
  const { course } = useSelector((state) => state.course);
  const { accessToken } = useSelector((state) => state.user);

  const flagged = flaggedQuestions?.find((q) => q.questionId === question?.id);

  const dispatch = useDispatch();

  const flagQuestion = async () => {
    const data = {
      questionId: question?.id,
      courseId: course?.course?.id,
    };
    const response = await questionFlag(data, accessToken);
    if (response?.status === 201) {
      const data = {
        questionId: question?.id,
        text: "",
      };
      dispatch(addInFlaggedQuestions(data));
    } else {
      console.error(response);
    }
  };

  const openAddTextPopup = () => {
    dispatch(openFlagPopup());
  };

  return (
    <div className="text-highlight text-xl">
      {flagged ? (
        <div
          onClick={openAddTextPopup}
          className="p-[2px] rounded-full cursor-pointer"
        >
          <IoFlag />
        </div>
      ) : (
        <div
          className="p-[2px] rounded-full cursor-pointer"
          onClick={flagQuestion}
        >
          <IoFlagOutline />
        </div>
      )}
      {showFlagPopup && <AddNotePopup />}
    </div>
  );
};

const ConfidenceLevel = ({ question }) => {
  const [difficulty, setDifficulty] = useState("");
  const { questions } = useSelector((state) => state.questions);

  const dispatch = useDispatch();

  const changeDifficulty = (difficulty) => {
    setDifficulty(difficulty);
    const socket = getSocket();
    socket?.emit("add-practice-question-difficulty", {
      difficulty,
    });

    socket?.on("add-practice-question-difficulty-success", (data) => {
      // const temp = JSON.parse(JSON.stringify(questions));
      // console.log("temp", temp);
      // const index = temp?.findIndex(
      //   (q) => q.questionId === question?.questionId
      // );
      // temp[index].difficulty = data.difficulty;
      console.log("question in changeDifficulty", question);
      const questionIndex = question.questionIndex;
      const [parentStr, childStr] = questionIndex?.split(".") || [];
      const parentId = Number(parentStr) - 1;
      const childId = childStr !== undefined ? Number(childStr) - 1 : null;

      const temp = JSON.parse(JSON.stringify(questions));
      if (!isNaN(parentId) && parentId >= 0) {
        if (childId !== null && !isNaN(childId) && childId >= 0) {
          // Nested update
          if (temp[parentId]?.Questions && temp[parentId].Questions[childId]) {
            temp[parentId].Questions[childId].difficulty = data.difficulty;
          }
        } else {
          // Top-level update
          temp[parentId].difficulty = data.difficulty;
        }
      }

      dispatch(setQuestions(temp));
    });

    return () => {
      socket?.off("add-practice-question-difficulty-success");
      socket?.off("add-practice-question-difficulty");
    };
  };

  useEffect(() => {
    if (question?.difficulty === 1) {
      setDifficulty("easy");
    } else if (question?.difficulty === 5) {
      setDifficulty("medium");
    } else if (question?.difficulty === 10) {
      setDifficulty("hard");
    } else {
      setDifficulty("");
    }
  }, [question]);

  return (
    <div className="flex items-center space-x-1 sm:space-x-3 text-sm justify-between sm:justify-start w-full md:w-fit  mt-2 sm:mt-0 ">
      <span className="whitespace-nowrap text-xs md:text-base">
        Confidence Level
      </span>

      <div className="flex items-center">
        <button
          onClick={() => changeDifficulty("easy")}
          className={twMerge(
            "py-1 px-2 md:px-4 border border-gray-200 rounded-l text-xs md:text-base",
            difficulty === "easy" &&
              "bg-primary text-white border border-primary"
          )}
        >
          Low
        </button>

        <button
          onClick={() => changeDifficulty("medium")}
          className={twMerge(
            "py-1 px-2 md:px-4 border border-gray-200 border-r-0 border-l-0 text-xs md:text-base",
            difficulty === "medium" &&
              "bg-primary text-white border border-primary border-r-0 border-l-0"
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
