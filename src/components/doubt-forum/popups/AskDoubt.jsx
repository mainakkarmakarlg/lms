import SubjectsDropdowns from "./ask-doubt/SubjectsDropdowns";
import UploadButtons from "../popups/UploadButtons";
import QuestionInput from "./ask-doubt/QuestionInput";
import AskDoubtActionButttons from "../popups/AskDoubtActionButttons";
import { useDispatch, useSelector } from "react-redux";
import { askQuestion } from "../../../apiCalls/doubt-forum/questions";
import { addInQuestions } from "../../../redux/slices/doubt-forum/doubtForumQuestions";
import Attachments from "../attachments/Attachments";
import { useState } from "react";
import SourcesDropdowns from "./ask-doubt/SourcesDropdowns";
import toast from "react-hot-toast";
import { validateAskDoubt } from "../../../apiCalls/doubt-forum/validators/question";

const AskDoubt = ({ onClose }) => {
  const {
    questionText,
    fallNumId,
    selectedSubject,
    selectedTopic,
    selectedPoint,
    selectedSource,
  } = useSelector((state) => state.doubtForumAskDoubt);
  const { accessToken, user } = useSelector((state) => state.user);

  const [attachments, setAttachments] = useState([]);

  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const submitQuestion = async (e) => {
    e.preventDefault();
    const validatableParams = {
      questionText,
      fallNumId,
      selectedSubject,
      selectedTopic,
      selectedPoint,
      selectedSource,
    };
    const error = validateAskDoubt(validatableParams);
    if (error) {
      setError(error);
      return;
    }

    let uploadedFiles = attachments.map((file) => file.link);
    const formData = new FormData();
    formData.append("question", questionText);
    formData.append("fallNumId", fallNumId);

    uploadedFiles.forEach((file) => {
      formData.append("uploadedFiles", file); // Ensure backend expects this key
    });

    try {
      const response = await askQuestion(formData, accessToken); // Ensure API handles FormData
      if (response?.status === 200 || response?.status === 201) {
        const questionToAppend = {
          ...response?.data,
          User: user,
        };
        dispatch(addInQuestions(questionToAppend));
        toast.success("Question asked successfully", {
          position: "bottom-center",
        });
      }
    } catch (error) {
      console.error("Error submitting question:", error);
      toast.error("Error submitting question", { position: "bottom-center" });
    }

    onClose();
  };

  return (
    <form
      className="md:w-[500px] sm:w-[80vw] w-[85vw]"
      onSubmit={submitQuestion}
    >
      <div className=" space-y-5">
        <SubjectsDropdowns setError={setError} />
        <SourcesDropdowns />
        <QuestionInput />
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
          width="full"
        />

        <AskDoubtActionButttons onCancel={onClose} />
      </div>
    </form>
  );
};

export default AskDoubt;
