import { useDispatch, useSelector } from "react-redux";
import ResultOverviewCard from "./ResultOverviewCard";
import { formatDuration } from "./../../../../../utils/common/formatDuration";
import StackedBarChart from "../../../../../components/charts/StackedBarChart";
import { useEffect, useState } from "react";
import { extractSubjectWiseQuestionsAnalysis } from "../../../../../utils/quizes/practice-quiz/extractSubjcetWiseQuestionsAnalysisData";
import { setIsAttempted } from "../../../../../redux/slices/practice-quiz/practiceQuiz";

const prefferences = [
  { name: "Subject Wise", value: "subject-wise" },
  { name: "Topic Wise", value: "topic-wise" },
];

const ResultOverview = () => {
  const { timeTaken } = useSelector((state) => state.timer);
  const { result } = useSelector((state) => state.result);

  const [prefference, setPrefference] = useState("topic-wise");

  const [subjectWiseChartData, setSubjectWiseChartData] = useState([]);
  const [topicWiseChartData, setTopicWiseChartData] = useState([]);

  const dispatch = useDispatch();

  const changePrefference = (e) => {
    setPrefference(e.target.value);
  };

  const data = [
    {
      title: "Total Questions",
      desc: "Attempted questions / Total questions",
      question: `${
        result?.filter((item) => item?.status !== "Not Attempted")?.length
      }/${result?.length}`,
      ratio: "0",
    },
    {
      title: "Correct Questions",
      desc: "Correct questions / Attempted questions",
      question: `${result?.filter((item) => item?.status === "Correct")?.length}/${
        result?.filter((item) => item?.status !== "Not Attempted")?.length
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
    if (result) {
      const subjectWiseData = [];
      const topicWiseData = [];

      const { analysedData } = extractSubjectWiseQuestionsAnalysis(result);
      analysedData?.subjectStats?.forEach((item) => {
        subjectWiseData.push({
          name: item?.name,
          correct: item?.correct,
          wrong: item?.wrong,
          unattempted: item?.unattempted,
          time: Number(item?.timeTaken),
        });
      });

      analysedData?.topicStats?.forEach((item) => {
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
    dispatch(setIsAttempted(false));
  }, [result, dispatch]);

  return (
    <div className="w-full flex md:h-full h-auto flex-col space-y-6 md:space-y-0 md:flex-row items-center justify-between ">
      <div className=" w-full md:w-[30%] h-full space-y-4 p-2 ">
        <h1 className="text-2xl text-custom-black font-bold">Overview</h1>
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

export default ResultOverview;
