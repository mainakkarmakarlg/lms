// import { useEffect, useState } from "react";
// import { twMerge } from "tailwind-merge";
// import { getSocket } from "../../../../utils/socket";
// import { useDispatch } from "react-redux";
// import { updateAnswer } from "../../../../redux/slices/mock-quiz/mockQuestions";

const QuestionBar = ({ index }) => {
  return (
    <div className="w-full flex justify-between items-center px-4">
      <h2 className="">Question {index + 1}</h2>
      {/* <div className="w-fit flex items-center justify-between  rounded-md p-3 space-x-2">
        <ConfidenceLevel question={question} />
        <FlagActionButton question={question} />
      </div> */}
    </div>
  );
};

export default QuestionBar;

// const FlagActionButton = ({ question }) => {
//   const { accessToken } = useSelector((state) => state.user);
//   const [showFlagPopup, setShowFlagPopup] = useState(false);
//   const dispatch = useDispatch();
//   const flagged = question?.UserFlags?.[0];

//   const flagQuestion = async () => {
//     const response = await questionFlagForQuiz(
//       {
//         questionId: question?.id,
//       },
//       accessToken
//     );

//     if (response?.status === 201) {
//       dispatch(
//         updateFlagged({
//           questionId: question?.id,
//           updatedFlagged: response?.data,
//         })
//       );
//     } else {
//       console.log(response);
//     }
//   };

//   const openAddTextPopup = () => {
//     setShowFlagPopup(true);
//   };

//   return (
//     <div className="text-highlight text-xl w-full">
//       {flagged ? (
//         <div
//           onClick={openAddTextPopup}
//           className="p-[2px] rounded-full cursor-pointer"
//         >
//           <IoFlag />
//         </div>
//       ) : (
//         <div
//           className="p-[2px] rounded-full cursor-pointer"
//           onClick={flagQuestion}
//         >
//           <IoFlagOutline />
//         </div>
//       )}
//       {/* {showFlagPopup && <AddNotePopup />} */}
//       {showFlagPopup && (
//         <PopupWrapper
//           onClose={() => setShowFlagPopup(false)}
//           direction="bottom"
//         >
//           <QuizAddNotePopup question={question} />
//         </PopupWrapper>
//       )}
//     </div>
//   );
// };

// const ConfidenceLevel = ({ question }) => {
//   const [difficulty, setDifficulty] = useState("");
//   const dispatch = useDispatch();

//   const changeDifficulty = (difficulty) => {
//     setDifficulty(difficulty);
//     const socket = getSocket();
//     socket?.emit("add-quiz-question-difficulty", {
//       difficulty,
//     });

//     socket?.on("add-quiz-question-difficulty-success", (data) => {
//       console.log("data of difficulty", data);
//       dispatch(
//         updateAnswer({
//           questionId: question?.id,
//           updatedAnswer: data,
//         })
//       );
//     });

//     return () => {
//       socket?.off("add-quiz-question-difficulty-success");
//       socket?.off("add-quiz-question-difficulty");
//     };
//   };

//   useEffect(() => {
//     if (question?.Answers?.[0]?.difficulty === 1) {
//       setDifficulty("easy");
//     } else if (question?.Answers?.[0]?.difficulty === 5) {
//       setDifficulty("medium");
//     } else if (question?.Answers?.[0]?.difficulty === 10) {
//       setDifficulty("hard");
//     } else {
//       setDifficulty("");
//     }
//   }, [question]);

//   return (
//     <div className="flex items-center space-x-1 sm:space-x-3 text-sm justify-between sm:justify-start w-full md:w-fit  mt-2 sm:mt-0 ">
//       <span className="whitespace-nowrap text-xs md:text-base">
//         Confidence Level
//       </span>

//       <div className="flex items-center">
//         <button
//           onClick={() => changeDifficulty("easy")}
//           className={twMerge(
//             "py-1 px-2 md:px-4 border border-gray-200 rounded-l text-xs md:text-base",
//             difficulty === "easy" &&
//               "bg-primary text-white border border-primary"
//           )}
//         >
//           Low
//         </button>

//         <button
//           onClick={() => changeDifficulty("medium")}
//           className={twMerge(
//             "py-1 px-2 md:px-4 border border-gray-200 border-r-0 border-l-0 text-xs md:text-base",
//             difficulty === "medium" &&
//               "bg-primary text-white border border-primary border-r-0 border-l-0"
//           )}
//         >
//           Medium
//         </button>

//         <button
//           onClick={() => changeDifficulty("hard")}
//           className={twMerge(
//             "py-1 px-2 md:px-4 border border-gray-200 rounded-r text-xs md:text-base",
//             difficulty === "hard" &&
//               "bg-primary text-white border border-primary"
//           )}
//         >
//           High
//         </button>
//       </div>
//     </div>
//   );
// };
