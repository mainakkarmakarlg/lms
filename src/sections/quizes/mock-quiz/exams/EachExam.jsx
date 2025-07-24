import { MdTimer } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import ProgressBar from "../../../../components/common/ProgressBar";
import Button from "../../../../components/common/Button";
import { useState } from "react";
import PopupWrapper from "../../../../components/common/PopupWraper";
import { formatDuration } from "../../../../utils/common/formatDuration";
import StartQuizPopup from "../../../../components/quizes/mock-quiz/StartQuizPopup";
import { getSocket } from "../../../../utils/socket";
import { useDispatch } from "react-redux";
import { setAttempt } from "../../../../redux/slices/mock-quiz/mockQuiz";
import { setMockQuestions } from "../../../../redux/slices/mock-quiz/mockQuestions";
import { useNavigate, useParams } from "react-router-dom";
import DisclaimerPopup from "../popups/DIsclaimerPopup";
import { convertToTimeAgo } from "../../../../utils/common/dateTime";

const identifyQuiz = (quiz) => {
  let showStart = false;
  let showResume = false;
  let showStartOver = false;
  let showResult = false;
  let allUnSubmittedAttempts = [];
  let allSubmittedAttempts = [];
  let showExpired = false;

  if (quiz) {
    if (quiz?.attemptType === "single") {
      if (quiz?.Attempts?.length > 0) {
        showStartOver = false;
        showStart = false;
        if (quiz?.Attempts[0].hasSubmitted) {
          allSubmittedAttempts.push(quiz?.Attempts[0]);
          showResume = false;
          if (quiz?.resultType === "never") {
            showResult = false;
          } else {
            showResult = true;
          }
        } else {
          allUnSubmittedAttempts.push(quiz?.Attempts[0]);
          showResume = true;
          showResult = false;
        }
      } else {
        showResume = false;
        showResult = false;
        showStartOver = false;
        showStart = true;
      }
    } else if (quiz?.attemptType === "multiple") {
      for (let i = 0; i < quiz?.Attempts?.length; i++) {
        if (!quiz?.Attempts[i].hasSubmitted) {
          allUnSubmittedAttempts.push(quiz?.Attempts[i]);
        } else {
          allSubmittedAttempts.push(quiz?.Attempts[i]);
        }
      }

      if (allSubmittedAttempts.length > 0) {
        if (quiz?.resultType === "never") {
          showResult = false;
        } else {
          showResult = true;
        }
      }

      if (allUnSubmittedAttempts.length > 0) {
        showResume = true;
      }

      if (
        allSubmittedAttempts.length === 0 &&
        allUnSubmittedAttempts.length === 0
      ) {
        showStart = true;
      } else {
        showStartOver = true;
      }
    } else if (quiz?.attemptType === "repeat") {
      if (quiz?.Attempts?.length > 0) {
        if (quiz?.Attempts[0].hasSubmitted) {
          showResume = false;
          showStartOver = false;
          showStart = false;
          if (quiz?.resultType === "never") {
            showResult = false;
          } else {
            showResult = true;
          }
        } else {
          showResume = true;
          showStartOver = false;
          showStart = false;
          showResult = false;
        }
      } else {
        showResume = false;
        showStart = true;
        showResult = false;
        showStartOver = false;
      }
    } else if (!isNaN(Number(quiz?.attemptType))) {
      if (quiz?.Attempts?.length === Number(quiz?.attemptType)) {
        showStartOver = false;
      } else {
        if (quiz?.Attempts?.length > 0) {
          showStartOver = true;
        } else {
          if (quiz?.Quizzes?.length === 0) {
            showStart = true;
          }
        }
      }

      for (let i = 0; i < quiz?.Attempts?.length; i++) {
        if (!quiz?.Attempts[i].hasSubmitted) {
          allUnSubmittedAttempts.push(quiz?.Attempts[i]);
        } else {
          allSubmittedAttempts.push(quiz?.Attempts[i]);
        }
      }

      if (quiz?.Attempts?.length === Number(quiz?.attemptType)) {
        showStartOver = false;
        showStart = false;

        if (allSubmittedAttempts.length > 0) {
          if (quiz?.resultType === "never") {
            showResult = false;
          } else {
            showResult = true;
          }
        }

        if (allUnSubmittedAttempts.length > 0) {
          showResume = true;
        }
      } else {
        if (allSubmittedAttempts.length > 0) {
          showStartOver = true;
          showStart = false;
        }
        if (allUnSubmittedAttempts.length > 0) {
          showResume = true;
          showStart = false;
          showStartOver = true;
        }
        if (
          allSubmittedAttempts.length === 0 &&
          allUnSubmittedAttempts.length === 0
        ) {
          showStart = true;
        }
      }

      if (allSubmittedAttempts.length > 0) {
        showResult = true;
      }

      if (allUnSubmittedAttempts.length > 0) {
        showResume = true;
      }

      // if (quiz?.Attempts?.length > 0) {
      //   showStart = false;
      // } else {
      //   showStart = true;
      // }
    }

    if (quiz?.endTime && new Date() > new Date(quiz?.endTime)) {
      // quiz ended
      showResume = false;
      showStartOver = false;
      if (allSubmittedAttempts.length > 0 && quiz?.resultType !== "never") {
        showResult = true;
      } else {
        showResult = false;
        showExpired = true;
      }
    } else if (quiz?.startTime && new Date() < new Date(quiz?.startTime)) {
      // quiz not started
      showResume = false;
      showStartOver = false;
      showResult = false;
    }
  }

  return {
    showResume,
    showStartOver,
    showStart,
    showResult,
    allSubmittedAttempts: [...allSubmittedAttempts].reverse(),
    allUnSubmittedAttempts: [...allUnSubmittedAttempts].reverse(),
    showExpired,
  };
};

// const identifyQuizOptimized = (quiz) => {
//   const result = {
//     showResume: false,
//     showStartOver: false,
//     showStart: false,
//     showResult: false,
//     allSubmittedAttempts: [],
//     allUnSubmittedAttempts: [],
//     showExpired: false,
//   };

//   if (!quiz) return result;

//   const attempts = quiz.Attempts || [];
//   const isSubmitted = (a) => a.hasSubmitted;
//   const maxAttempts = !isNaN(Number(quiz.attemptType))
//     ? Number(quiz.attemptType)
//     : null;

//   result.allSubmittedAttempts = attempts.filter(isSubmitted).reverse();
//   result.allUnSubmittedAttempts = attempts
//     .filter((a) => !isSubmitted(a))
//     .reverse();

//   const hasSubmitted = result.allSubmittedAttempts.length > 0;
//   const hasUnsubmitted = result.allUnSubmittedAttempts.length > 0;
//   const attemptCount = attempts.length;

//   const canShowResult = quiz.resultType !== "never" && hasSubmitted;

//   const now = new Date();
//   const quizEnd = quiz.endTime && new Date(quiz.endTime);
//   const quizStart = quiz.startTime && new Date(quiz.startTime);

//   // Handle not started or expired cases
//   if (quizEnd && now > quizEnd) {
//     result.showResult = canShowResult;
//     result.showExpired = !canShowResult;
//     return result;
//   }

//   if (quizStart && now < quizStart) {
//     return result;
//   }

//   switch (quiz.attemptType) {
//     case "single":
//       if (attemptCount === 0) {
//         result.showStart = true;
//       } else {
//         const first = attempts[0];
//         if (first.hasSubmitted) {
//           result.showResult = canShowResult;
//         } else {
//           result.showResume = true;
//         }
//       }
//       break;

//     case "multiple":
//       if (!hasSubmitted && !hasUnsubmitted) {
//         result.showStart = true;
//       } else {
//         result.showResume = hasUnsubmitted;
//         result.showStartOver = true;
//         result.showResult = canShowResult;
//       }
//       break;

//     case "repeat":
//       if (attemptCount === 0) {
//         result.showStart = true;
//       } else {
//         const first = attempts[0];
//         if (first.hasSubmitted) {
//           result.showResult = canShowResult;
//         } else {
//           result.showResume = true;
//         }
//       }
//       break;

//     default:
//       if (maxAttempts !== null) {
//         if (attemptCount === maxAttempts) {
//           result.showResume = hasUnsubmitted;
//           result.showResult = canShowResult;
//         } else {
//           if (!hasSubmitted && !hasUnsubmitted) {
//             result.showStart = true;
//           } else {
//             result.showResume = hasUnsubmitted;
//             result.showStartOver = hasSubmitted || hasUnsubmitted;
//             result.showResult = canShowResult;
//           }
//         }
//       }
//       break;
//   }

//   return result;
// };

const calculateProgress = (quiz) => {
  let percentage = 0;
  let totalQuestions = 0;
  let attemptedQuestions = 0;

  if (quiz?.Quizzes?.length > 0) {
    let total = 0;
    let attempted = 0;

    for (let i = 0; i < quiz?.Quizzes?.length; i++) {
      total += quiz?.Quizzes[i]?.questionCount;
      attempted += quiz?.Quizzes[i]?.attemptCount;
    }

    totalQuestions = total;
    attemptedQuestions = attempted;
    percentage =
      totalQuestions > 0 ? (attemptedQuestions / totalQuestions) * 100 : 0;
  } else if (quiz) {
    totalQuestions = quiz?.questionCount;
    attemptedQuestions = quiz?.attemptCount;
    percentage =
      totalQuestions > 0 ? (attemptedQuestions / totalQuestions) * 100 : 0;
  }
  return { percentage, totalQuestions, attemptedQuestions };
};

const EachExam = ({ quiz }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [action, setAction] = useState("");

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const startQuiz = (data) => {
    const socket = getSocket();
    // if(quiz?.)
    if (data?.attemptId) {
      socket.emit("make-quiz-attempt", {
        quizId: quiz?.id,
        attemptId: data?.attemptId,
      });
    } else {
      socket.emit("make-quiz-attempt", {
        quizId: quiz?.id,
      });
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
  };

  const handleStartOver = () => {
    if (quiz?._count?.Questions === 0) {
      const { combination, phone } = params;
      navigate(`/mock-quiz/no-questions/${combination}/${phone}`);
    } else {
      if (quiz?.attemptType === "multiple") {
        if (allUnSubmittedAttempts?.length > 0) {
          setAction("start-over-multiple");
          setShowPopup(true);
        } else {
          setShowDisclaimer(true); // <-- show disclaimer
        }
      } else if (quiz?.attemptType === "repeat") {
        if (allUnSubmittedAttempts?.length > 0) {
          setAction("start-over-repeat");
          setShowPopup(true);
        } else {
          setShowDisclaimer(true); // <-- show disclaimer
        }
      } else {
        setShowDisclaimer(true); // <-- show disclaimer
      }
    }
  };

  const handleResult = () => {
    if (allSubmittedAttempts?.length === 1) {
      navigate(
        `/mock-quiz/result/${allSubmittedAttempts[0]?.id}/${params?.combination}/${params?.phone}`
      );
    } else {
      setAction("result");
      setShowPopup(true);
    }
    // Logic to show result
  };

  const handleResume = () => {
    if (allUnSubmittedAttempts?.length === 1) {
      startQuiz({
        attemptId: allUnSubmittedAttempts[0]?.id,
        quizId: quiz?.id,
      });
    } else {
      setShowPopup(true);
      setAction("resume");
    }
  };

  const {
    allSubmittedAttempts,
    allUnSubmittedAttempts,
    showResume,
    showStartOver,
    showResult,
    showExpired,
    showStart,
  } = identifyQuiz(quiz);

  console.log("quiz", quiz);

  const { totalQuestions, attemptedQuestions, percentage } =
    calculateProgress(quiz);

  // const daysDiffance = (createdAt) => {
  //   const date = new Date(createdAt);
  //   const today = new Date();
  //   const timeDiff = today.getTime() - date.getTime();
  //   const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
  //   return daysDiff;
  // };
  // const daysDif = daysDiffance(quiz?.Attempts?.[0]?.createdAt);

  return (
    <div className="w-full p-4 rounded-lg bg-white shadow flex flex-col justify-between h-[200px]">
      {/* first div */}
      <div className="w-full flex flex-col space-y-2">
        <h2 className="tetx-lg text-slate-700 font-bold">{quiz?.name}</h2>
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500 space-x-1">
            <span>
              <CiCalendarDate size={15} />
            </span>
            {quiz?.Attempts?.length > 0 ? (
              <span>
                Last attempted{" "}
                {convertToTimeAgo(
                  quiz?.Attempts?.reduce((latest, curr) => {
                    return new Date(curr.updatedAt) > new Date(latest.updatedAt)
                      ? curr
                      : latest;
                  })?.updatedAt
                )}
              </span>
            ) : (
              <span>Not attempted yet</span>
            )}
          </div>
          <div className="flex items-center text-xs text-gray-500 space-x-1">
            <MdTimer size={15} />
            <span>{formatDuration(quiz?.duration)}</span>
          </div>
        </div>
      </div>

      {/* second div */}

      <div className="w-full">
        <p className="text-xs text-gray-500">{quiz?.Meta?.shortDescription}</p>
      </div>

      <div>
        <ProgressBar
          startValue={attemptedQuestions}
          endValue={totalQuestions}
          percentage={percentage}
          filledColor="#2C6FBB"
          height="5px"
        />
      </div>

      {/* third div */}
      <div className="w-full flex items-center space-x-2 ">
        {quiz?.Quizzes?.length > 0 && (
          <Button
            color="primary"
            size="small"
            variant="contained"
            onClick={() =>
              navigate(
                `/mock-quiz/${quiz?.id}/${params?.combination}/${params?.phone}`
              )
            }
          >
            View
          </Button>
        )}
        {showResume && (
          <Button onClick={handleResume} color="neutral" size="small">
            Resume
          </Button>
        )}

        {showStartOver && (
          <Button
            color="primary"
            size="small"
            variant="contained"
            onClick={handleStartOver}
          >
            Start Over
          </Button>
        )}

        {showStart && (
          <Button
            color="primary"
            size="small"
            variant="contained"
            onClick={handleStartOver}
          >
            Start
          </Button>
        )}

        {showResult && (
          <Button
            color="highlight"
            size="small"
            variant="contained"
            onClick={handleResult}
          >
            Result
          </Button>
        )}

        {showExpired && (
          <Button color="neutral" size="small" variant="outlined">
            Expired
          </Button>
        )}
      </div>

      {showPopup && (
        <PopupWrapper onClose={() => setShowPopup(false)} direction="bottom">
          <StartQuizPopup
            allSubmittedAttempts={allSubmittedAttempts}
            allUnSubmittedAttempts={allUnSubmittedAttempts}
            action={action}
            quizId={quiz?.id}
          />
        </PopupWrapper>
      )}

      {showDisclaimer && (
        <PopupWrapper
          onClose={() => setShowDisclaimer(false)}
          direction="bottom"
        >
          <DisclaimerPopup
            onRequestClose={() => setShowDisclaimer(false)}
            onUnderstand={() => {
              setShowDisclaimer(false);
              startQuiz({ quizId: quiz?.id }); // now start the quiz
            }}
            showStartCancelButton={true}
          />
        </PopupWrapper>
      )}
    </div>
  );
};

export default EachExam;
