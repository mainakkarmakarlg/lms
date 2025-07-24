// import { useState, useRef, useEffect } from "react";
// import { FiChevronDown, FiChevronUp } from "react-icons/fi";
// import { formatDuration } from "../utils/practice-quiz/formatDuration";

// const Accordion = ({ data, stats }) => {
//   const [openIndex, setOpenIndex] = useState(null);
//   const contentRef = useRef(null);
//   const [height, setHeight] = useState(0);

//   useEffect(() => {
//     if (openIndex !== null) {
//       setHeight(contentRef.current.scrollHeight);
//     } else {
//       setHeight(0);
//     }
//   }, [openIndex]);

//   const toggleAccordion = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   const getStatus = (persantage) => {
//     if (persantage < 50) {
//       return {
//         className: "bg-red-100 text-red-800",
//         text: "Needs Improvement",
//       };
//     } else if (persantage < 70) {
//       return { className: "bg-yellow-100 text-yellow-800", text: "Average" };
//     } else if (persantage < 80) {
//       return { className: "bg-blue-100 text-blue-800", text: "Good" };
//     } else {
//       return { className: "bg-green-100 text-green-800", text: "Excellent" };
//     }
//   };

//   return (
//     <div className="w-full border rounded-lg overflow-hidden">
//       {data?.map((item, index) => {
//         const subject = stats?.subjectStats?.find(
//           (subject) => subject.id === item.id
//         );
//         const score = subject?.percentage;
//         const timeTaken = subject?.timeTaken;
//         const totalQuestions = subject?.total || 0;
//         const unAttemptedQuestions = subject?.unAttempted || 0;
//         const attemptedQuestions = totalQuestions - unAttemptedQuestions;

//         return (
//           <div key={index} className="border-b border-gray-200 ">
//             {/* Subject Row */}
//             <div
//               onClick={() => toggleAccordion(index)}
//               className="w-full flex items-center px-4  py-4 bg-white hover:bg-gray-50 transition font-medium cursor-pointer"
//             >
//               <div className="w-1/6   text-center">{item.name}</div>
//               <div className="w-1/6   text-center">
//                 {Math.round(score) || "0"}%
//               </div>
//               <div className="w-1/6  text-center">
//                 {`${attemptedQuestions}/${totalQuestions}`}
//               </div>
//               <div className="w-1/6  text-center">
//                 {formatDuration(timeTaken) || "--"}
//               </div>
//               <div className="w-1/6  text-center">--</div>
//               <div className="w-1/6 text-center text-green-700 font-semibold flex justify-center">
//                 <div
//                   className={`w-fit px-3 py-1  rounded-lg ${getStatus(score).className} text-xs font-semibold`}
//                 >
//                   {getStatus(score).text}
//                 </div>
//               </div>
//               <div className="w-fit">
//                 {openIndex === index ? (
//                   <FiChevronUp size={20} />
//                 ) : (
//                   <FiChevronDown size={20} />
//                 )}
//               </div>
//             </div>

//             {/* Topics - Expandable Section */}
//             <div
//               ref={contentRef}
//               className="overflow-hidden transition-[height] duration-300 ease-in-out bg-blue-50 rounded-lg px-2"
//               style={{
//                 height: openIndex === index ? `${height}px` : "0px",
//               }}
//             >
//               {item?.topics?.map((t) => {
//                 const topic = stats?.topicStats?.find(
//                   (subject) => subject.id === t?.id
//                 );
//                 const score = topic?.percentage;
//                 const timeTaken = topic?.timeTaken;
//                 const totalQuestions = topic?.total || 0;
//                 const unAttemptedQuestions = topic?.unAttempted || 0;

//                 const attemptedQuestions =
//                   totalQuestions - unAttemptedQuestions;

//                 return (
//                   <div
//                     key={topic?.id}
//                     className="flex items-center  py-3 border-b last:border-none text-gray-600"
//                   >
//                     <div className="w-1/6 text-center ">{topic?.name}</div>
//                     <div className="w-1/6 text-center ">
//                       {Math.round(score) || "0"}%
//                     </div>
//                     <div className="w-1/6 text-center ">
//                       {`${attemptedQuestions}/${totalQuestions}`}
//                     </div>
//                     <div className="w-1/6 text-center ">
//                       {formatDuration(timeTaken) || "--"}
//                     </div>
//                     <div className="w-1/6 text-center ">--</div>
//                     <div className="w-1/6 text-center  text-green-700 flex justify-center">
//                       <div
//                         className={`w-fit px-3 py-1  rounded-lg ${getStatus(score).className} text-xs font-semibold`}
//                       >
//                         {getStatus(score).text}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Accordion;

import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { formatDuration } from "../../utils/common/formatDuration";

const Accordion = ({ data, stats }) => {
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
        const subject = stats?.subjectStats?.find(
          (subject) => subject.id === item.id
        );
        const score = subject?.percentage || 0;
        const timeTaken = subject?.timeTaken;
        const totalQuestions = subject?.total || 0;
        const unAttemptedQuestions = subject?.unAttempted || 0;
        const attemptedQuestions = totalQuestions - unAttemptedQuestions;

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

            {/* Topics - Expandable Section */}
            {/* <div className={`px-2 w-full ${openIndex === index ? " p-2" : ""}`}> */}
            <div
              className={`overflow-hidden transition-[max-height] duration-300 ease-in-out bg-blue-50 rounded-lg px-2 ${openIndex === index ? "scrollbar" : ""} `}
              style={{
                maxHeight: openIndex === index ? "50vh" : "0px", // Large value ensures full expansion
                overflow: openIndex === index ? "scroll" : "",
                // paddingBottom: openIndex === index ? "1rem" : "0",
                // paddingTop: openIndex === index ? "1rem" : "0",
              }}
            >
              {item?.topics?.map((t) => {
                const topic = stats?.topicStats?.find(
                  (subject) => subject.id === t?.id
                );
                const score = topic?.percentage || 0;
                const timeTaken = topic?.timeTaken;
                const totalQuestions = topic?.total || 0;
                const unAttemptedQuestions = topic?.unAttempted || 0;
                const attemptedQuestions =
                  totalQuestions - unAttemptedQuestions;

                return (
                  <div
                    key={topic?.id}
                    className="flex items-center py-3 border-b last:border-none text-gray-600"
                  >
                    <div className="w-1/6 text-center">{topic?.name}</div>
                    <div className="w-1/6 text-center">
                      {Math.round(score)}%
                    </div>
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
          </div>
          // </div>
        );
      })}
    </div>
  );
};

export default Accordion;
