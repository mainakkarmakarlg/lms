import { useState } from "react";
import { useSelector } from "react-redux";
import { questionReport } from "../../../apiCalls/doubt-forum/questions";
import Button from "../../common/Button";
import { answerreport } from "../../../apiCalls/doubt-forum/answers";
import { QUESTION_REPORT_CATEGORIES } from "../../../constants/doubtForum";
import toast from "react-hot-toast";

const Report = ({ type, onClose, question, answer }) => {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const { accessToken } = useSelector((state) => state.user);
  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleCategoryChange = (e) => {
    console.log(e.target.value);

    setCategory(e.target.value);
  };

  const reportQuestion = async () => {
    const data = {
      reason: category === "Other" ? text : category,
    };
    const response = await questionReport(question?.id, data, accessToken);
    if (response?.status === 200 || response?.status === 201) {
      toast.success("Question reported");
    } else {
      toast.error("Error reporting question , please try again");
    }
  };

  const reportAnswer = async () => {
    const data = {
      reason: category === "Other" ? text : category,
    };
    const response = await answerreport(answer?.id, data, accessToken);
    if (response?.status === 200 || response?.status === 201) {
      toast.success("Answer reported");
    } else {
      toast.error("Error reporting answer , please try again");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type === "question") {
      await reportQuestion();
    } else {
      await reportAnswer();
    }

    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-fit space-y-5 duration-500 transition-all ease-in-out w-[450px]"
    >
      <div className="flex flex-col space-y-4 w-full">
        {QUESTION_REPORT_CATEGORIES?.map((category) => {
          return (
            <div key={category?.id} className="flex items-center space-x-2 ">
              <input
                type="radio"
                name="reason"
                id={category?.id}
                value={category?.value}
                className="w-4 h-4 cursor-pointer"
                onChange={handleCategoryChange}
              />
              <label
                htmlFor={category?.id}
                className="text- font-semibold text-gray-700 cursor-pointer"
              >
                {category?.value}
              </label>
            </div>
          );
        })}
      </div>
      {category === "Other" && (
        <div className="w-full border p-1 rounded-md">
          <textarea
            className="resize-none border-none outline-none w-full text-slate-700"
            required={category === "Other" ? true : false}
            placeholder="Reason for reporting"
            value={text}
            onChange={handleChange}
            name=""
            id=""
            rows="5"
          ></textarea>
        </div>
      )}
      <div className="w-full flex items-center justify-end">
        <Button type="submit" size="small" variant="contained" color="primary">
          Report
        </Button>
      </div>
    </form>
  );
};

export default Report;
