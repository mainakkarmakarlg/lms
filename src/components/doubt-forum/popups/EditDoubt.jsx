import SubjectsDropdowns from "./edit-doubt/EditSubjectDropDown";
import UploadButtons from "../popups/UploadButtons";
import QuestionInput from "./edit-doubt/EditDoubtQuestionInput";
import AskDoubtActionButttons from "../popups/AskDoubtActionButttons";
import { useDispatch, useSelector } from "react-redux";
import { patchQuestion } from "../../../apiCalls/doubt-forum/questions";
import Attachments from "../attachments/Attachments";
import { useState } from "react";
import SourcesDropdowns from "./edit-doubt/EditDoubtSourceDropdown";
import toast from "react-hot-toast";
import isBlob from "../../../utils/common/isBlob";
import { setQuestion } from "../../../redux/slices/doubt-forum/doubtForumQuestionDetails";
import { validateEditDoubt } from "../../../apiCalls/doubt-forum/validators/question";

const EditDoubt = ({ onClose }) => {
  const {
    questionText,
    fallNumId,
    selectedSubject,
    selectedTopic,
    selectedPoint,
    selectedSource,
    question,
    attachments: questionAttachments,
  } = useSelector((state) => state.doubtForumEditDoubt);
  const { accessToken } = useSelector((state) => state.user);

  const [attachments, setAttachments] = useState(questionAttachments || []);
  const [removedAttachments, setRemovedAttachments] = useState([]);

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
    const error = validateEditDoubt(validatableParams);
    if (error) {
      setError(error);
      return;
    }
    let uploadedFiles = attachments.filter((file) => {
      // If conatins any blob return only blobs
      if (isBlob(file.link)) {
        return file.link;
      }
    });

    const formData = new FormData();
    formData.append("text", questionText);
    if (removedAttachments.length > 0) {
      formData.append("removedAttachments", JSON.stringify(removedAttachments));
    }
    formData.append("fallNumId", fallNumId);

    uploadedFiles.forEach((file) => {
      formData.append("uploadedFiles", file.link);
    });

    try {
      const response = await patchQuestion(formData, question?.id, accessToken);
      if (response?.status === 200 || response?.status === 201) {
        console.log(response?.data?.updatedQuestion);

        dispatch(setQuestion(response?.data?.updatedQuestion));
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
        <SubjectsDropdowns />
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
          removedAttachment={removedAttachments}
          setRemovedAttachments={setRemovedAttachments}
          width="full"
        />

        <AskDoubtActionButttons />
      </div>
    </form>
  );
};

export default EditDoubt;
