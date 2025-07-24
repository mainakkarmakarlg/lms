import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import {
  updateSubject,
  updateTopic,
} from "../../redux/slices/practice-quiz/quizSubjects";
const QuizTag = ({ obj, subjectId, topicId }) => {
  const dispatch = useDispatch();
  const handleRemoveTag = () => {
    if (subjectId && topicId) {
      dispatch(
        updateTopic({
          subjectId,
          topicId,
          topic: {
            ...obj,
            selected: false,
          },
        })
      );
    } else if (subjectId && !topicId) {
      const newTopics = obj?.Subjects?.map((topic) => ({
        ...topic,
        selected: false,
      }));
      const newSubject = {
        ...obj,
        selected: false,
        Subjects: newTopics,
      };
      dispatch(updateSubject(newSubject));
    }
  };
  return (
    <div
      className="max-w-full py-1 px-2 border flex items-center
     justify-between rounded-xl mx-1 my-1  text-sm"
    >
      <p className="w-full truncate">{obj?.name}</p>
      <IoClose className="cursor-pointer" onClick={handleRemoveTag} />
    </div>
  );
};

export default QuizTag;
