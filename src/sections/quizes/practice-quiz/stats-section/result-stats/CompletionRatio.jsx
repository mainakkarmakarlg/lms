import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CompletionRateCard from "./CompletionRateCard";
import TopPerformers from "./TopPerformers";

const CompletionRatio = () => {
  const { result } = useSelector((state) => state.result);
  const [data, setData] = useState([]);
  useEffect(() => {
    const totalQuestions = result?.length;
    const attemptedCount =
      result?.filter((item) => item?.status !== "Not Attempted")?.length || 0;
    const correct =
      result?.filter((item) => item?.status === "Correct")?.length || 0;

    setData([
      {
        title: "Completion Rate",
        percentage: Math.floor((attemptedCount / totalQuestions) * 100),
        // result: `${Math.floor((attemptedCount / totalQuestions) * 100)}% Class Average`,
      },
      {
        title: "Accuracy",
        percentage: Math.floor((correct / attemptedCount) * 100),
        // result: `Among top ${Math.floor((correct / attemptedCount) * 100)}% candidates`,
      },
    ]);
  }, [result]);

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

export default CompletionRatio;
