import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import getResult from "../../apiCalls/mock-quiz/getResult";
import { setResult } from "../../redux/slices/mock-quiz/mockResult";
import Container from "../../components/common/Container";
import MockResultOverview from "../../sections/quizes/mock-quiz/result/MockResultOverview";
import MockCompletionRatio from "../../sections/quizes/mock-quiz/result/MockCompletionRatio";
import MockResultAnalysis from "../../sections/quizes/mock-quiz/result/MockResultAnalysis";
import MockQuestionWiseResult from "../../sections/quizes/mock-quiz/result/MockQuestionWiseResult";
import Button from "../../components/common/Button";
import { MdHome } from "react-icons/md";
import Loader from "../../components/common/Loader";
import { resetAll } from "../../redux/slices/mock-quiz/mockQuestions";
import { mockQuizLoaderText } from "../../constants/loaderText";

const MockResult = () => {
  const { accessToken } = useSelector((state) => state.user);
  const { isCourseWatched } = useSelector((state) => state.app);
  const { course } = useSelector((state) => state.course);

  const [loading, setLoading] = useState(true);

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { attemptId } = params;
  // console.log("course ______________________________--", course);
  useEffect(() => {
    const apiCall = async () => {
      const courseId = course?.course?.id;
      const response = await getResult(
        `/quiz/quizattemptanswer?courseId=${courseId}&attemptId=${attemptId}`,
        accessToken
      );
      if (response?.status === 200 || response?.status === 201) {
        dispatch(setResult(response?.data));
      }
      setLoading(false);
    };
    if (attemptId && accessToken && isCourseWatched && course) {
      apiCall();
    }
  }, [isCourseWatched, accessToken, attemptId, dispatch, params, course]);
  useEffect(() => {
    dispatch(resetAll());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <div className="w-[100vw] h-[100vh] flex items-center justify-center">
          <Loader fullHeight={true} loadingTexts={mockQuizLoaderText} />
        </div>
      ) : (
        <div className="w-full h-fit">
          <Container className="h-auto flex flex-col justify-center space-y-6 ">
            <MockResultOverview />
            <MockCompletionRatio />
            <MockResultAnalysis />
            <MockQuestionWiseResult />
            <div className="w-full flex justify-center items-center">
              <Button
                color="primary"
                className="mt-4 p-2 justify-center"
                endIcon={<MdHome />}
                onClick={() =>
                  navigate(`/mock-quiz/${params?.combination}/${params?.phone}`)
                }
              >
                Back to Home
              </Button>
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

export default MockResult;
