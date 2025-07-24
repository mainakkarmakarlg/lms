import { useEffect, useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedQuestionCount } from "../../../../redux/slices/practice-quiz/customizeOptions";
import { getSelectedQuestionCount } from "../../../../utils/quizes/practice-quiz/getSelectedQuestionsCount";

const QuestionCounts = () => {
  const { subjects } = useSelector((state) => state.quizSubjects);
  const { selectedQuestionCount } = useSelector(
    (state) => state.customizeOptions
  );
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const questionCount = getSelectedQuestionCount(subjects);
    if (questionCount >= 50) {
      dispatch(setSelectedQuestionCount(50));
      setError("You can't attempt more than 50 questions");
    } else {
      setError(null);
      dispatch(setSelectedQuestionCount(questionCount));
    }
  }, [subjects, dispatch]);

  useEffect(() => {
    if (selectedQuestionCount >= 50) {
      setError("You can't attempt more than 50 questions");
      dispatch(setSelectedQuestionCount(50));
    } else {
      setError(null);
      dispatch(setSelectedQuestionCount(selectedQuestionCount));
    }
  }, [selectedQuestionCount, dispatch]);
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-white shadow-card rounded-lg space-y-1 p-4">
      <div className=" h-[40px] w-[40px] flex items-center justify-center border-2 border-primary rounded-full text-primary">
        <MdOutlineDone className="text-2xl" />
      </div>
      <h3 className="text-custom-black text-lg font-semibold text-center">
        Total Question Avaliable{" "}
      </h3>
      <p className="text-2xl text-custom-black font-bold">
        {selectedQuestionCount}
      </p>
      {error && (
        <p className="text-red-500 text-sm font-semibold text-center">
          {error}
        </p>
      )}
    </div>
  );
};

export default QuestionCounts;
