import { useDispatch, useSelector } from "react-redux";
import { setQuestionText } from "../../../../redux/slices/doubt-forum/doubtForumAskDoubt";

const QuestionInput = () => {
  const { questionText } = useSelector((state) => state.doubtForumAskDoubt);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setQuestionText(event.target.value));
  };
  return (
    <div className="w-full border rounded-md p-2">
      <textarea
        required
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
