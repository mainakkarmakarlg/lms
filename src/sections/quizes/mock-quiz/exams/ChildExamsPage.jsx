import { BiArrowBack } from "react-icons/bi";
import useGetData from "../../../../hooks/useGetData";
import EachExam from "./EachExam";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getSocket } from "../../../../utils/socket";

const ChildExamsPage = () => {
  const params = useParams();

  const { data } = useGetData(`/quiz?quizId=${params?.courseId}`);

  useEffect(() => {
    const socket = getSocket();
    socket?.emit("pause-quiz-attempt");
    socket?.on("pause-quiz-attempt-success", () => {
      console.log("pause-quiz-attempt-success");
    });
  }, []);

  return (
    <div className="w-full h-fit flex flex-col space-y-6 items-center">
      <Banner />
      <div className="w-[95%] xl:w-[90%] 2xl:[80%] flex flex-col justify-center items-center space-y-6">
        {/* <h2>Exams for {parentQuiz?.name}</h2> */}
        {/* i want a breadcrumb which in work as a back button */}
        <Breadcrumb quizName={data?.[0]?.name} />

        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {data?.[0]?.Quizzes?.map((child) => (
            <EachExam key={child.id} quiz={child} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChildExamsPage;

const Banner = () => {
  return (
    <div
      className="w-full h-[250px] bg-cover bg-center flex justify-center items-center text-white "
      style={{
        backgroundImage: `url("/lms-banner.png"), linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`,
        // objectFit: "contain",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "#D6C4BA", // fallback color if image fails
      }}
    >
      <div className="w-[95%] xl:w-[90%] 2xl:[80%] h-full flex flex-col justify-center items-center">
        <div className="w-full">
          <h1 className="text-3xl font-bold leading-tight mb-2">
            Simulate Real Exam Experience{" "}
          </h1>
          <p className="text-sm w-[50%] ">
            Take full-length mock exams designed to mirror the actual test
            environment. Track your performance, manage your time, and build
            confidence to ace the real exam with ease.
          </p>
        </div>
      </div>
    </div>
  );
};

const Breadcrumb = (quizName) => {
  console.log("parentQuiz", quizName);
  const navigate = useNavigate();
  const params = useParams();
  const { combination, phone } = params;
  return (
    <div className="w-full h-fit flex   items-center">
      <span
        className="mr-[5px] flex items-center text-primary cursor-pointer"
        onClick={() => navigate(`/mock-quiz/${combination}/${phone}`)}
      >
        <BiArrowBack className="mr-[5px]" />
        Mock Quiz{" "}
      </span>{" "}
      /<span className="ml-[5px] ">{quizName?.quizName}</span>
    </div>
  );
};
