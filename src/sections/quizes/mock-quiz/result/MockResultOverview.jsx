import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ResultOverviewCard from "../../practice-quiz/stats-section/result-stats/ResultOverviewCard";
import { formatDuration } from "./../../../../utils/common/formatDuration";
import StackedBarChart from "../../../../components/charts/StackedBarChart";

const prefferences = [
  { name: "Subject Wise", value: "subject-wise" },
  { name: "Topic Wise", value: "topic-wise" },
];

const MockResultOverview = () => {
  const [prefference, setPrefference] = useState("topic-wise");
  const { result, resultQuestions, subjectWiseResults, topicWiseResults } =
    useSelector((state) => state.mockResult);

  const [subjectWiseChartData, setSubjectWiseChartData] = useState([]);
  const [topicWiseChartData, setTopicWiseChartData] = useState([]);

  const dispatch = useDispatch();
  console.log("result", result);

  const changePrefference = (e) => {
    setPrefference(e.target.value);
  };

  const timeTaken = result?.timeTaken;

  const data = [
    {
      title: "Total Questions",
      desc: "Attempted questions / Total questions",
      question: `${
        resultQuestions?.filter((item) => item?.status !== "unattempted")
          ?.length
      }/${resultQuestions?.length}`,
      ratio: "0",
    },
    {
      title: "correct Questions",
      desc: "correct questions / Attempted questions",
      question: `${resultQuestions?.filter((item) => item?.status === "correct")?.length}/${
        resultQuestions?.filter((item) => item?.status !== "unattempted")
          ?.length
      }`,
      ratio: "0",
    },
    {
      title: "Time Taken",
      desc: "Time taken to complete the quiz",
      question: formatDuration(timeTaken),
      ratio: "0",
    },
  ];

  useEffect(() => {
    if (resultQuestions) {
      const subjectWiseData = [];
      const topicWiseData = [];

      subjectWiseResults?.forEach((item) => {
        subjectWiseData.push({
          name: item?.name,
          correct: item?.correct,
          wrong: item?.wrong,
          unattempted: item?.unattempted,
          time: Number(item?.timeTaken),
        });
      });

      topicWiseResults?.forEach((item) => {
        topicWiseData.push({
          name: item?.name,
          correct: item?.correct,
          wrong: item?.wrong,
          unattempted: item?.unattempted,
          time: Number(item?.timeTaken),
        });
      });

      setSubjectWiseChartData(subjectWiseData);
      setTopicWiseChartData(topicWiseData);
    }
    // dispatch(setIsAttempted(false));
  }, [resultQuestions, dispatch, subjectWiseResults, topicWiseResults]);

  return (
    <div className="w-full flex md:h-full h-auto flex-col space-y-6 md:space-y-0 md:flex-row items-center justify-between ">
      <div className=" w-full md:w-[30%] h-full space-y-4 p-2 ">
        <h1 className="text-2xl text-custom-black font-bold">
          {result?.Quiz?.name}
        </h1>
        {data.map((item, index) => (
          <ResultOverviewCard
            key={index}
            title={item?.title}
            desc={item?.desc}
            question={item?.question}
            ratio={item?.ratio}
          />
        ))}
      </div>
      <div className="w-full shadow md:w-[65%] md:h-full h-[450px] flex flex-col ">
        <div className="w-full flex justify-end">
          <select
            name="prefference"
            onChange={changePrefference}
            defaultValue={prefference}
            className="p-2 border border-custom-gray rounded-md outline-none"
            id="prefference"
          >
            {prefferences?.map((item, index) => (
              <option key={index} value={item?.value}>
                {item?.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full  h-full  sm:h-[300px] lg:h-[350px] flex justify-center items-center mt-5">
          <StackedBarChart
            k1={"correct"}
            k1Color={"#10B981"}
            k2={"wrong"}
            k2Color={"#FF3957"}
            k3={"unattempted"}
            k3Color={"#FFAF5E"}
            data={
              prefference === "subject-wise"
                ? subjectWiseChartData
                : topicWiseChartData
            }
            lineKey={"time"}
            lineColor={"#4CB1E1"}
          />
        </div>
      </div>
    </div>
  );
};

export default MockResultOverview;
