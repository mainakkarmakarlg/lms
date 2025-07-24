// import { useDispatch, useSelector } from "react-redux";
// import { getSocket } from "../../utils/socket";
// import { useCallback, useEffect, useState } from "react";
// import {
//   addInAnswers,
//   setSelectedOption,
//   updateCurrentQuestion,
// } from "../../redux/slices/practice-quiz/questions";
// import { updateCurrentNavigatorQuestion } from "../../redux/slices/practice-quiz/questionNavigator";
// import parse from "html-react-parser";

// export default function Options() {
//   const { currentQuestionIdx, questions, answers } = useSelector(
//     (state) => state.questions
//   );
//   const { hasSubmitted } = useSelector((state) => state.practiceQuiz);
//   const [selectedOptionId, setSelectedOptionId] = useState();

//   const question = questions[currentQuestionIdx];
//   const socket = getSocket();

//   const dispatch = useDispatch();

//   const getAnswer = useCallback(() => {
//     const questionId = question?.Question?.id;
//     const answerExists = answers?.find(
//       (answer) => answer.questionId === questionId
//     );

//     if (answerExists) {
//       return;
//     }

//     socket?.on("watch-practice-question-success", () => {
//       socket?.emit("get-practice-question-explaination", {
//         questionId,
//       });
//     });

//     socket?.on("get-practice-question-explaination-success", (data) => {
//       const option = data?.Option?.find(
//         (option) => option.RightOption !== null
//       );

//       if (option) {
//         const answer = {
//           questionId,
//           answer: option?.RightOption?.optionId,
//           explanation: data?.Explaination,
//           Option: data?.Option,
//         };
//         dispatch(addInAnswers(answer));
//       }
//     });
//   }, [dispatch, question, socket, answers]);

//   useEffect(() => {
//     if (question?.optionId) {
//       setSelectedOptionId(question?.optionId);
//     }
//   }, [currentQuestionIdx, question]);

//   useEffect(() => {
//     dispatch(
//       updateCurrentQuestion({ ...question, optionId: selectedOptionId })
//     );
//     dispatch(
//       updateCurrentNavigatorQuestion({
//         ...question,
//         optionId: selectedOptionId,
//       })
//     );
//     dispatch(
//       setSelectedOption({
//         questionId: question?.Question?.id,
//         answer: selectedOptionId,
//       })
//     );
//   }, [selectedOptionId]);

//   useEffect(() => {
//     if (hasSubmitted) {
//       getAnswer();
//     }

//     return () => {
//       socket?.off("get-practice-question-explaination-success");
//     };
//   }, [hasSubmitted, currentQuestionIdx, getAnswer, socket]);

//   return (
//     <div className="flex items-center space-y-3 pb-4 flex-col">
//       <div className="flex items-center justify-between w-full">
//         <span className="text-[#6C7180] font-bold xl:text-base text-sm">
//           Options
//         </span>
//       </div>
//       <div className="w-full mt-10 flex flex-col items-center space-y-5">
//         {question?.Question?.Option?.map((option, idx) => (
//           <EachOption
//             key={option.id}
//             option={option}
//             idx={idx}
//             isSelected={selectedOptionId === option.id} // Check if this option is selected
//             setSelectedOptionId={setSelectedOptionId} // Pass setter function
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// const EachOption = ({ option, idx, isSelected, setSelectedOptionId }) => {
//   const { hasSubmitted } = useSelector((state) => state.practiceQuiz);
//   const { answers, submittedQuestions } = useSelector(
//     (state) => state.questions
//   );
//   const char = String.fromCharCode(65 + idx);
//   const socket = getSocket();

//   let border = "border border-[#E5E7EB]";
//   let background = "bg-white text-slate-700";
//   let cursor = hasSubmitted ? "cursor-not-allowed" : "cursor-pointer";

//   const correctOption = answers?.find((answer) => answer.answer === option.id);
//   const isCorrect = correctOption?.answer === option.id;

//   if (isSelected) {
//     border = "border border-primary";
//     background = "bg-primary/50";
//   }

//   if (hasSubmitted || submittedQuestions?.includes(option.questionId)) {
//     if (isSelected && !isCorrect) {
//       border = "border border-danger";
//       background = "bg-danger/50";
//     }

//     if (isCorrect) {
//       border = "border border-success";
//       background = "bg-success/50";
//     }
//   }

//   const handleOptionClick = () => {
//     if (hasSubmitted || submittedQuestions?.includes(option.questionId)) {
//       return;
//     }
//     // Update selected option in parent state

//     // Emit socket event
//     socket?.emit("add-option-practice-question", {
//       questionId: option.questionId,
//       optionId: option.id,
//     });

//     socket?.on("add-option-practice-question-success", () => {
//       setSelectedOptionId(option.id);
//     });
//   };

//   return (
//     <div
//       className={`h-fit w-full p-2 rounded-md ${border} ${background} ${cursor}`}
//       onClick={handleOptionClick}
//     >
//       <div className="flex items-center space-x-2">
//         <div className="min-h-[30px] min-w-[30px] w-[30px] h-[30px] flex items-center justify-center rounded-full bg-gray-100">
//           {char}
//         </div>
//         <div className="text-sm md:text-base ">{parse(option?.answer)}</div>
//       </div>
//     </div>
//   );
// };

import { useDispatch, useSelector } from "react-redux";
import { getSocket } from "../../../../utils/socket";
import { useCallback, useEffect, useState } from "react";
import {
  // addInAnswers,
  setSelectedOption,
  updateCurrentQuestion,
} from "../../../../redux/slices/practice-quiz/questions";
import { updateCurrentNavigatorQuestion } from "../../../../redux/slices/practice-quiz/questionNavigator";
import parse from "html-react-parser";
import findCurrentQuestion from "../../../../utils/quizes/practice-quiz/findCurrentQuestion";

export default function Options() {
  const dispatch = useDispatch();
  const socket = getSocket();
  const { currentQuestionIdx, currentSubQuestionIdx, questions } = useSelector(
    (state) => state.questions
  );
  const { hasSubmitted } = useSelector((state) => state.practiceQuiz);

  const question = findCurrentQuestion(
    questions,
    currentQuestionIdx,
    currentSubQuestionIdx
  );
  // questions[currentQuestionIdx];

  console.log("question", question);
  const [selectedOptionId, setSelectedOptionId] = useState(
    question?.optionId || null
  );

  // const getAnswer = useCallback(() => {
  //   if (hasSubmitted) {
  //     const questionId = question?.Question?.id;
  //     if (
  //       !questionId ||
  //       answers?.some((answer) => answer.questionId === questionId)
  //     )
  //       return;

  //     socket?.on("watch-practice-question-success", () => {
  //       socket?.emit("get-practice-question-explaination", { questionId });
  //     });

  //     socket?.on("get-practice-question-explaination-success", (data) => {
  //       const correctOption = data?.Option?.find(
  //         (opt) => opt.RightOption !== null
  //       );
  //       if (correctOption) {
  //         dispatch(
  //           addInAnswers({
  //             questionId,
  //             answer: correctOption.RightOption.optionId,
  //             explanation: data?.Explaination,
  //             Option: data?.Option,
  //           })
  //         );
  //       }
  //     });
  //   }

  //   return () => {
  //     socket?.off("get-practice-question-explaination-success");
  //     socket?.off("watch-practice-question-success");
  //   };
  // }, [dispatch, socket, hasSubmitted]);

  useEffect(() => {
    dispatch(
      updateCurrentQuestion({ ...question, optionId: selectedOptionId })
    );
    dispatch(
      updateCurrentNavigatorQuestion({
        ...question,
        optionId: selectedOptionId,
      })
    );
    dispatch(
      setSelectedOption({
        questionId: question?.Question?.id,
        answer: selectedOptionId,
      })
    );
  }, [selectedOptionId, dispatch]);

  useEffect(() => {
    if (question?.optionId) {
      setSelectedOptionId(question.optionId);
      dispatch(
        setSelectedOption({
          questionId: question?.Question?.id,
          answer: question?.optionId,
        })
      );
    }
  }, [currentQuestionIdx, currentSubQuestionIdx, question, dispatch]);

  // useEffect(() => {
  //   getAnswer();
  // }, [getAnswer]);

  const handleOptionClick = useCallback(
    (optionId) => {
      if (hasSubmitted) return;
      const newSelection = selectedOptionId === optionId ? null : optionId; // Toggle selection
      setSelectedOptionId(newSelection);
      dispatch(
        setSelectedOption({
          questionId: question?.Question?.id,
          answer: newSelection,
        })
      );
      socket?.emit("add-option-practice-question", {
        questionId: question?.Question?.id,
        optionId: newSelection,
      });
    },
    [selectedOptionId, hasSubmitted, question, socket, dispatch]
  );

  return (
    <div className="flex flex-col items-center space-y-3 pb-4">
      <div className="flex w-full items-center justify-between">
        <span className="text-[#6C7180] font-bold xl:text-base text-sm">
          Options
        </span>
      </div>
      <div className="mt-10 flex w-full flex-col items-center space-y-5">
        {question?.Question?.Option?.map((option, idx) => (
          <EachOption
            key={option.id}
            option={option}
            idx={idx}
            isSelected={selectedOptionId === option.id}
            onSelect={handleOptionClick}
            question={question}
          />
        ))}
      </div>
    </div>
  );
}

const EachOption = ({ option, idx, isSelected, onSelect, question }) => {
  const { hasSubmitted } = useSelector((state) => state.practiceQuiz);
  const { answers, submittedQuestions } = useSelector(
    (state) => state.questions
  );

  const char = String.fromCharCode(65 + idx);
  let border = "border border-[#E5E7EB]";
  let background = "bg-white text-slate-700";
  let cursor = hasSubmitted ? "cursor-not-allowed" : "cursor-pointer";
  console.log("option?.RightOption?.optionId", option?.RightOption?.optionId);
  const correctOption = answers?.find((answer) => answer.answer === option.id);
  const isCorrect =
    correctOption?.answer === option.id ||
    option?.RightOption?.optionId === option.id;

  if (isSelected) {
    border = "border border-primary";
    background = "bg-primary/50";
  }

  if (
    hasSubmitted ||
    submittedQuestions?.includes(option.questionId) ||
    question?.hasSubmitted
  ) {
    if (isSelected && !isCorrect) {
      border = "border border-danger";
      background = "bg-danger/50";
    }

    if (isCorrect) {
      border = "border border-success";
      background = "bg-success/50";
    }

    cursor = "cursor-not-allowed";
  }

  return (
    <div
      className={`w-full p-2 rounded-md ${border} ${background} ${cursor}`}
      onClick={() =>
        !hasSubmitted &&
        !submittedQuestions?.includes(option.questionId) &&
        !question?.hasSubmitted &&
        onSelect(option.id)
      }
    >
      <div className="flex items-center space-x-2">
        <div className="flex min-h-[30px] min-w-[30px] items-center justify-center rounded-full bg-gray-100">
          {char}
        </div>
        <div className="text-sm md:text-base">{parse(option?.answer)}</div>
      </div>
    </div>
  );
};
