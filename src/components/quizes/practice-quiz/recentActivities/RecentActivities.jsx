import { FaChevronRight } from "react-icons/fa6";
import { GoClock } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import {
  setRecentActivities,
  updatePage,
} from "../../../../redux/slices/practice-quiz/recentActivites";
import { getData } from "../../../../apiCalls/getData";
import getFormatedDateTime from "../../../../utils/common/getFormatedDateTime";
import { getSocket } from "../../../../utils/socket";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearQuestionState,
  setQuestions,
} from "../../../../redux/slices/practice-quiz/questions";
import {
  clearQuizState,
  setHasSubmitted,
  setIsAttempted,
} from "../../../../redux/slices/practice-quiz/practiceQuiz";
import { setTimeTaken } from "../../../../redux/slices/practice-quiz/timer";
import { setResult } from "../../../../redux/slices/practice-quiz/result";
import {
  resetQuestionNavigator,
  setFilteredQuestions,
} from "../../../../redux/slices/practice-quiz/questionNavigator";
import { setFlaggedQuestions } from "../../../../redux/slices/practice-quiz/questionNavigator";
import { setReportedQuestions } from "../../../../redux/slices/practice-quiz/reportQuestion";
import Tooltip from "../../../common/Tooltip";
import { TbInfoCircle } from "react-icons/tb";
import combineChildAndParentQuestions from "../../../../utils/quizes/practice-quiz/combineChildAndParentQuestions";

const RecentActivities = () => {
  const { recentActivities, page, isShowMore } = useSelector(
    (state) => state.recentActivities
  );
  const { accessToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course);
  const socket = getSocket();
  const courseId = course?.course?.id;
  const params = useParams();
  const navigate = useNavigate();

  const getSubjectName = useCallback(
    async (subjectId) => {
      try {
        const response = await getData(
          `/practice/searchsubject?courseId=${courseId}&subjectId=${subjectId}`,
          accessToken
        );
        return response?.data[0]?.name;
      } catch (error) {
        console.error("error in getSubjectName : " + error);
      }
    },
    [accessToken, courseId]
  );

  const startQuiz = async (data) => {
    dispatch(setIsAttempted(true));
    dispatch(setResult(null));
    dispatch(clearQuestionState());
    dispatch(clearQuizState());
    dispatch(resetQuestionNavigator());
    console.log(data.Answer);

    const { mergedAnswers, flagged, reported } =
      await combineChildAndParentQuestions(accessToken, data?.Answer, socket);
    console.log(mergedAnswers);

    dispatch(setQuestions(mergedAnswers));
    dispatch(setFlaggedQuestions(flagged));
    dispatch(setReportedQuestions(reported));

    dispatch(setFilteredQuestions(mergedAnswers));
    dispatch(setHasSubmitted(data?.hasSubmitted));
    dispatch(setTimeTaken(data?.timeTaken || 0));

    navigate(
      `/practice-quiz/${data?.id}/${params?.combination}/${params?.phone}`
    );
  };

  useEffect(() => {
    const getRecentActivities = async () => {
      try {
        const response = await getData(
          `/practice/attempt?courseId=${courseId}${page ? `page=${page}` : ""}`,
          accessToken
        );
        const activities = await Promise.all(
          response.data.map(async (activity) => {
            const names =
              activity?.subject?.length > 0 &&
              (await Promise.all(
                activity?.subject?.slice(0, 2).map(async (subjectId) => {
                  return await getSubjectName(subjectId);
                })
              ));
            return { ...activity, names }; // Add names array to the activity
          })
        );
        // console.log(activities);
        dispatch(setRecentActivities(activities));
        // dispatch(updatePage(page + 1));
      } catch (error) {
        console.error("error in getRecentActivities" + error);
      }
    };

    if (courseId) {
      getRecentActivities();
    }
  }, [courseId, page, accessToken, dispatch, getSubjectName]);

  const handleResume = async (activity) => {
    console.log("activity---", activity);
    console.log("courseId---", courseId);
    if (activity?.hasSubmitted) {
      dispatch(setResult(null));
      dispatch(clearQuestionState());
      dispatch(clearQuizState());
      dispatch(resetQuestionNavigator());
      navigate(
        `/practice-quiz/result/${activity?.id}/${params?.combination}/${params?.phone}`
      );
    } else {
      socket?.emit("make-practice-attempt", {
        courseId: courseId,
        attemptId: activity?.id,
      });

      socket?.on("make-practice-attempt-success", async (data) => {
        await startQuiz(data);
      });

      socket?.on("make-practice-attempt-error", () => {
        navigate(`/error/${params?.combination}/${params?.phone}`);
      });
    }
  };

  useEffect(() => {
    const socket = getSocket();
    return () => {
      socket?.off("make-practice-attempt-success");
      socket?.off("make-practice-attempt-error");
    };
  }, []);

  return (
    <div className="bg-white flex flex-col justify-start rounded-lg shadow-subject p-2 lg:p-6 w-full  h-full ">
      <div className="flex flex-col  space-y-3 h-[98%]">
        {/* Header or Title */}
        <h2 className="text-xl lg:text-2xl font-semibold text-custom-black h-[30px] ">
          Activity Log
        </h2>

        {/* Scrollable content container */}
        {recentActivities?.length > 0 ? (
          <div className="w-full flex flex-col flex-1 overflow-y-auto max-h-[calc(100%-40px)] scrollbar">
            {recentActivities?.map(
              (activity, i) =>
                activity?.names?.length > 0 && (
                  <div
                    key={activity.id}
                    onClick={() => handleResume(activity)}
                    className={`w-full flex justify-between items-center py-2 xl:px-5 border-b border-gray-200  cursor-pointer  ${
                      i === recentActivities?.length - 1 && "border-none"
                    }`}
                  >
                    <div className="w-[70%]  ">
                      <p className="text-xs md:text-base lg:text-xs xl:text-base font-semibold w-full truncate">
                        {activity?.names?.length > 0 &&
                          activity?.names?.map((name, i) => (
                            <span key={name + i} className="truncate w-full">
                              {name}
                              {i !== activity?.names?.length - 1 && ","}
                            </span>
                          ))}
                      </p>
                      <div className="flex items-center text-gray-600 text-[9px] sm:text-[10px] md:text-[11px] xl:text-xs truncate">
                        <GoClock className="mr-1 text-gray-400" />
                        Created at {getFormatedDateTime(activity?.createdAt)}
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <span
                        className={`px-2  flex items-center justify-center text-[10px] md:text-xs xl:text-[14px]  py-1 rounded-md font-medium ${
                          activity?.hasSubmitted
                            ? "bg-light-green text-green-900"
                            : "bg-light-red text-red-900"
                        }`}
                      >
                        {activity?.hasSubmitted ? "Completed" : "Incomplete"}
                      </span>
                      {!activity?.hasSubmitted && (
                        <Tooltip
                          description={
                            "Complete or submit incomplete quizzes for accurate performance analytics."
                          }
                          position="left"
                        >
                          <TbInfoCircle className="text-custom-black cursor-pointer" />
                        </Tooltip>
                      )}
                    </div>
                  </div>
                )
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 overflow-y-auto max-h-[calc(100%-40px)]">
            <p className="text-center text-[#D1D5DB]">No recent activities</p>
          </div>
        )}
      </div>

      <div className="  w-full text-center flex items-center justify-end h-[2%] min-h-[20px]">
        {isShowMore && (
          <button
            className="w-full h-full flex items-center justify-center text-dark-blue font-medium text-sm bg-inherit outline-none"
            onClick={() => dispatch(updatePage(page + 1))}
          >
            Show More <FaChevronRight className="ml-1" size={12} />
          </button>
        )}
      </div>
    </div>
  );
};

export default RecentActivities;
