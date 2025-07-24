import { useDispatch } from "react-redux";
import { getSocket } from "../../../utils/socket";
import Button from "../../common/Button";
import { setMockQuestions } from "../../../redux/slices/mock-quiz/mockQuestions";
import { setAttempt } from "../../../redux/slices/mock-quiz/mockQuiz";
import { useNavigate, useParams } from "react-router-dom";
import Lists from "../../common/lists/Lists";
import { convertTimeForAttempts } from "../../../utils/converTimeForAttempts";
import { convertToTimeAgo } from "../../../utils/common/dateTime";

const StartQuizPopup = ({
  allSubmittedAttempts,
  allUnSubmittedAttempts,
  onRequestClose,
  quizId,
  action,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const handleStartQuiz = (data) => {
    // 🔥 Do your start quiz logic here
    const socket = getSocket();
    if (data?.attemptId) {
      socket.emit("make-quiz-attempt", { quizId, attemptId: data?.attemptId });
    } else {
      socket.emit("make-quiz-attempt", { quizId });
    }

    socket.once("make-quiz-attempt-success", (data) => {
      const attemptId = data?.attempt?.id;
      dispatch(setAttempt(data?.attempt));
      socket.emit("give-quiz-questions");

      socket.once("give-quiz-questions-success", (data) => {
        dispatch(setMockQuestions(data));
        const { combination, phone } = params;
        navigate(`/mock-quiz/attempt/${attemptId}/${combination}/${phone}`);
      });
    });
    // 👇 Then trigger popup close with animation
    onRequestClose();
  };

  const handleAttemptClick = (attemptId) => {
    const { combination, phone } = params;
    if (action === "resume") {
      handleStartQuiz({ quizId, attemptId });
    } else if (
      action === "start-over-multiple" ||
      action === "start-over-repeat"
    ) {
      handleStartQuiz({ quizId });
    } else if (action === "result") {
      navigate(`/mock-quiz/result/${attemptId}/${combination}/${phone}`);
    } else {
      navigate(`/mock-quiz/attempt/${attemptId}/${combination}/${phone}`);
    }
  };

  // console.log("allUnSubmittedAttempts", allUnSubmittedAttempts?.reverse());

  return (
    <div className="w-full h-full flex flex-col space-y-2">
      {(action === "start-over-multiple" || action === "start-over-repeat") && (
        <h1 className="text-lg font-bold text-gray-700">
          Are you sure you want to start over?
        </h1>
      )}

      {action === "start-over-multiple" &&
        allUnSubmittedAttempts?.length > 0 && (
          <p className="text-sm text-gray-500">
            You have below attempts left unsubmitted
          </p>
        )}

      {action === "start-over-repeat" && allSubmittedAttempts?.length > 0 && (
        <p className="text-sm text-gray-500">
          By clicking start over your previous attempts will be deleted
        </p>
      )}

      {action === "resume" && allUnSubmittedAttempts?.length > 1 && (
        <p className="text-sm text-gray-500">
          You have below attempts left unsubmitted to resume click on any one
        </p>
      )}

      {action === "result" && allSubmittedAttempts?.length > 1 && (
        <p className="text-sm text-gray-500">
          Please click on any of the below submitted attempts to see result
        </p>
      )}

      {(action === "resume" || action === "start-over-multiple") &&
        allUnSubmittedAttempts?.length > 0 && (
          <Lists className={"w-full max-h-[400px] overflow-y-scroll"}>
            {allUnSubmittedAttempts?.map((attempt, idx) => (
              <div
                key={attempt.id}
                className="border rounded-md p-2 space-y-1 cursor-pointer hover:bg-gray-100"
                onClick={() => handleAttemptClick(attempt.id)}
              >
                <p className="text-sm">
                  Attempt #{allUnSubmittedAttempts.length - idx}
                </p>
                <div className="text-sm w-full flex items-center justify-between text-slate-500">
                  <span>{convertTimeForAttempts(attempt.createdAt)}</span>
                  <span>{convertToTimeAgo(attempt.updatedAt)}</span>
                </div>
              </div>
            ))}
          </Lists>
        )}

      {action === "result" && allSubmittedAttempts?.length > 0 && (
        <Lists className={"w-full max-h-[400px] overflow-y-scroll"}>
          {allSubmittedAttempts?.map((attempt, idx) => (
            <div
              key={attempt.id}
              className="border rounded-md p-2 space-y-1 cursor-pointer hover:bg-gray-100"
              onClick={() => handleAttemptClick(attempt.id)}
            >
              <p className="text-sm">
                Attempt #{allSubmittedAttempts.length - idx}
              </p>
              <div className="text-sm w-full flex items-center justify-between text-slate-500">
                <span>{convertTimeForAttempts(attempt.createdAt)}</span>
                <span>{convertToTimeAgo(attempt.updatedAt)}</span>
              </div>
            </div>
          ))}
        </Lists>
      )}

      <div className="w-full flex items-center justify-end space-x-3">
        <Button
          color="neutral"
          size="small"
          variant="outlined"
          onClick={onRequestClose}
        >
          Cancel
        </Button>

        {action?.includes("start-over") &&
          allUnSubmittedAttempts?.length > 0 && (
            <Button color="primary" size="small" onClick={handleStartQuiz}>
              Start Over
            </Button>
          )}
      </div>
    </div>
  );
};
export default StartQuizPopup;
