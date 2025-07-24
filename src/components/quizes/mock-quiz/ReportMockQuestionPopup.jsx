import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MultiSelectWithTags from "../../common/MultiSelectWithTags";
import { QUIZ_REPORT_CATEGORIES } from "../../../constants/reportCategories";
import instance from "../../../utils/instance";
import { getHeaders } from "../../../utils/requestHeaders";
import { updateReport } from "../../../redux/slices/mock-quiz/mockQuestions";
import toast from "react-hot-toast";

const ReportMockQuestionPopup = ({ onRequestClose }) => {
  const { currentQuestionIdx, currentSubQuestionIdx } = useSelector(
    (state) => state.mockQuestions
  );
  const { questions } = useSelector((state) => state.mockQuestions);

  const { course } = useSelector((state) => state.course);
  const { accessToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // Update: State to handle multiple selected categories
  const [categories, setCategories] = useState([]);
  const [reportText, setReportText] = useState("");
  // console.log(
  //   "report Question",
  //   currentQuestionIdx,
  //   currentSubQuestionIdx,
  //   questions[currentQuestionIdx]
  // );

  // Update: Handle multiple selections
  const handleCategoryChange = (e) => {
    setCategories(e);
  };

  const handleReportTextChange = (e) => {
    setReportText(e.target.value);
  };

  // const closePopup = () => {
  //   dispatch(closeReportPopup());
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (categories?.includes("Other") && reportText === "") {
      alert("Please enter the description");
      return;
    }

    const question =
      currentSubQuestionIdx !== null
        ? questions[currentQuestionIdx]?.Questions?.[currentSubQuestionIdx]
        : questions[currentQuestionIdx];

    if (!question?.id) {
      alert("Question not found.");
      return;
    }

    const data = {
      questionId: question.id,
      category: JSON.stringify(categories),
      reportTag: categories,
      report: reportText,
      courseId: course?.course?.id,
    };

    try {
      const headers = getHeaders(accessToken);
      const response = await instance.post("quiz/report", data, { headers });

      if (response?.status === 200 || response?.status === 201) {
        toast.success("Reported successfully ", { position: "top-center" });
        dispatch(
          updateReport({ questionId: question?.id, updatedReport: data })
        );
      } else {
        console.error("Error submitting report:", response);
      }
    } catch (error) {
      toast.error("Error submitting report, please try again");
      console.error("Error submitting report:", error);
    } finally {
      onRequestClose();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full flex flex-col space-y-2"
    >
      {/* Close Icon */}

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
  );
};

export default ReportMockQuestionPopup;
