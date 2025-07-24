import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setTimeTaken } from "../../redux/slices/practice-quiz/timer";
import { extractSubjectChapterLosFromQuestion } from "../../utils/common/extractSubjectChapterLosFromQuestion";
import { setResult } from "../../redux/slices/practice-quiz/result";
import instance from "../../utils/instance";
import { getHeaders } from "../../utils/requestHeaders";

const useGetQuizResult = ({ canRequest }) => {
  const { course } = useSelector((state) => state.course);
  const { result } = useSelector((state) => state.result);
  const { accessToken } = useSelector((state) => state.user);

  const [loader, setLoader] = useState(true);

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const courseId = course?.course?.id;
  const attemptId = params?.attemptId;

  const getResult = useCallback(async () => {
    const url = `/practice/attemptanswer?courseId=${courseId}&attemptId=${attemptId}`;
    const headers = getHeaders(accessToken);
    try {
      const response = await instance.get(url, { headers });
      if (response?.status === 200 || response?.status === 201) {
        if (response?.data?.Answer?.length > 0) {
          if (response?.data?.hasSubmitted) {
            dispatch(setTimeTaken(response?.data?.timeTaken));
            const formattedAnswers = response?.data?.Answer.map((answer) => {
              const subjectChapterLos =
                answer?.Question?.FallNumber?.[0]?.FallNumber?.Subject?.[0] &&
                extractSubjectChapterLosFromQuestion(
                  answer.Question.FallNumber[0].FallNumber.Subject[0]
                );

              return {
                id: answer.questionId,
                timeTaken: answer?.timeTaken,
                Question: answer.Question,
                subject: subjectChapterLos?.subject,
                topic: subjectChapterLos?.chapter,
                los: subjectChapterLos?.los,
                fullObj: answer,
                answer: answer,
                status: answer?.Option
                  ? answer?.Option?.RightOption
                    ? "Correct"
                    : "Wrong"
                  : "Not Attempted",
              };
            }).filter(Boolean); // Remove any null values

            dispatch(setResult(formattedAnswers));
          }
        }
      }
    } catch (error) {
      console.error(error);

      //   if (error) {
      navigate(`/error/${params?.combination}/${params?.phone}`);
      //   }
    } finally {
      setLoader(false);
    }
  }, [
    accessToken,
    attemptId,
    courseId,
    dispatch,
    navigate,
    params?.combination,
    params?.phone,
  ]);

  useEffect(() => {
    if (!result) {
      if (canRequest) {
        getResult();
      }
    } else {
      setLoader(false);
    }
  }, [getResult, dispatch, result, canRequest]);

  return { loader };
};

export default useGetQuizResult;
