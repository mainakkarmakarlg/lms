// import { useEffect } from "react";
import { useEffect, useState } from "react";
import { IoAlarmOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import formatTimeInHHMMSS from "../../../../../utils/common/formatTimeInHHMMSS";

export default function Timer() {
  const { timeTaken } = useSelector((state) => state.timer);
  const { hasSubmitted } = useSelector((state) => state.practiceQuiz);

  const [time, setTime] = useState(formatTimeInHHMMSS(timeTaken * 1000));

  useEffect(() => {
    if (hasSubmitted) {
      setTime(formatTimeInHHMMSS(timeTaken * 1000));
      return;
    }
    const now = new Date();
    const interval = setInterval(() => {
      const timeSpent = new Date() - now + timeTaken * 1000;
      setTime(formatTimeInHHMMSS(timeSpent));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeTaken, hasSubmitted]);

  return (
    <div className="flex h-[20px] items-center space-x-2 text-slate-700">
      <IoAlarmOutline className="text-lg" />

      <span className="text-sm mt-[2px]">{time}</span>
    </div>
  );
}
