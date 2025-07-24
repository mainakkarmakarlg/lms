import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addInReportedQuestions,
  closeReportPopup,
} from "../../../../../redux/slices/practice-quiz/reportQuestion";
import { questionReport } from "../../../../../apiCalls/quiz/questions";
import { MdClose } from "react-icons/md";
import MultiSelectWithTags from "../../../../../components/common/MultiSelectWithTags";
import { QUIZ_REPORT_CATEGORIES } from "../../../../../constants/reportCategories";
import findCurrentQuestion from "../../../../../utils/quizes/practice-quiz/findCurrentQuestion";

const ReportQuestionPopup = () => {
  const { currentQuestionIdx, currentSubQuestionIdx, questions } = useSelector(
    (state) => state.questions
  );
  const { course } = useSelector((state) => state.course);
  const { accessToken } = useSelector((state) => state.user);

  // Update: State to handle multiple selected categories
  const [categories, setCategories] = useState([]);
  const [reportText, setReportText] = useState("");

  const dispatch = useDispatch();

  // Update: Handle multiple selections
  const handleCategoryChange = (e) => {
    setCategories(e);
  };

  const handleReportTextChange = (e) => {
    setReportText(e.target.value);
  };

  const closePopup = () => {
    dispatch(closeReportPopup());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (categories?.includes("Other") && reportText === "") {
      alert("Please enter the description");
    }
    const question = findCurrentQuestion(
      questions,
      currentQuestionIdx,
      currentSubQuestionIdx
    )?.Question;

    const data = {
      questionId: question.id,
      category: JSON.stringify(categories), // Update: send categories array
      reportTag: categories,
      report: reportText,
      courseId: course?.course?.id,
    };

    const response = await questionReport(data, accessToken);
    if (response?.status === 200 || response?.status === 201) {
      dispatch(addInReportedQuestions(question?.id));
      closePopup();
    }
  };

  return (
    <div className="h-full w-full fixed top-0 left-0 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="h-fit xl:w-[30%] md:w-[60%] w-[90%] bg-white dark:bg-blackish shadow-custom-sm flex relative z-50 flex-col items-center justify-center md:p-12 p-5 rounded-md"
      >
        {/* Close Icon */}
        <div className="absolute top-3 right-3 cursor-pointer">
          <MdClose
            onClick={closePopup}
            className="text-2xl text-black dark:text-white"
          />
        </div>

        {/* Heading */}
        <div className="mb-5">
          <h3 className="text-2xl font-bold text-black dark:text-white">
            Report
          </h3>
        </div>

        {/* Body */}
        <div className="w-full flex flex-col space-y-6">
          {/* Multi-Select Dropdown */}
          <MultiSelectWithTags
            options={QUIZ_REPORT_CATEGORIES}
            selectedValues={categories}
            onChange={handleCategoryChange}
          />

          {/* Report Text Area */}
          <textarea
            name="report-text"
            id="report-text"
            placeholder="Please describe the issue"
            className="bg-gray-200 dark:bg-slate-700 p-2 text-black dark:text-white rounded-md border-none outline-none resize-none"
            onChange={handleReportTextChange}
            value={reportText}
            rows={5}
            cols={30}
            required={categories?.includes("Others") ? true : false}
          />

          {/* Submit Button */}
          <div className="submit-btn w-full">
            <button
              className="w-full flex items-center justify-center bg-primary text-white py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              type={"submit"}
              disabled={
                categories.length === 0 ||
                (categories.includes("Others") && reportText === "")
              }
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      <div
        onClick={closePopup}
        className="h-full w-full bg-black opacity-20 absolute z-40"
      ></div>
    </div>
  );
};

export default ReportQuestionPopup;
