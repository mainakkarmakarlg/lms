import { useEffect } from "react";
import { HiMiniShieldExclamation } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/common/Button";
import Container from "../components/common/Container";
import PopupWrapper from "../components/common/PopupWraper";
import useGetData from "../hooks/useGetData";
import { resetNavigator } from "../redux/slices/mock-quiz/mockQuestionNavigator";
import { resetAll } from "../redux/slices/mock-quiz/mockQuestions";
import {
  setDefaultQuizes,
  setMockQuizes,
  setShowDisclaimer,
} from "../redux/slices/mock-quiz/mockQuiz";
import Exams from "../sections/quizes/mock-quiz/Exams";
import DisclaimerPopup from "../sections/quizes/mock-quiz/popups/DIsclaimerPopup";
import Stats from "../sections/quizes/mock-quiz/Stats";
import { getSocket } from "../utils/socket";
import filterQuizTypewise from "../utils/mock-quiz/filterQuizTypewise";
import QuizNotFound from "./QuizNotFound";
import Loader from "../components/common/Loader";
import { mockQuizLoaderText } from "../constants/loaderText";

const MockQuizHome = () => {
  const { quizes, showDisclaimer } = useSelector((state) => state.mockQuizes);
  const dispatch = useDispatch();
  const { data, loading, error } = useGetData("/quiz");

  const togglePopup = () => {
    dispatch(setShowDisclaimer(!showDisclaimer));
  };

  console.log("quizes", quizes);

  useEffect(() => {
    if (data && !loading && !error) {
      const filterData = filterQuizTypewise(data);
      dispatch(setMockQuizes(filterData));
      dispatch(setDefaultQuizes(data));
      dispatch(resetAll());
      dispatch(resetNavigator());
    }
  }, [data, loading, error, dispatch]);

  useEffect(() => {
    const socket = getSocket();
    socket?.emit("pause-quiz-attempt");
    dispatch(resetAll());
    socket?.once("pause-quiz-attempt-success");
  }, [dispatch]);

  return (
    <div className="w-full h-full">
      {loading ? (
        <Loader loadingTexts={mockQuizLoaderText} fullHeight={true} />
      ) : quizes?.length > 0 ? (
        <Container className="flex justify-center justify-self-center ">
          <div className="w-full flex flex-col space-y-12">
            <Stats />
            <div className="relative w-full flex flex-col space-y-5 pb-10  md:py-12">
              {quizes?.length > 0 &&
                quizes?.map((item) => (
                  <Exams
                    key={item.type}
                    text={item.type}
                    items={item?.quizArray}
                  />
                ))}
            </div>
          </div>
          <div className="fixed bottom-3 right-3">
            <Button
              variant="contained"
              size="small"
              rounded={true}
              className={
                "animate-bounce w-[50px] h-[50px] bg-yellow-500 hover:bg-yellow-400"
              }
              onClick={togglePopup}
            >
              <HiMiniShieldExclamation />
            </Button>
            {showDisclaimer && (
              <PopupWrapper
                contentWidth="md:w-[700px] w-[90%]"
                direction="bottom"
                onClose={togglePopup}
              >
                <DisclaimerPopup />
              </PopupWrapper>
            )}
          </div>
        </Container>
      ) : (
        <QuizNotFound />
      )}
    </div>
  );
};

export default MockQuizHome;
