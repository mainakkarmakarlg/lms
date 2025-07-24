import { useParams } from "react-router-dom";
import Button from "../components/common/Button";
import { MdHome } from "react-icons/md";

const NoQuestions = () => {
  const params = useParams();

  const { combination, phone } = params;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-5">
      <div className="w-[90%] md:w-[60%] lg:w-[30%] flex flex-col items-center justify-center">
        <img src="/mock-quiz/updating-questions.png" alt="No exam exists" />
      </div>

      <div className="flex flex-col space-y-3 items-center justify-center text-center px-2">
        <h2 className="text-xl text-[#8a8a8a] font-semibold">
          Fresh Questions, Coming Right Up!
        </h2>
        <p className="text-[#c7c7c7]">
          We&apos;re currently updating these questions. Please check back soon
          for the latest version!
        </p>
      </div>

      <Button color="primary" variant="contained" startIcon={<MdHome />}>
        <a href={`/mock-quiz/${combination}/${phone}`}>Home</a>
      </Button>
    </div>
  );
};

export default NoQuestions;
