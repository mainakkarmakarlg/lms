import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { FiChevronRight } from "react-icons/fi";
import Button from "../../../../components/common/Button";
import { formatDuration } from "../../../../utils/common/formatDuration";
import {
  setCurrentQuestionIdx,
  setCurrentSubQuestionIdx,
} from "../../../../redux/slices/mock-quiz/mockQuestions";

const MockQuestionWiseResult = () => {
  const { resultQuestions } = useSelector((state) => state.mockResult);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const statusClasses = {
    correct: "text-green-600",
    wrong: "text-red-600",
    unattempted: "text-gray-600",
  };

  const handleQuestionClick = (question) => {
    const parentIndex = question?.questionIndex?.split(".")[0];
    const subIndex = question?.questionIndex?.split(".")[1];
    dispatch(setCurrentQuestionIdx(Number(parentIndex) - 1));
    if (!subIndex) {
      dispatch(setCurrentSubQuestionIdx(null));
    } else {
      dispatch(setCurrentSubQuestionIdx(Number(subIndex) - 1));
    }

    //   dispatch(setCurrentQuestionIdx(currentIndex));
    navigate(
      `/mock-quiz/attempt/${params?.attemptId}/${params?.combination}/${params?.phone}`
    );
  };

  return (
    <div className="min-h-[400px] h-auto w-full bg-white rounded-md shadow-card p-4 md:p-6 space-y-4">
      <h1 className="text-2xl font-semibold text-gray-800">Question Report</h1>

      <div className="overflow-x-auto  scrollbar w-full flex flex-col  ">
        <table className="min-w-max lg:min-w-full lg:max-w-full w-full border-collapse bg-white rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-center">
              <th className="p-3 text-center">Question</th>
              <th className="p-3 text-center">Subject</th>
              <th className="p-3 text-center">chapter</th>
              <th className="p-3 text-center w-1/5">LOS</th>
              {/* Set width to 20% */}
              <th className="p-3 text-center whitespace-nowrap">Time-Taken</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {resultQuestions?.slice(0, 5)?.map((item) => (
              <tr
                key={item?.id}
                className={`border-b ${statusClasses[item?.status]} cursor-pointer text-center text-xs lg:text-base`}
                onClick={() => handleQuestionClick(item)}
              >
                <td className="p-3 whitespace-nowrap">{item?.questionIndex}</td>
                <td className="p-3">{item.subject?.name}</td>
                <td className="p-3 ">
                  {item.chapter?.name?.length > 50
                    ? item.chapter?.name?.slice(0, 50) + "..."
                    : item.chapter?.name}
                </td>
                <td className="p-3 w-1/5 truncate overflow-hidden whitespace-nowrap">
                  {item.los?.name?.length > 50
                    ? item.los?.name?.slice(0, 50) + "..."
                    : item.los?.name}
                </td>

                {/* Set width to 20% */}
                <td className="p-3">
                  {item?.status !== "Not Attempted"
                    ? formatDuration(item.Answers?.[0]?.timeTaken)
                    : "- -"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {resultQuestions?.length > 5 && (
        <div className="w-full h-fit flex justify-center items-center border-t">
          <Button
            className=" mt-4 cursor-pointer text-primary bg-transparent text-sm hover:bg-transparent hover:text-primary"
            endIcon={<FiChevronRight />}
            onClick={() =>
              navigate(
                `/mock-quiz/attempt/${params?.attemptId}/${params?.combination}/${params?.phone}`
              )
            }
          >
            Show more
          </Button>
        </div>
      )}
    </div>
  );
};

export default MockQuestionWiseResult;
