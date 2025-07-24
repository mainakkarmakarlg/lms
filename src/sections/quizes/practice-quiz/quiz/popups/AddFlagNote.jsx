import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeFlagPopup } from "../../../../../redux/slices/practice-quiz/flagQuestions";
import {
  removeFromFlaggedQuestions,
  setFlaggedQuestions,
} from "../../../../../redux/slices/practice-quiz/questionNavigator";
import { questionFlag } from "../../../../../apiCalls/quiz/questions";
import { MdClose } from "react-icons/md";
import Button from "../../../../../components/common/Button";
import findCurrentQuestion from "../../../../../utils/quizes/practice-quiz/findCurrentQuestion";

const AddNotePopup = () => {
  const { currentQuestionIdx, currentSubQuestionIdx, questions } = useSelector(
    (state) => state.questions
  );
  const { course } = useSelector((state) => state.course);
  const { flaggedQuestions } = useSelector((state) => state.questionNavigator);
  const { accessToken } = useSelector((state) => state.user);

  const question = findCurrentQuestion(
    questions,
    currentQuestionIdx,
    currentSubQuestionIdx
  )?.Question;

  const flagged = flaggedQuestions?.find((q) => q.questionId === question?.id);

  const [noteText, setNoteText] = useState(flagged?.text || "");

  const dispatch = useDispatch();
  const closePopup = () => {
    dispatch(closeFlagPopup());
  };

  const addNote = async () => {
    const data = {
      courseId: course?.course?.id,
      questionId: questions[currentQuestionIdx]?.Question?.id,
      flagText: noteText,
    };

    const response = await questionFlag(data, accessToken);
    if (response?.status === 200 || response?.status === 201) {
      const temp = [...flaggedQuestions];
      const index = temp.findIndex(
        (question) =>
          question.questionId === questions[currentQuestionIdx]?.Question?.id
      );
      temp[index] = { ...temp[index], text: noteText };
      dispatch(setFlaggedQuestions([...temp]));
      closePopup();
    }
  };

  const removeNote = async () => {
    const data = {
      questionId: question?.id,
      courseId: course?.course?.id,
      flagText: "",
    };
    const response = await questionFlag(data, accessToken);
    if (response?.status === 201 || response?.status === 200) {
      dispatch(removeFromFlaggedQuestions(question?.id));
      closePopup();
    } else {
      console.error(response);
    }
  };

  const removeFromFlag = async () => {
    const data = {
      courseId: course?.course?.id,
      questionId: question?.id,
      remove: true,
    };
    const response = await questionFlag(data, accessToken);
    if (response?.status === 200 || response?.status === 201) {
      setNoteText("");
      console.log("removeFromFlag", flaggedQuestions);
      const temp = flaggedQuestions?.filter(
        (q) => q.questionId !== question?.id
      );
      dispatch(setFlaggedQuestions([...temp]));
      closePopup();
    }
  };

  return (
    <>
      <div className="h-full left-0 w-full fixed top-0 z-50">
        <div className="relative h-full w-full flex items-center justify-center">
          <div className="bg-white relative h-fit md:h-fit  mx-auto z-50 w-[90%] sm:w-[70%] md:w-[70%] lg:w-[60%] xl:w-[40%] rounded-md space-y-5">
            {/* Header */}
            <div className="text-slate-500 px-5 pt-5 flex items-center justify-between rounded-tl-md rounded-tr-md">
              <h1 className="text-base md:text-xl font-semibold">
                Add your note
              </h1>
              <div onClick={closePopup} className="cursor-pointer">
                <MdClose className="text-lg" />
              </div>
            </div>
            {/* Content */}
            <div className="flex items-center justify-center px-5">
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
          <div
            onClick={closePopup}
            className="bg-black opacity-30 absolute top-0 h-screen w-full z-40"
          ></div>
        </div>
      </div>
    </>
  );
};

export default AddNotePopup;
