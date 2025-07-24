import { useEffect } from "react";
import StatsSection from "./stats-section/StatsSection";
import { useDispatch, useSelector } from "react-redux";
import { setSubjects } from "../../../redux/slices/practice-quiz/quizSubjects";
import useGetData from "../../../hooks/useGetData";
import Loader from "../../../components/common/Loader";
import CreateQuizContainer from "../../../components/quizes/practice-quiz/createQuizSection/CreateQuizContainer";
import RecentActivities from "../../../components/quizes/practice-quiz/recentActivities/RecentActivities";
import { practiceQuizLoaderText } from "../../../constants/loaderText";

export default function SubjectSelector() {
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course);
  const { subjects } = useSelector((state) => state.quizSubjects);
  const courseId = course?.course?.id;

  // Prevent API call if subjects already exist
  const { data, loading } = useGetData(
    courseId ? `/practice/subject?courseId=${courseId}` : null
  );

  useEffect(() => {
    if (data) {
      //delete all subject where questionCount is 0
      const newData = data.filter((subject) => subject.questionCount > 0);
      // console.log(newData);
      dispatch(setSubjects(newData));
    }
  }, [data, dispatch, subjects.length]);

  return (
    <div className="w-full  h-full flex justify-center ">
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader fullHeight={"h-full"} loadingTexts={practiceQuizLoaderText} />
        </div>
      ) : (
        <div className="w-full h-full flex items-center  flex-col space-y-5 lg:space-y-10 overflow-y-auto">
          <div className="flex w-full h-[70px]">
            <h1 className="text-md font-semibold text-custom-black text-2xl lg:text-3xl">
              Practice Questions
            </h1>
          </div>
          <div className="w-full  flex flex-col lg:flex-row lg:justify-between space-y-5 lg:space-y-0   items-stretch h-fit lg:min-h-[72vh] lg:max-h-[72vh] ">
            <div className="w-full lg:w-[55%] min-h-[600px]  lg:min-h-full lg:max-h-full max-h-[600px] ">
              <CreateQuizContainer />
            </div>
            <div className="w-full lg:w-[43%]">
              <RecentActivities />
            </div>
          </div>
          <StatsSection />
        </div>
      )}
    </div>
  );
}
