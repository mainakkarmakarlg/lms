import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setCurrentQuestionIdx,
  setCurrentSubQuestionIdx,
} from "../../../../../redux/slices/practice-quiz/questions";
import { formatDuration } from "../../../../../utils/common/formatDuration";
import Button from "../../../../../components/common/Button";
import { FiChevronRight } from "react-icons/fi";
import { useEffect, useState } from "react";

const QuestionwiseResult = () => {
  const { result } = useSelector((state) => state.result);
  const [updatedResults, setUpdatedResults] = useState(result);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const statusClasses = {
    Correct: "text-green-600",
    Wrong: "text-red-600",
    "Not Attempted": "text-gray-600",
  };

  console.log("result", result);

  useEffect(() => {
    if (!result) return;

    function assignQuestionIndicesSimple(input) {
      const output = [];
      let mainIndex = 1;

      // To track which parent questionIds we have assigned a main index to
      const parentIndexMap = new Map();

      const childrenMap = new Map();

      // First, group children by their parent questionId
      for (const item of input) {
        const parentId = item.Question.questionId;
        if (parentId !== null) {
          if (!childrenMap.has(parentId)) {
            childrenMap.set(parentId, []);
          }
          childrenMap.get(parentId).push(item);
        }
      }

      for (let i = 0; i < input.length; i++) {
        const item = input[i];
        const parentId = item.Question.questionId;

        if (parentId === null) {
          // This is a top-level question
          const clonedItem = { ...item };
          clonedItem.questionIndex = String(mainIndex);
          output.push(clonedItem);
          mainIndex++;
        } else {
          // This is a child question
          if (!parentIndexMap.has(parentId)) {
            // Assign mainIndex to this parentId (the parent's group)
            parentIndexMap.set(parentId, mainIndex);
            mainIndex++;

            // Now, push all children with this parentId
            const children = childrenMap.get(parentId) || [];

            // Sort children by their first occurrence in input (optional but keeps order stable)
            children.sort((a, b) => input.indexOf(a) - input.indexOf(b));

            children.forEach((child, idx) => {
              const clonedChild = { ...child };
              clonedChild.questionIndex = `${parentIndexMap.get(parentId)}.${idx + 1}`;
              output.push(clonedChild);
            });
          }
        }
      }

      return output;
    }

    const final = assignQuestionIndicesSimple(result);
    console.log("final", final);

    setUpdatedResults(final);
  }, [result]);

  const handleQuestionClick = (question) => {
    // const currentIndex = result.findIndex((q) => q?.id === question.id);

    // if (currentIndex !== -1) {
    //   dispatch(setCurrentQuestionIdx(currentIndex));
    //   navigate(
    //     `/practice-quiz/${params?.attemptId}/${params?.combination}/${params?.phone}`
    //   );
    // }

    const questionIndex = question?.questionIndex;
    console.log("questionIndex", questionIndex);
    const splitIndex = questionIndex?.split(".");
    const parentId = splitIndex?.[0] ? Number(splitIndex[0]) - 1 : null;
    const childId =
      splitIndex?.[1] !== undefined ? Number(splitIndex[1]) - 1 : null;

    console.log("parentId", parentId);
    console.log("childId", childId);
    if (
      parentId !== null &&
      childId !== null &&
      childId >= 0 &&
      parentId >= 0
    ) {
      dispatch(setCurrentQuestionIdx(parentId));
      dispatch(setCurrentSubQuestionIdx(childId));
      navigate(
        `/practice-quiz/${params?.attemptId}/${params?.combination}/${params?.phone}`
      );
    } else if (parentId !== null && childId === null && parentId >= 0) {
      dispatch(setCurrentQuestionIdx(parentId));
      navigate(
        `/practice-quiz/${params?.attemptId}/${params?.combination}/${params?.phone}`
      );
    }
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
              <th className="p-3 text-center">Topic</th>
              <th className="p-3 text-center w-1/5">LOS</th>
              {/* Set width to 20% */}
              <th className="p-3 text-center whitespace-nowrap">Time-Taken</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {updatedResults?.slice(0, 5)?.map((item) => (
              <tr
                key={item?.id}
                className={`border-b ${statusClasses[item?.status]} cursor-pointer text-center text-xs lg:text-base`}
                onClick={() => handleQuestionClick(item)}
              >
                <td className="p-3 whitespace-nowrap">{item?.questionIndex}</td>
                <td className="p-3">{item.subject?.name}</td>
                <td className="p-3 ">
                  {item.topic?.name?.length > 50
                    ? item.topic?.name?.slice(0, 50) + "..."
                    : item.topic?.name}
                </td>
                <td className="p-3 w-1/5 truncate overflow-hidden whitespace-nowrap">
                  {item.los?.name?.length > 50
                    ? item.los?.name?.slice(0, 50) + "..."
                    : item.los?.name}
                </td>

                {/* Set width to 20% */}
                <td className="p-3">
                  {item?.status !== "Not Attempted"
                    ? formatDuration(item.timeTaken)
                    : "- -"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {result?.length > 5 && (
        <div className="w-full h-fit flex justify-center items-center border-t">
          <Button
            className=" mt-4 cursor-pointer text-primary bg-transparent text-sm hover:bg-transparent hover:text-primary"
            endIcon={<FiChevronRight />}
            onClick={() =>
              navigate(
                `/practice-quiz/${params?.attemptId}/${params?.combination}/${params?.phone}`
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

export default QuestionwiseResult;
