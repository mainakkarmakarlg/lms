import { useEffect, useRef, useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import QuizCustomization from "../../../../sections/quizes/practice-quiz/QuizCustomization";
import Home from "../../../../sections/quizes/practice-quiz/quiz-customization/Home";
import QuizInstructions from "../../../../sections/quizes/practice-quiz/quiz-customization/QuizInstructions";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSocket } from "../../../../utils/socket";
import getSelectedQuestionsTypes from "../../../../utils/quizes/practice-quiz/getSelectedQuestionsType";
import { getSelectedSubjectId } from "../../../../utils/quizes/practice-quiz/getSelectedSubjectsId";
import { setResult } from "../../../../redux/slices/practice-quiz/result";
import {
  clearQuestionState,
  setQuestions,
} from "../../../../redux/slices/practice-quiz/questions";
import {
  clearQuizState,
  setHasSubmitted,
} from "../../../../redux/slices/practice-quiz/practiceQuiz";
import {
  resetQuestionNavigator,
  setFilteredQuestions,
} from "../../../../redux/slices/practice-quiz/questionNavigator";
import { setFlaggedQuestions } from "../../../../redux/slices/practice-quiz/questionNavigator";
import { setReportedQuestions } from "../../../../redux/slices/practice-quiz/reportQuestion";
import { setTimeTaken } from "../../../../redux/slices/practice-quiz/timer";
import { MdArrowForward } from "react-icons/md";
import Button from "../../../common/Button";
import EmptySubject from "../../../../sections/quizes/practice-quiz/EmptySubject";
import {
  resetCustomizeOptions,
  setCustomInputValue,
} from "../../../../redux/slices/practice-quiz/customizeOptions";
import combineChildAndParentQuestions from "../../../../utils/quizes/practice-quiz/combineChildAndParentQuestions";
import Tooltip from "../../../common/Tooltip";

const tabs = [
  { id: "my-feed", label: "My Feed" },
  { id: "customization", label: "Customization" },
  { id: "guidelines", label: "Guidelines" },
];

const CreateQuizContainer = () => {
  const [activeTab, setActiveTab] = useState();
  const [prevTabIndex, setPrevTabIndex] = useState(0);
  const [underlineStyle, setUnderlineStyle] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = getSocket();
  const params = useParams();
  const { course } = useSelector((state) => state.course);
  const {
    selectedQuestionCount,
    selectedQuestionsTypes,
    customCount,
    customInputValue,
    errorForValidCombination,
  } = useSelector((state) => state.customizeOptions);
  const { subjects } = useSelector((state) => state.quizSubjects);
  const { accessToken } = useSelector((state) => state.user);

  console.log("subject--", subjects);

  const tabsRef = useRef([]);

  useEffect(() => {
    const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
    // console.log(activeIndex,"activeIndex");
    if (tabsRef.current[activeIndex]) {
      const tabElement = tabsRef.current[activeIndex];

      setUnderlineStyle({
        width: `${tabElement.offsetWidth}px`,
        left: `${tabElement.offsetLeft + tabElement.offsetWidth / 2}px`,
        transform: `translateX(-50%)`,
      });
    } else {
      setActiveTab("my-feed");
    }
  }, [activeTab]);
  // console.log(underlineStyle, "underlineStyle");

  // Handle tab change with animation
  const handleTabChange = (tabId) => {
    const newTabIndex = tabs.findIndex((tab) => tab.id === tabId);
    if (newTabIndex !== prevTabIndex) {
      setAnimationDirection(newTabIndex > prevTabIndex ? "right" : "left");
      setIsAnimating(true);
      setTimeout(() => {
        setPrevTabIndex(newTabIndex);
        setActiveTab(tabId);
        setIsAnimating(false);
      }, 190); // Duration of animation
    }
  };

  const handlePrevTab = () => {
    const prevTabIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const newTabIndex = prevTabIndex - 1;
    handleTabChange(tabs[newTabIndex].id);
  };

  const handleNextTab = () => {
    const prevTabIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const newTabIndex = prevTabIndex + 1;
    handleTabChange(tabs[newTabIndex].id);
  };

  console.log("selectedQuestionCount", selectedQuestionCount);
  console.log("customInputValue", customInputValue);
  const handleStartQuiz = async () => {
    socket?.emit("make-practice-attempt", {
      questionCount:
        Number(customInputValue) ||
        Number(customCount) ||
        Number(selectedQuestionCount),
      difficulty: "easy",
      isFlagged: getSelectedQuestionsTypes("flagged", selectedQuestionsTypes),
      isIncorrect: getSelectedQuestionsTypes(
        "incorrect",
        selectedQuestionsTypes
      ),
      otherSubject: getSelectedQuestionsTypes("other", selectedQuestionsTypes),
      isUnattempted: getSelectedQuestionsTypes(
        "unattempted",
        selectedQuestionsTypes
      ),
      subjectIds: getSelectedSubjectId(subjects),
      courseId: course?.course?.id,
    });
    socket?.on("make-practice-attempt-success", async (data) => {
      dispatch(setCustomInputValue(""));
      dispatch(setResult(null));
      dispatch(clearQuestionState());
      dispatch(clearQuizState());
      dispatch(resetQuestionNavigator());

      // const flagged = [];
      // const reported = [];
      // for (let i = 0; i < data?.Answer?.length; i++) {
      //   const question = data?.Answer[i];
      //   let parentQuestion = null;

      //   if (question?.Question?.questionId) {
      //     try {
      //       parentQuestion = await getParentQuestion(
      //         question?.Question?.id,
      //         accessToken
      //       );
      //       console.log("parentQuestion", parentQuestion);
      //       console.log("child", question);
      //       // You can do something with parentQuestion if needed
      //     } catch (err) {
      //       console.error("Error fetching parent question:", err);
      //     }
      //   }
      //   if (question?.Question?.UserFlag?.length > 0) {
      //     flagged.push({
      //       questionId: question?.Question?.id,
      //       text: question?.Question?.UserFlag[0]?.flagText,
      //     });
      //   }

      //   if (question?.Question?.Report?.length > 0) {
      //     reported.push(question?.Question?.id);
      //   }
      // }

      const { mergedAnswers, flagged, reported } =
        await combineChildAndParentQuestions(
          accessToken,
          [...data.Answer],
          socket
        );

      dispatch(setFlaggedQuestions(flagged));
      dispatch(setReportedQuestions(reported));

      dispatch(setQuestions(mergedAnswers));
      dispatch(setFilteredQuestions(mergedAnswers));
      dispatch(setHasSubmitted(data?.hasSubmitted));
      dispatch(setTimeTaken(data?.timeTaken || 0));
      dispatch(resetCustomizeOptions());
      navigate(
        `/practice-quiz/${data?.id}/${params?.combination}/${params?.phone}`
      );
    });

    socket?.on("make-practice-attempt-error", () => {
      navigate(`/error/${params?.combination}/${params?.phone}`);
    });
  };

  useEffect(() => {
    const socket = getSocket();
    return () => {
      socket?.off("make-practice-attempt-success");
      socket?.off("make-practice-attempt-error");
    };
  }, []);

  return (
    <div className="w-full   h-full  flex flex-col space-y-3 p-1 md:p-4 lg:p-6 bg-white rounded-lg shadow-subject ">
      {subjects?.length > 0 ? (
        <>
          <h2 className="text-xl xl:text-2xl font-semibold text-custom-black">
            Build Your Quiz
          </h2>

          {/* Tab Navigation */}

          <div className="w-full h-fit flex items-center justify-between">
            <div className="relative h-[60px] flex items-center px-1 w-full max-w-full overflow-x-scroll overflow-y-hidden">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  ref={(el) => (tabsRef.current[index] = el)}
                  id={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative py-2 px-2 lg:px-6 text-sm font-medium transition bg-inherit outline-none ${
                    activeTab === tab.id
                      ? "text-dark-blue font-semibold"
                      : "text-gray-400"
                  }`}
                >
                  <span className="flex items-center text-xs md:text-sm lg:text-xs xl:text-base whitespace-nowrap">
                    <span
                      className={`hidden md:flex mr-2 h-5 w-5 p-3  items-center justify-center  rounded-full text-xs ${
                        activeTab === tab.id
                          ? "bg-dark-blue text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {index + 1}
                    </span>
                    {tab.label}
                    <FaChevronRight className="ml-1" size={12} />
                  </span>
                </button>
              ))}
              {/* Sliding Underline */}
              <div
                className="absolute bottom-2 mt-1 h-[2px] bg-dark-blue transition-all duration-300 ease-in-out"
                style={underlineStyle}
              />
            </div>
          </div>

          {/* Tab Content */}
          <div className="h-[calc(100%-100px)] w-full overflow-hidden flex   justify-between relative">
            <div
              className={` h-full w-full transition-transform duration-300  pb-10 ease-in-out ${
                isAnimating
                  ? animationDirection === "right"
                    ? "translate-x-full opacity-0"
                    : "-translate-x-full opacity-0"
                  : "translate-x-0 opacity-100"
              }`}
            >
              {activeTab === "my-feed" && <Home />}
              {activeTab === "customization" && <QuizCustomization />}
              {activeTab === "guidelines" && <QuizInstructions />}
            </div>
            <div className=" w-full h-[40px] absolute bottom-0 z-10  flex items-center justify-center   rounded-full">
              <div className="w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%]  flex justify-center items-center z-50 h-full bg-gray-200 rounded-full  relative ">
                <div
                  onClick={handlePrevTab}
                  className={`w-[30px] h-[30px] bg-gray-300 flex items-center cursor-pointer justify-center border rounded-full z-10 absolute left-2 
                ${activeTab !== "my-feed" ? "translate-y-0 opacity-100" : "translate-y-40 opacity-0"} duration-300 ease-in-out`}
                >
                  <button className="flex items-center space-x-2 text-sm font-semibold text-custom-black">
                    <FaArrowLeft size={16} />
                  </button>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 pb-3">
                  {/* {activeTab === "guidelines" && ( */}
                  <Tooltip
                    position="top"
                    description={errorForValidCombination || ""}
                  >
                    <Button
                      fullWidth={false}
                      endIcon={<MdArrowForward />}
                      disabled={
                        selectedQuestionCount === 0 ||
                        errorForValidCombination !== ""
                      }
                      size="medium"
                      className={` self-center mt-3 z-10 py-1 px-2 text-xs md:text-sm duration-300 ease-in-out ${activeTab === "guidelines" ? "translate-y-0 opacity-100 bg-custom-red hover:bg-custom-red/60 text-white" : "translate-y-40 opacity-0 bg-gray-300 text-gray-400"}`}
                      color="secondary"
                      // className="mt-4 self-center bg-dark-blue text-white px-4 py-2 rounded-md"
                      onClick={handleStartQuiz}
                    >
                      Start Quiz
                    </Button>
                  </Tooltip>
                  {/* )} */}
                </div>

                <div
                  onClick={handleNextTab}
                  className={`w-[30px] h-[30px] cursor-pointer bg-gray-300 flex items-center justify-center border rounded-full z-10 absolute right-2 
                ${activeTab === "guidelines" ? "translate-y-40 opacity-0" : "translate-y-0 opacity-100"} duration-300 ease-in-out`}
                >
                  <button className="flex items-center space-x-2 text-sm font-semibold text-custom-black">
                    <FaArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <EmptySubject />
      )}
    </div>
  );
};

export default CreateQuizContainer;
