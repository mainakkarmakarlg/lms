import { useSelector } from "react-redux";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { formatDuration } from "../../../../utils/common/formatDuration";

const MockResultAnalysis = () => {
  const { subjectWiseResults } = useSelector((state) => state.mockResult);

  // const currentMonthIndex = new Date().getMonth();

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
          <MockResultAccordion data={subjectWiseResults} />
        </div>
      </div>
    </div>
  );
};

export default MockResultAnalysis;

const MockResultAccordion = ({ data }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const getStatus = (percentage) => {
    if (percentage < 50) {
      return {
        className: "bg-red-100 text-red-800",
        text: "Needs Improvement",
      };
    } else if (percentage < 70) {
      return { className: "bg-yellow-100 text-yellow-800", text: "Average" };
    } else if (percentage < 80) {
      return { className: "bg-blue-100 text-blue-800", text: "Good" };
    } else {
      return { className: "bg-green-100 text-green-800", text: "Excellent" };
    }
  };

  return (
    <div className="w-full border rounded-lg overflow-hidden">
      {data?.map((item, index) => {
        const timeTaken = item?.timeTaken;
        const totalQuestions = item?.questionCount || 0;
        const unAttemptedQuestions = item?.unattempted || 0;
        const correctQuestions = item?.correct || 0;
        // const wrongQuestions = item?.wrong || 0;
        const attemptedQuestions =
          item?.questionCount - unAttemptedQuestions || 0;
        const score =
          attemptedQuestions === 0
            ? 0
            : (correctQuestions / attemptedQuestions) * 100;

        return (
          <div key={index} className="border-b border-gray-200">
            {/* Subject Row */}
            <div
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-center px-4 py-4 bg-white hover:bg-gray-50 transition font-medium cursor-pointer"
            >
              <div className="w-1/6 text-center">{item.name}</div>
              <div className="w-1/6 text-center">{Math.round(score)}%</div>
              <div className="w-1/6 text-center">{`${attemptedQuestions}/${totalQuestions}`}</div>
              <div className="w-1/6 text-center">
                {formatDuration(timeTaken) || "--"}
              </div>
              <div className="w-1/6 text-center">--</div>
              <div className="w-1/6 text-center text-green-700 font-semibold flex justify-center">
                <div
                  className={`w-fit px-3 py-1 rounded-lg ${getStatus(score).className} text-xs font-semibold`}
                >
                  {getStatus(score).text}
                </div>
              </div>
              <div className="w-fit">
                {openIndex === index ? (
                  <FiChevronUp size={20} />
                ) : (
                  <FiChevronDown size={20} />
                )}
              </div>
            </div>

            {/* chapters - Expandable Section */}
            {/* <div className={`px-2 w-full ${openIndex === index ? " p-2" : ""}`}> */}
            <MockTopicAccordion
              item={item}
              getStatus={getStatus}
              openIndex={openIndex}
              index={index}
            />
          </div>
          // </div>
        );
      })}
    </div>
  );
};

const MockTopicAccordion = ({ item, getStatus, openIndex, index }) => {
  return (
    <div
      className={`overflow-hidden transition-[max-height] duration-300 ease-in-out bg-blue-50 rounded-lg px-2 ${openIndex === index ? "scrollbar" : ""} `}
      style={{
        maxHeight: openIndex === index ? "50vh" : "0px", // Large value ensures full expansion
        overflow: openIndex === index ? "scroll" : "",
        // paddingBottom: openIndex === index ? "1rem" : "0",
        // paddingTop: openIndex === index ? "1rem" : "0",
      }}
    >
      {item?.chapters?.map((topic) => {
        const totalQuestions = topic?.questionCount || 0;
        const unAttemptedQuestions = topic?.unattempted || 0;
        const correctQuestions = topic?.correct || 0;
        // const wrongQuestions = topic?.wrong || 0;
        const attemptedQuestions = totalQuestions - unAttemptedQuestions;
        const score =
          attemptedQuestions === 0
            ? 0
            : (correctQuestions / attemptedQuestions) * 100 || 0;
        const timeTaken = topic?.timeTaken;

        return (
          <div
            key={topic?.id}
            className="flex items-center py-3 border-b last:border-none text-gray-600"
          >
            <div className="w-1/6 text-center">{topic?.name}</div>
            <div className="w-1/6 text-center">{Math.round(score)}%</div>
            <div className="w-1/6 text-center">{`${attemptedQuestions}/${totalQuestions}`}</div>
            <div className="w-1/6 text-center">
              {formatDuration(timeTaken) || "--"}
            </div>
            <div className="w-1/6 text-center">--</div>
            <div className="w-1/6 text-center text-green-700 flex justify-center">
              <div
                className={`w-fit px-3 py-1 rounded-lg ${getStatus(score).className} text-xs font-semibold`}
              >
                {getStatus(score).text}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
