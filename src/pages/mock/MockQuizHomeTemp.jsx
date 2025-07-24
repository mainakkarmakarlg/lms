import useGetData from "../../hooks/useGetData";
import { MdTimer } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import Button from "../../components/common/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMockQuizes } from "../../redux/slices/mock-quiz/mockQuiz";
import filterQuizTypewise from "../../utils/mock-quiz/filterQuizTypewise";
import { formatDuration } from "../../utils/common/formatDuration";
// import bannerImage from "./lannding_page_illstration.png";

const MockQuizHomeTemp = () => {
  const { data } = useGetData("/quiz");

  function enrichParentMock(mockData) {
    return mockData.map((mock) => {
      let totalDuration = 0;
      let totalQuestions = 0;
      let latestAttempt = null;

      mock.Quizzes.forEach((quiz) => {
        // Add duration (handle null)
        if (quiz.duration) {
          totalDuration += Number(quiz.duration);
        }

        // Add up questions count from _count.Questions
        totalQuestions += quiz._count?.Questions || 0;

        // Find latest attempt from Attempts array
        quiz.Attempts?.forEach((attempt) => {
          const attemptDate = new Date(attempt.updatedAt);
          if (
            !latestAttempt ||
            attemptDate > new Date(latestAttempt.updatedAt)
          ) {
            latestAttempt = attempt;
          }
        });
      });

      return {
        ...mock,
        duration: totalDuration,
        _count: {
          Questions: totalQuestions,
        },
        latestAttempt: latestAttempt || null,
      };
    });
  }
  const filteredData = data && enrichParentMock(data);

  return (
    <div className="w-full h-full ">
      {/* <div className="w-full h-[300px] "> */}
      <Banner />
      {/* </div> */}
      {filteredData && filteredData.length > 0 && (
        <div className="w-full h-[calc(100vh-250px)] flex items-center justify-center ">
          <div className="w-[80%] h-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 py-10 ">
            {filteredData?.map((item) => (
              <EachCart key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MockQuizHomeTemp;

const Banner = () => {
  return (
    <div
      className="w-full h-[250px] bg-cover bg-center flex items-center text-white px-6"
      style={{
        backgroundImage: `url("/lms-banner.png")`,
        backgroundColor: "#D6C4BA", // fallback color if image fails
      }}
    >
      <div className="w-full">
        <p className="text-sm uppercase mb-2">MOCK QUIZ</p>
        <h1 className="text-3xl font-bold leading-tight mb-2">
          One app for all your learning...
        </h1>
        <p className="text-base">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the...
        </p>
      </div>
      {/* <div className="w-1/3 h-full">
        <img
          src="/lms-banner.png"
          alt="Landing Illustration"
          className="w-full h-full object-cover"
        />
      </div> */}
    </div>
  );
};

const EachCart = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const calculateProgress = (quizs) => {
    let percentage = 0;
    let totalQuestions = 0;
    let attemptedQuestions = 0;
    quizs?.forEach((quiz) => {
      if (quiz) {
        totalQuestions += quiz?._count?.Questions;
        attemptedQuestions += quiz?.Questions?.filter(
          (item) => item?._count?.Answers > 0
        )?.length;
      }
    });
    percentage =
      totalQuestions > 0 ? (attemptedQuestions / totalQuestions) * 100 : 0;

    return { percentage, totalQuestions, attemptedQuestions };
  };

  const { percentage, totalQuestions, attemptedQuestions } = calculateProgress(
    item?.Quizzes
  );
  const daysDiffance = (createdAt) => {
    console.log("createdAt", createdAt);
    const date = new Date(createdAt);
    const today = new Date();
    const timeDiff = today.getTime() - date.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };
  const daysDif = daysDiffance(item?.latestAttempt?.createdAt);

  const handleClick = () => {
    const { combination, phone } = params;
    const filteredData = filterQuizTypewise(item?.Quizzes);
    dispatch(setMockQuizes(filteredData));
    navigate(`/mock-quiz/${item?.id}/${combination}/${phone}`);
  };
  const discription =
    "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.";
  return (
    <div className="h-fit rounded-lg border bg-white p-6 shadow-sm space-y-4">
      <h2 className="text-xl font-bold text-gray-800 ">{item?.name}</h2>

      <div className="w-full flex justify-between items-center text-sm text-gray-500 ">
        <div className="flex items-center text-xs text-gray-500 space-x-1">
          <span>
            <CiCalendarDate size={15} />
          </span>
          {item?.latestAttempt?.createdAt ? (
            <span>
              Last attempted{" "}
              {daysDif === 0
                ? "today"
                : daysDif === 1
                  ? "yesterday"
                  : `${daysDif} days ago`}
            </span>
          ) : (
            <span>Not attempted yet</span>
          )}
        </div>
        <div className="flex items-center">
          <MdTimer className="" />
          <span className="text-xs">{formatDuration(item?.duration)}</span>
        </div>
      </div>

      <p className="text-sm text-gray-400 ">
        {item?.discription || discription}
      </p>

      <div className="flex flex-col items-center space-y-1">
        <div className="w-full bg-gray-100 rounded-full h-1.5">
          <div
            className="bg-primary h-1.5 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="w-full flex justify-between text-sm font-semibold text-gray-600 ">
          <span className="text-xs">{attemptedQuestions}</span>
          <span className="text-xs">{totalQuestions}</span>
        </div>
      </div>

      {/* <div className="w-full flex justify-end"> */}
      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        View
      </Button>
      {/* </div> */}
    </div>
  );
};
