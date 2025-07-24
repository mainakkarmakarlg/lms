import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { MdClose } from "react-icons/md";

import Button from "../../../../components/common/Button";
import { setHasSubmitted } from "../../../../redux/slices/mock-quiz/mockQuestions";
import { getSocket } from "../../../../utils/socket";
import { useEffect, useState } from "react";
import getUnattemptedQuestions from "../../../../utils/mock-quiz/getUnattemptedQuestions";

const QuizConfirmSubmitPopup = ({ onRequestClose }) => {
  // const { quizId } = useSelector((state) => state.mockQuestions);
  const { attempt } = useSelector((state) => state.mockQuizes);
  const { questions } = useSelector((state) => state.mockQuestions);
  const [unattemptedQuestions, setUnattemptedQuestions] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const closePopup = () => {
    onRequestClose();
  };

  useEffect(() => {
    const newUnattemptedQuestions = getUnattemptedQuestions(questions);
    setUnattemptedQuestions(newUnattemptedQuestions?.unAttemptedQuestions);
    setTotalQuestions(
      newUnattemptedQuestions?.totalQuestionIncludeSubQuestions
    );
  }, [questions]);

  const goToResult = () => {
    const socket = getSocket();
    socket?.emit("submit-quiz-attempt");
    socket?.on("submit-quiz-attempt-success", () => {
      dispatch(setHasSubmitted(true));
    });
    closePopup();
    if (attempt?.Quiz?.resultType === "aftersubmit") {
      navigate(
        `/mock-quiz/result/${params?.attemptId}/${params?.combination}/${params?.phone}`
      );
    } else if (attempt?.Quiz?.resultType === "aftertime") {
      navigate(
        `/mock-quiz/waiting/${params?.attemptId}/${params?.combination}/${params?.phone}`
      );
    } else {
      navigate(`/mock-quiz/${params?.combination}/${params?.phone}`);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div className="w-full h-fit bg-white dark:bg-blackish z-50 rounded-md shadow-custom-sm flex flex-col relative space-y-5 p-5 md:p-10 items-center justify-center">
        <div
          onClick={() => closePopup()}
          className="cursor-pointer absolute top-2 right-2 hover:bg-gray-200 dark:hover:bg-slate-600 p-1 rounded"
        >
          <MdClose className="text-xl" />
        </div>

        <div className="w-full h-[70px] flex items-center justify-center">
          <div className="w-[70px] h-[70px] rounded-full border-2 border-highlight-400 flex items-center justify-center">
            <span className="text-highlight-400 text-6xl">?</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center">Confirm Submission</h1>

        <p className="text-center text-sm">
          Once you hit submit, you can&apos;t return and modify your exam
          answers. Are you sure you&apos;re done here?
        </p>

        <AttemptedOrUnattemptedBoxs
          unattemptedQuestions={unattemptedQuestions}
          totalQuestions={totalQuestions}
        />

        {unattemptedQuestions?.length > 0 && (
          <UnattemptedQuestions unAttempted={unattemptedQuestions} />
        )}

        <Button color="primary" size="medium" onClick={goToResult}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default QuizConfirmSubmitPopup;

const UnattemptedQuestions = ({ unAttempted }) => {
  return (
    <>
      {unAttempted?.length > 0 && (
        <div className="w-full h-fit p-2 bg-sky-100 rounded-md shadow-subject space-y-2 2xl:space-y-4">
          <h1 className="text-lg font-semibold text-custom-black text-center">
            Unattempted Questions
          </h1>
          <div className="w-full max-h-[300px] overflow-y-auto flex flex-wrap justify-center items-center ">
            {unAttempted.map((index) => (
              <div
                key={index}
                className="flex items-center justify-center w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]   rounded-full m-1"
              >
                <p className="text-[10px] lg:text-xs">{index}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const AttemptedOrUnattemptedBoxs = ({
  unattemptedQuestions,
  totalQuestions,
}) => {
  const statsArray = [
    {
      name: "Total",
      count: totalQuestions,
      bg: "bg-blue-200",
      text: "text-blue-800",
    },
    {
      name: "Attempted",
      count: totalQuestions - unattemptedQuestions?.length,
      bg: "bg-green-200",
      text: "text-green-800",
    },
    {
      name: "Unattempted",
      count: unattemptedQuestions?.length,
      bg: "bg-gray-200",
      text: "text-gray-600",
    },
  ];

  return (
    <div className="w-full h-fit  space-y-4">
      <div className="w-full flex flex-wrap justify-between space-x-3">
        {statsArray.map((item) => (
          <div
            key={item.name}
            className={`flex flex-col items-center justify-center w-[120px] px-3 py-2 rounded-xl ${item.bg} ${item.text} shadow-sm`}
          >
            <p className="text-xs font-semibold">{item.name}</p>
            <p className="text-sm font-bold">{item.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
