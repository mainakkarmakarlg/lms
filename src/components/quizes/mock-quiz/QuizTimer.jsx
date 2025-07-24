import { useEffect, useState } from "react";

import { FaRegClock } from "react-icons/fa";

import formatTimeInHHMMSS from "../../../utils/common/formatTimeInHHMMSS";
import { useSelector } from "react-redux";
import getServerTime from "../../../apiCalls/quiz/getServerTime";

const QuizTimer = ({ hasSubmitted }) => {
  const { attempt } = useSelector((state) => state.mockQuizes);
  const [time, setTime] = useState();

  // useEffect(() => {
  //   const { timeTaken, Quiz: quiz } = attempt;
  //   if (hasSubmitted) {
  //     setTime(formatTimeInHHMMSS(timeTaken * 1000));
  //   } else {
  //     const getTime = async () => {
  //       const serverTime = await getServerTime();
  //       return serverTime;
  //     };
  //     const now = getTime();
  //     console.log(now);
  //     if (quiz?.timeType === "duration") {
  //       //we need to - timetaken + now from duration i can do anticlockwise logic and and count it down every second
  //       let remainingTime = quiz?.duration - timeTaken;
  //       const interval = setInterval(() => {
  //         remainingTime -= 1;
  //         if (remainingTime <= 0) {
  //           clearInterval(interval);
  //           setTime("00:00:00");
  //         } else {
  //           setTime(formatTimeInHHMMSS(remainingTime * 1000));
  //         }
  //       }, 1000);
  //       return () => clearInterval(interval);
  //     } else if (quiz?.timeType === "fixed") {
  //       //we need to check endtime - now
  //       const interval = setInterval(() => {
  //         const remainingTime = new Date(quiz?.endTime) - new Date();
  //         if (remainingTime <= 0) {
  //           clearInterval(interval);
  //           setTime("00:00:00");
  //         } else {
  //           setTime(formatTimeInHHMMSS(remainingTime));
  //         }
  //         // setTime(formatTimeInHHMMSS(remainingTime));
  //       }, 1000);
  //       return () => clearInterval(interval);
  //     } else {
  //       const interval = setInterval(() => {
  //         const timeSpent = new Date() - now + timeTaken * 1000;
  //         setTime(formatTimeInHHMMSS(timeSpent));
  //       }, 1000);
  //       return () => clearInterval(interval);
  //     }
  //   }
  // }, [attempt, hasSubmitted]);

  useEffect(() => {
    const { timeTaken, Quiz: quiz } = attempt;

    if (hasSubmitted) {
      setTime(formatTimeInHHMMSS(timeTaken * 1000));
    } else {
      const runTimer = async () => {
        const response = await getServerTime();
        const now = response?.status === 200 ? response?.data : new Date();
        console.log(now, "now");

        if (quiz?.timeType === "duration") {
          console.log("timeTaken", timeTaken);
          console.log("quiz?.duration", quiz?.duration);
          let remainingTime = quiz?.duration - timeTaken;
          const interval = setInterval(() => {
            remainingTime -= 1;
            if (remainingTime <= 0) {
              clearInterval(interval);
              setTime("00:00:00");
            } else {
              setTime(formatTimeInHHMMSS(remainingTime * 1000));
            }
          }, 1000);
          return () => clearInterval(interval);
        } else if (quiz?.timeType === "fixed") {
          const interval = setInterval(() => {
            const remainingTime = new Date(quiz?.endTime) - now;
            if (remainingTime <= 0) {
              clearInterval(interval);
              setTime("00:00:00");
            } else {
              setTime(formatTimeInHHMMSS(remainingTime));
            }
          }, 1000);
          return () => clearInterval(interval);
        } else {
          const startTime = now;
          const interval = setInterval(() => {
            const timeSpent = new Date() - startTime + timeTaken * 1000;
            setTime(formatTimeInHHMMSS(timeSpent));
          }, 1000);
          return () => clearInterval(interval);
        }
      };

      const cleanup = runTimer();

      // In case runTimer returns a cleanup function:
      return () => {
        cleanup?.then?.((fn) => fn?.());
      };
    }
  }, [attempt, hasSubmitted]);

  return (
    <div className="flex h-[20px] items-center space-x-2 md:text-sm text-xs mt-[2px] text-slate-700">
      <FaRegClock className="" />

      <span className=" ">{time}</span>
    </div>
  );
};

export default QuizTimer;

// {
//     "id": 1,
//     "userId": 593,
//     "courseId": null,
//     "quizId": 1,
//     "hasSubmitted": null,
//     "timeTaken": 200,
//     "platFormId": 4,
//     "createdAt": "2025-04-24T10:54:29.233Z",
//     "updatedAt": "2025-04-28T10:15:07.851Z",
//     "Quiz": {
//         "id": 1,
//         "name": "Mock A - Session 1",
//         "resultType": "never",
//         "accessType": "free",
//         "timeType": "duration",
//         "duration": 6600,
//         "isActive": null,
//         "attemptType": "single",
//         "quizId": null,
//         "startTime": null,
//         "endTime": null,
//         "notified": null,
//         "createdAt": "2025-04-22T12:24:30.830Z",
//         "updatedAt": "2025-04-18T11:20:54.509Z"
//     }
// }
