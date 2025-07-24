import clockPng from "/practise-quiz/clock.png";
import fileQuestion from "/practise-quiz/file-question.png";
import flag from "/practise-quiz/flag.png";
import target from "/practise-quiz/target.png";
import { useSelector } from "react-redux";
import useGetData from "../../../../hooks/useGetData.jsx";
import { formatDuration } from "../../../../utils/common/formatDuration.js";
import OverviewCard from "./OverviewCard.jsx";

const OverView = () => {
  const { subjects } = useSelector((state) => state.quizSubjects);
  const { course } = useSelector((state) => state.course);
  const courseId = course?.course?.id;
  const { data: totalFlag } = useGetData(
    courseId
      ? `/practice/flagcount?${courseId ? `courseId=${courseId}` : ""}`
      : null
  );
  const { data: timeTaken } = useGetData(
    courseId ? `/practice/practice-time?courseId=${courseId}` : null
  );
  // console.log(timeTaken, "timeTaken");

  const getaccuracyLevel = () => {
    const totalQuestions = subjects?.reduce(
      (acc, subject) => acc + subject.attemptedQuestionCount,
      0
    );
    const totalCorrect = subjects?.reduce(
      (acc, subject) => acc + subject.correctQuestionCount,
      0
    );
    return (totalCorrect / totalQuestions) * 100;
  };
  // console.log(data);
  return (
    <div className="w-full h-fit flex flex-col justify-center p-2 lg:p-6 bg-white rounded-md shadow-subject lg:space-y-4">
      <h2 className="text-lg font-semibold lg:text-2xl text-custom-black">
        Overview
      </h2>
      <div className="w-full flex flex-col items-center  ">
        <OverviewCard
          title="Total Questions"
          image={fileQuestion}
          value={subjects?.reduce(
            (acc, subject) => acc + subject.attemptedQuestionCount,
            0
          )}
          toolTipText="Questions attempted by you"
          trendText="+2.78%"
          bgColor="bg-[#E1F5FF]"
        />
        <OverviewCard
          title="Total Flagged"
          image={flag}
          value={totalFlag}
          toolTipText="Total Flagged by you"
          trendText="-0.90%"
          bgColor="bg-[#FFEEDD]"
        />
        <OverviewCard
          title="Time taken"
          image={clockPng}
          value={formatDuration(timeTaken?.totalTime?._sum?.timeTaken)}
          toolTipText="Total time taken by you among all quizes"
          trendText="-0.90%"
          bgColor="bg-[#2C6FBB1A]"
        />
        <OverviewCard
          title="Accuracy Level"
          image={target}
          value={`${getaccuracyLevel().toFixed(2)}%`}
          toolTipText="Accuracy level from attempted questions"
          trendText="+2.78%"
          bgColor="bg-[#34C75933]"
        />
      </div>
      {/* <div className="flex self-center items-center space-x-2 text-gray-400 cursor-pointer hover:text-gray-600 text-lg mt-1">
        <img src={analyticsSvg} alt="analytics" className="w-4 h-4" />
        <p className="text-sm">More Analytics</p>
        <MdKeyboardArrowRight />
      </div> */}
    </div>
  );
};

export default OverView;
