import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";

import { getSocket } from "../../../../utils/socket";
import { updateAnswer } from "../../../../redux/slices/mock-quiz/mockQuestions";

const Option = ({ option, answer, index }) => {
  const dispatch = useDispatch();

  const { hasSubmitted } = useSelector((state) => state.mockQuestions);
  // console.log("option", option);
  const handleOptionClick = () => {
    const socket = getSocket();
    socket?.emit("add-option-quiz-question", {
      questionId: option?.questionId,
      optionId: option?.id,
    });
    socket?.on("add-option-quiz-question-success", (data) => {
      dispatch(
        updateAnswer({
          questionId: data?.questionId,
          updatedAnswer: data,
        })
      );
    });

    return () => {
      socket?.off("add-option-quiz-question-success");
      socket?.off("add-option-quiz-question");
    };
  };
  let border = "border border-[#E5E7EB]";
  let background = "bg-white text-slate-700 hover:bg-primary/10";
  let cursor = answer?.[0]?.hasSubmitted
    ? "cursor-not-allowed"
    : "cursor-pointer";

  // if (option?.id === answer?.[0]?.optionId) {
  //   // selected
  //   if (answer?.[0]?.hasSubmitted && !option?.RightOption) {
  //     border = "border border-red-500";
  //     background = "bg-red-500/50 text-white";
  //   } else if (answer?.[0]?.hasSubmitted && option?.RightOption) {
  //     border = "border border-green-500";
  //     background = "bg-green-500/50 text-white";
  //   } else if (!answer?.[0]?.hasSubmitted) {
  //     border = "border border-primary";
  //     background = "bg-primary/50 text-white hover:bg-primary/70";
  //   }
  // } else if (answer?.[0]?.hasSubmitted && option?.RightOption) {
  //   // correct
  //   border = "border border-green-500";
  //   background = "bg-green-500/50 hover:bg-green-500/50 text-white";
  // }

  if (hasSubmitted || answer?.[0]?.hasSubmitted) {
    cursor = "cursor-not-allowed";
    if ((answer?.[0]?.hasSubmitted || hasSubmitted) && option?.RightOption) {
      border = "border border-green-500";
      background = "bg-green-500/50 text-white";
    } else if (answer?.[0]?.optionId === option?.id) {
      border = "border border-red-500";
      background = "bg-red-500/50 text-white";
    } else {
      border = "border border-[#E5E7EB]";
      background = "bg-white text-slate-700";
    }
  } else {
    cursor = "cursor-pointer";
    if (answer?.[0]?.optionId === option?.id) {
      border = "border border-primary";
      background = "bg-primary/90 text-white hover:bg-primary/80";
    } else {
      border = "border border-[#E5E7EB] hover:bg-primary/10";
      background = "bg-white text-slate-700";
    }
  }
  let char = String.fromCharCode(65 + index);
  return (
    <div
      className={`${border} ${background} ${cursor} flex items-center justify-start rounded-md p-2 md:p-3 text-xs md:text-base  transition-all duration-200 ease-in-out `}
      onClick={handleOptionClick}
    >
      <div className="flex min-h-[30px] text-gray-600 min-w-[30px] items-center justify-center rounded-full bg-gray-100 mr-2">
        {char}
      </div>
      {parse(option?.answer)}
    </div>
  );
};

export default Option;
