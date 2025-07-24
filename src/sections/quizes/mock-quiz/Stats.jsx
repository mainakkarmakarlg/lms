import { MdSmartphone } from "react-icons/md";
import EachStat from "./stats/EachStat";
import { AiTwotoneFileUnknown } from "react-icons/ai";
import { IoMedalOutline } from "react-icons/io5";
import { FiClock } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

const extractStats = (quizes) => {
  let completed = 0;
  let inProgress = 0;
  let averageScore = 0;
  let completionRate = 0;
  let totalQuestionAttempted = 0;

  if (quizes?.length === 0) {
    return {
      completed,
      inProgress,
      total: 0,
      averageScore,
      completionRate,
      totalQuestionAttempted,
    };
  }

  const { attemptedQuestions } = findQuestionStats(quizes);

  const { completedQuiz, inProgressQuiz, totalQuizes } =
    countCompletedQuiz(quizes);

  return {
    completed: completedQuiz,
    inProgress: inProgressQuiz,
    total: totalQuizes ? totalQuizes : 0,
    averageScore,
    completionRate: (completedQuiz / totalQuizes) * 100,
    totalQuestionAttempted: attemptedQuestions,
  };
};

const countCompletedQuiz = (quizes) => {
  let completedQuiz = 0;
  let inProgressQuiz = 0;
  let totalQuizes = 0;

  for (let i = 0; i < quizes.length; i++) {
    const quiz = quizes[i];
    totalQuizes++;
    if (quiz?.Quizzes?.length > 0) {
      for (let j = 0; j < quiz?.Quizzes?.length; j++) {
        totalQuizes++;
        const currentQuiz = quiz?.Quizzes[j];
        const { completed, inProgress } = isAnyCompleted(currentQuiz);
        completedQuiz += completed;
        inProgressQuiz += inProgress;
      }
    }
    const { completed, inProgress } = isAnyCompleted(quiz);
    completedQuiz += completed;
    inProgressQuiz += inProgress;
  }

  return {
    totalQuizes,
    completedQuiz,
    inProgressQuiz,
  };
};

const isAnyCompleted = (quiz) => {
  let completed = 0;
  let inProgress = 0;
  const isAnyQuizCompleted = quiz?.Attempts?.find(
    (attempt) => attempt.hasSubmitted === true
  );

  if (isAnyQuizCompleted) {
    completed++;
  } else {
    if (quiz?.Attempts?.length > 0) {
      inProgress++;
    }
  }

  return {
    completed,
    inProgress,
  };
};

const findQuestionStats = (quizes) => {
  let attemptedQuestions = 0;
  let totalQuestions = 0;

  for (let i = 0; i < quizes.length; i++) {
    const quiz = quizes[i];
    totalQuestions += quiz?.questionCount || 0;
    attemptedQuestions += quiz?.attemptCount || 0;
    for (let k = 0; k < quiz?.Quizzes?.length; k++) {
      const currentQuiz = quiz?.Quizzes[k];
      console.log(quiz, "-----------------");

      attemptedQuestions += currentQuiz?.attemptCount || 0;
    }
    totalQuestions += quiz?.attemptCount || 0;
  }

  return {
    attemptedQuestions,
    totalQuestions,
  };
};

const Stats = () => {
  const { defaultQuizes } = useSelector((state) => state.mockQuizes);
  const [stats, setStats] = useState({});
  console.log(defaultQuizes, "-------------**********");

  useEffect(() => {
    if (defaultQuizes?.length === 0) return;
    const {
      averageScore,
      completed,
      inProgress,
      total,
      completionRate,
      totalQuestionAttempted,
    } = extractStats(defaultQuizes);
    const obj = {
      averageScore,
      completed,
      inProgress,
      total,
      completionRate,
      totalQuestionAttempted,
    };
    console.log(obj, "************");
    setStats(obj);
  }, [defaultQuizes]);

  return (
    <div className="w-full h-fit flex items-center justify-center">
      <div className="w-full  grid md:grid-cols-4 sm:grid-cols-2 grid-cols-2 gap-4 justify-between">
        <EachStat
          title="Total Tests"
          heading={stats?.total}
          discription="Available in the platform"
          size="medium"
          fontSize="medium"
          icon={<AiTwotoneFileUnknown />}
          className="bg-[#DBEAFE] text-[#4361EE]"
        />
        <EachStat
          title={"Completed"}
          heading={stats?.completed}
          discription={`${stats?.completionRate} completion rate`}
          size="medium"
          fontSize="medium"
          icon={<IoMedalOutline />}
          className="bg-[#DCFCE7] text-[#14A155]"
        />
        <EachStat
          title={"In Progress"}
          heading={stats?.inProgress}
          discription="Tests you are currently taking"
          size="medium"
          fontSize="medium"
          icon={<FiClock />}
          className="bg-[#FEF3C7] text-[#BA6019]"
        />
        <EachStat
          title={"Questions Attempted"}
          heading={stats?.totalQuestionAttempted}
          discription="Across all completed tests"
          size="medium"
          fontSize="medium"
          icon={<MdSmartphone />}
          className="bg-[#F3E8FF] text-[#7E22CE]"
        />
      </div>
    </div>
  );
};

export default Stats;
