import { useSelector } from "react-redux";
import Accordion from "../../../../../components/common/Accordian";
import { extractSubjcetWiseStats } from "../../../../../utils/quizes/practice-quiz/extractSubjcetWiseStats";
import { useEffect, useState } from "react";

const ResultAnalysis = () => {
  const { questions } = useSelector((state) => state.questions);
  const { result } = useSelector((state) => state.result);

  const [subjectWiseData, setSubjectData] = useState([]);
  const [percentages, setPercentages] = useState([]);

  // const monthNames = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];

  const currentDate = new Date();
  const previousDate = new Date();
  previousDate.setDate(currentDate.getDate() - 7);

  // const currentMonthIndex = new Date().getMonth();

  useEffect(() => {
    if (result?.length) {
      const { questionsData, percentages } = extractSubjcetWiseStats(result);

      setSubjectData(questionsData);
      setPercentages(percentages);
    }
  }, [questions, result]);

  return (
    <div className="min-h-[400px] h-auto w-full bg-white rounded-md shadow-card p-4 md:p-6 space-y-4 overflow-x-auto scrollbar">
      <div className="w-full flex items-center justify-between">
        <h3 className="text-2xl text-custom-black font-semibold">Report</h3>
        {/* <select className="w-[200px] p-2 border rounded text-custom-black outline-none cursor-pointer">
          {monthNames.map((month, index) => (
            <option
              key={index}
              value={month}
              selected={index === currentMonthIndex}
            >
              {month}
            </option>
          ))}
        </select> */}
      </div>
      <div className="flex flex-col w-[900px] lg:w-full space-y-4 items-center justify-center  ">
        <div className="w-full h-12 flex bg-[#F3F4F6] items-center justify-between text-center px-4">
          <div className="h-full  w-1/5 flex items-center justify-center">
            Subject
          </div>
          <div className="h-full w-1/5 flex items-center justify-center ">
            Your Score
          </div>
          <div className="h-full w-1/5 flex items-center justify-center">
            Attempted/Total
          </div>
          <div className="h-full w-1/5 flex items-center justify-center">
            Time Taken
          </div>
          <div className="h-full w-1/5 flex items-center justify-center">
            Weakness
          </div>
          <div className="h-full w-1/5 flex items-center justify-center">
            Status
          </div>
        </div>
        <div className="h-full w-full">
          <Accordion
            result={result}
            data={subjectWiseData}
            stats={percentages}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultAnalysis;
