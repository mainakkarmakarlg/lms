import { useEffect, useRef, useState } from "react";
import Button from "../../../../../components/common/Button";
import { LuMessageSquare } from "react-icons/lu";
import { postAnswer } from "../../../../../apiCalls/doubt-forum/answers";
import { useDispatch, useSelector } from "react-redux";
import { appendAnswerInQuestion } from "../../../../../redux/slices/doubt-forum/doubtForumQuestionDetails";
import UploadButtons from "./all-answers/UploadButtons";
import Attachments from "../../../../../components/doubt-forum/attachments/Attachments";
import { addInAnswers } from "../../../../../redux/slices/doubt-forum/doubtForumQuestionDetailsAnswer";

const AnswerBox = () => {
  const { question } = useSelector((state) => state.doubtForumQuestionDetails);
  const { accessToken, user } = useSelector((state) => state.user);

  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [attachments, setAttachments] = useState([]);

  const textareaRef = useRef(null);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // Reset height to recalculate
    textarea.style.height = `${textarea.scrollHeight}px`; // Set to new height
    setAnswer(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let uploadedFiles = attachments.map((file) => file.link);

    const formData = new FormData();
    formData.append("answer", answer);
    uploadedFiles.forEach((file) => {
      formData.append("uploadedFiles", file); // Ensure backend expects this key
    });

    const response = await postAnswer(question.id, formData, accessToken);

    if (response?.status === 200 || response?.status === 201) {
      const answer = {
        ...response?.data,
        User: user,
      };

      dispatch(appendAnswerInQuestion(answer));
      dispatch(addInAnswers(answer));
      setAnswer("");
      setAttachments([]);
    }
  };

  useEffect(() => {
    setAnswer("");
    setAttachments([]);
  }, [question]);

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="px-5 flex flex-col space-y-3">
        <div className="w-full border rounded-md p-2">
          <div className="flex items-start justify-between">
            <textarea
              placeholder="Write your answer here"
              ref={textareaRef}
              value={answer}
              onInput={handleChange}
              className="outine-none border-none w-full text-gray-500 whitespace-pre-wrap resize-none"
            />
            <UploadButtons
              attachments={attachments}
              setAttachments={setAttachments}
              error={error}
              setError={setError}
            />
          </div>
          <Attachments
            attachments={attachments}
            setAttachments={setAttachments}
            error={error}
            setError={setError}
            editable={true}
            width="fit"
          />
        </div>

        <div className="w-full flex space-x-2 items-center justify-end">
          <Button
            name={"cancel-answer"}
            id={"cancel-answer"}
            color="neutral"
            size="small"
            type="button"
            disabled={answer.length === 0}
            onClick={() => setAnswer("")}
          >
            Cancel
          </Button>
          <Button
            name={"cancel-answer"}
            id={"cancel-answer"}
            color="highlight"
            size="small"
            type="submit"
            disabled={answer.length === 0}
            startIcon={<LuMessageSquare />}
          >
            Answer
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AnswerBox;
