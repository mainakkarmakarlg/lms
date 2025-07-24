import { useDispatch, useSelector } from "react-redux";
import SearchBox from "../search/SearchBox";
import SubjectList from "../SubjectList";

import { setSelectedQuestionCount } from "../../../../redux/slices/practice-quiz/customizeOptions";
import { useEffect } from "react";
import { getSelectedQuestionCount } from "../../../../utils/quizes/practice-quiz/getSelectedQuestionsCount";

const Home = () => {
  const { subjects } = useSelector((state) => state.quizSubjects);
  const { selectedQuestionCount } = useSelector(
    (state) => state.customizeOptions
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const questionCount = getSelectedQuestionCount(subjects);
    dispatch(setSelectedQuestionCount(questionCount));
  }, [subjects, dispatch]);

  return (
    <div className="w-full flex-col space-y-3 h-full ">
      <div className="flex w-full h-fit  flex-col md:flex-row  justify-between ">
        <div className="w-full md:w-[60%]">
          <SearchBox />
        </div>
        <div className="w-full md:w-[40%] flex items-center justify-end mt-2 md:mt-0">
          <h2
            title="something"
            className={`text-sm md:text-base lg:text-lg text-custom-black font-semibold ${selectedQuestionCount > 0 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-40"}  duration-300 ease-in-out`}
          >
            Selected Questions : {selectedQuestionCount}
          </h2>
        </div>
      </div>
      <div className="w-full  h-full overflow-y-auto scrollbar">
        {subjects?.length > 0 && <SubjectList subjects={subjects} />}
      </div>
    </div>
  );
};

export default Home;
