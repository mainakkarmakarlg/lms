import { useDispatch, useSelector } from "react-redux";
import { setQuestionText } from "../../../../redux/slices/doubt-forum/doubtforumEditDoubt";

const QuestionInput = () => {
  const { questionText } = useSelector((state) => state.doubtForumEditDoubt);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setQuestionText(event.target.value));
  };
  return (
    <div className="w-full border rounded-md p-2">
      <textarea
        value={questionText}
        onChange={handleChange}
        name="ask-doubt-question-text"
        id="ask-doubt-question-text"
        rows={"4"}
        className="w-full resize-none"
        placeholder="Write your question here"
      ></textarea>
    </div>
  );
};

export default QuestionInput;
