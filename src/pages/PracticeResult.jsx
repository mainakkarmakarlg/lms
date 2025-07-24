import Container from "../components/common/Container";
import CompletionRatio from "../sections/quizes/practice-quiz/stats-section/result-stats/CompletionRatio";
import QuestionwiseResult from "../sections/quizes/practice-quiz/stats-section/result-stats/QuestionwiseResult";
import ResultAnalysis from "../sections/quizes/practice-quiz/stats-section/result-stats/ResultAnalysis";
import ResultStats from "../sections/quizes/practice-quiz/stats-section/result-stats/ResultStats";
import Button from "../components/common/Button";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/common/Loader";
import { MdHome } from "react-icons/md";
import useGetQuizResult from "../hooks/quiz/useGetQuizResult";
import { practiceQuizLoaderText } from "../constants/loaderText";
import { useEffect } from "react";
import { resetQuestionNavigator } from "../redux/slices/practice-quiz/questionNavigator";
import { useDispatch } from "react-redux";

const PracticeResult = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const { loader } = useGetQuizResult({ canRequest: true });

  useEffect(() => {
    dispatch(resetQuestionNavigator());
  }, []);

  return (
    <div className="w-full h-auto flex justify-center py-10">
      {loader ? (
        <div className="h-[90vh]">
          <Loader fullHeight={true} loadingTexts={practiceQuizLoaderText} />
        </div>
      ) : (
        <Container className="h-auto flex flex-col justify-center space-y-6 ">
          <ResultStats />
          <CompletionRatio />
          <ResultAnalysis />
          <QuestionwiseResult />
          <div className="w-full flex justify-center items-center">
            <Button
              color="primary"
              className="mt-4 p-2 justify-center"
              endIcon={<MdHome />}
              onClick={() =>
                navigate(
                  `/practice-quiz/${params?.combination}/${params?.phone}`
                )
              }
            >
              Back to Home
            </Button>
          </div>
        </Container>
      )}
    </div>
  );
};

export default PracticeResult;
