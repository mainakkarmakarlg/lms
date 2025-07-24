import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSocket } from "../../../../../utils/socket";
import {
  closeConfirmSubmit,
  setHasSubmitted,
} from "../../../../../redux/slices/practice-quiz/practiceQuiz";
import { MdClose } from "react-icons/md";
import Button from "../../../../common/Button";
import UnattemptedQuestions from "./UnattemptedQuestions";

const ConfirmSubmitPopup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const closePopup = () => {
    dispatch(closeConfirmSubmit());
  };

  const goToResult = () => {
    const socket = getSocket();
    socket?.emit("submit-practice-attempt");
    socket?.on("submit-practice-attempt-success", () => {
      dispatch(setHasSubmitted(true));
    });
    closePopup();
    navigate(
      `/practice-quiz/result/${params?.attemptId}/${params?.combination}/${params?.phone}`
    );
  };

  return (
    <div className="fixed top-0 left-0 z-50 h-screen w-screen flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-center relative">
        <div className="w-[90%] md:w-[50%] lg:w-[40%] h-fit bg-white dark:bg-blackish z-50 rounded-md shadow-custom-sm flex flex-col relative space-y-5 p-5 md:p-10 items-center justify-center">
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

          <UnattemptedQuestions />

          <Button color="primary" size="medium" onClick={goToResult}>
            Submit
          </Button>
        </div>
      </div>
      <div
        onClick={closePopup}
        className="absolute top-0 left-0 h-full w-full bg-black opacity-40 z-40 "
      ></div>
    </div>
  );
};

export default ConfirmSubmitPopup;
