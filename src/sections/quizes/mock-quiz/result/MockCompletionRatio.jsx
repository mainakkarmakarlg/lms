import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CompletionRateCard from "../../practice-quiz/stats-section/result-stats/CompletionRateCard";
import TopPerformers from "../../practice-quiz/stats-section/result-stats/TopPerformers";

const MockCompletionRatio = () => {
  const { resultQuestions } = useSelector((state) => state.mockResult);
  const [data, setData] = useState([]);
  useEffect(() => {
    const totalQuestions = resultQuestions?.length;
    const attemptedCount =
      resultQuestions?.filter((item) => item?.status !== "unattempted")
        ?.length || 0;
    const correct =
      resultQuestions?.filter((item) => item?.status === "correct")?.length ||
      0;
    const percentage = Math.floor((correct / attemptedCount) * 100);
    setData([
      {
        title: "Completion Rate",
        percentage: Math.floor((attemptedCount / totalQuestions) * 100),
        // result: `${Math.floor((attemptedCount / totalQuestions) * 100)}% Class Average`,
      },
      {
        title: "Accuracy",
        percentage: percentage || 0, //need to check nan if nan  then 0,
        // result: `Among top ${Math.floor((correct / attemptedCount) * 100)}% candidates`,
      },
    ]);
  }, [resultQuestions]);

  return (
    <div className="h-fit w-full flex flex-col space-y-6 md:space-y-0 md:flex-row items-stretch justify-between">
      <div className="bg-white w-full md:w-[40%] lg:w-[30%] space-y-4 p-6 rounded-md shadow-card flex flex-col items-center justify-center">
        {data?.map((item, index) => (
          <CompletionRateCard
            key={index}
            title={item?.title}
            percentage={item?.percentage}
            result={item?.result}
          />
        ))}
      </div>
      <div className=" w-full md:w-[58%] lg:w-[65%] xl:w-[68%] space-y-4 p-6 rounded-md bg-white shadow-card">
        <TopPerformers />
      </div>
    </div>
  );
};

export default MockCompletionRatio;
