import { useCallback, useEffect, useState } from "react";
import QuestionFallNumber from "./question-content/QuestionFallNumber";
import { fetchQuestion } from "../../../../apiCalls/doubt-forum/questions";
import { useDispatch, useSelector } from "react-redux";
import QuestionAuthor from "./question-content/QuestionAuthor";
import QuestionText from "./question-content/QuestionText";
import { setQuestion } from "../../../../redux/slices/doubt-forum/doubtForumQuestionDetails";
import QuestionActionButtons from "./question-content/QuestionActionButtons";
import { setSelectedQuestionAnswers } from "../../../../redux/slices/doubt-forum/doubtForumQuestionDetailsAnswer";
import Loader from "../../../../components/common/Loader";

const QuestionContent = () => {
  const { selectedQuestion, question } = useSelector(
    (state) => state.doubtForumQuestionDetails
  );
  const { accessToken } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const getQuestion = useCallback(async () => {
    if (!selectedQuestion?.questionId) return;
    setLoading(true);
    const response = await fetchQuestion(
      selectedQuestion?.questionId,
      accessToken
    );
    if (response?.status === 200 || response?.status === 201) {
      dispatch(setQuestion(response?.data));
      dispatch(setSelectedQuestionAnswers(response?.data?.Answers));
    }
    setLoading(false);
  }, [dispatch, accessToken, selectedQuestion?.questionId]);

  useEffect(() => {
    getQuestion();
  }, [getQuestion]);

  return (
    <div className="w-full space-y-3">
      {loading ? (
        <div className="h-[80vh] w-full flex justify-center items-center">
          <Loader fullHeight={true} loadingTexts={["Loading Question"]} />
        </div>
      ) : (
        <>
          {question ? (
            <>
              <QuestionFallNumber question={question} />
              <QuestionAuthor question={question} />
              <QuestionText question={question} />
              <QuestionActionButtons question={question} />
            </>
          ) : (
            <div className="w-full flex justify-center items-center">
              <span className="text-sm text-gray-500">
                Something went wrong please try again
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QuestionContent;
