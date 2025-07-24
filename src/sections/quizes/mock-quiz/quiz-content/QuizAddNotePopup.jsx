import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { questionFlagForQuiz } from "../../../../apiCalls/mock-quiz/flage";
import { updateFlagged } from "../../../../redux/slices/mock-quiz/mockQuestions";
import { MdClose } from "react-icons/md";
import Button from "../../../../components/common/Button";
import toast from "react-hot-toast";

const QuizAddNotePopup = ({ onRequestClose, question }) => {
  const { accessToken } = useSelector((state) => state.user);
  const flagged = question?.UserFlags?.[0];
  const [noteText, setNoteText] = useState(flagged?.flagText || "");

  const dispatch = useDispatch();
  const closePopup = () => {
    // dispatch(closeFlagPopup());
    onRequestClose();
  };

  const addNote = async () => {
    const data = {
      questionId: question?.id,
      flagText: noteText,
    };

    const response = await questionFlagForQuiz(data, accessToken);
    if (response?.status === 200 || response?.status === 201) {
      toast.success("Note added successfully");
      dispatch(
        updateFlagged({
          questionId: question?.id,
          updatedFlagged: response?.data,
        })
      );
      closePopup();
    }
  };

  const removeNote = async () => {
    const data = {
      questionId: question?.id,
      flagText: "",
    };
    const response = await questionFlagForQuiz(data, accessToken);
    if (response?.status === 201 || response?.status === 200) {
      toast.success("Note removed successfully");
      dispatch(
        updateFlagged({
          questionId: question?.id,
          updatedFlagged: response?.data,
        })
      );
    } else {
      console.error(response);
    }
    closePopup();
  };

  const removeFromFlag = async () => {
    const data = {
      questionId: question?.id,
      remove: true,
    };
    const response = await questionFlagForQuiz(data, accessToken);
    if (response?.status === 200 || response?.status === 201) {
      toast.success("Question unflagged successfully");
      dispatch(
        updateFlagged({
          questionId: question?.id,
          updatedFlagged: null,
        })
      );
      setNoteText("");
      closePopup();
    }
  };

  return (
    <div className=" h-full w-full flex items-center justify-center">
      <div className="bg-white relative rounded-md space-y-5 w-full">
        {/* Header */}
        <div className="text-slate-500 px-5 pt-5 flex items-center justify-between rounded-tl-md rounded-tr-md">
          <h1 className="text-base md:text-xl font-semibold">Add your note</h1>
          <div onClick={closePopup} className="cursor-pointer">
            <MdClose className="text-lg" />
          </div>
        </div>
        {/* Content */}
        <div className="flex w-full items-center justify-center px-5">
          <textarea
            name="lecture-guide-add-note"
            id="lecture-guide-add-note"
            className="w-full h-40 border text-base text-slate-500 bg-gray-100 border-none outline-none rounded-md p-3 resize-none placeholder:text-sm md:placeholder:text-base"
            placeholder="Write your note here"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          ></textarea>
        </div>
        {/* Footer */}
        <div className="flex items-start justify-between space-x-2 px-5 h-[50px] ">
          <Button size="small" onClick={removeFromFlag} color="danger">
            UnFlag
          </Button>
          <div className="flex items-center space-x-2">
            {noteText && (
              <Button size="small" onClick={removeNote} color="danger">
                Remove
              </Button>
            )}
            <Button
              size="small"
              onClick={addNote}
              className=" text-white"
              disabled={noteText === ""}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizAddNotePopup;
