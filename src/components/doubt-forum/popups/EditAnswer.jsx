import { useState } from "react";
import UploadButtons from "../popups/UploadButtons";
import Attachments from "../attachments/Attachments";
import AskDoubtActionButttons from "../popups/AskDoubtActionButttons";
import { useDispatch, useSelector } from "react-redux";
import { patchAnswer } from "../../../apiCalls/doubt-forum/answers";
import { editAnswer } from "../../../redux/slices/doubt-forum/doubtForumQuestionDetailsAnswer";

const EditAnswer = ({ onClose }) => {
  const { selectedAnswer } = useSelector(
    (state) => state.doubtForumQuestionDetailsAnswer
  );
  const { accessToken, user } = useSelector((state) => state.user);

  const [attachments, setAttachments] = useState(
    selectedAnswer?.attachments || []
  );
  const [removedAttachments, setRemovedAttachments] = useState([]);
  const [questionText, setQuestionText] = useState(selectedAnswer?.answerText);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setQuestionText(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadedFiles = attachments.map((file) => file.link);

    const formData = new FormData();
    formData.append("text", questionText);
    if (removedAttachments.length > 0) {
      formData.append("removedAttachments", JSON.stringify(removedAttachments));
    }
    for (let i = 0; i < uploadedFiles.length; i++) {
      formData.append("uploadedFiles", uploadedFiles[i]);
    }

    const response = await patchAnswer(
      selectedAnswer?.id,
      formData,
      accessToken
    );
    if (response?.status === 200 || response?.status === 201) {
      const data = {
        ...response?.data?.updatedAnswer,
        User: user,
        Likes: selectedAnswer?.Likes,
      };
      dispatch(editAnswer(data));
    }
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="md:w-[500px] w-full flex flex-col space-y-4"
    >
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
      <UploadButtons
        attachments={attachments}
        setError={setError}
        setAttachments={setAttachments}
        error={error}
      />
      <Attachments
        editable={true}
        setError={setError}
        attachments={attachments}
        setAttachments={setAttachments}
        removedAttachment={removedAttachments}
        setRemovedAttachments={setRemovedAttachments}
        width="full"
      />

      <AskDoubtActionButttons />
    </form>
  );
};

export default EditAnswer;
