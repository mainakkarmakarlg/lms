import Button from "../components/common/Button";
import errorPng from "/practise-quiz/500Error.png";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdHome } from "react-icons/io";

const Error = () => {
  const navigate = useNavigate();
  const params = useParams();

  const handleGoBack = () => {
    if (params?.phone) {
      navigate(`/practice-quiz/${params?.combination}/${params?.phone}`);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-center p-6">
      <img
        src={errorPng}
        alt="500 Error"
        className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 mb-6"
      />
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700">
        Oops! Something went wrong.
      </h1>
      <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-xl mt-3">
        We&apos;re experiencing an internal server error. Please try again later
        or go back to the home page.
      </p>
      <Button
        endIcon={<IoMdHome />}
        onClick={handleGoBack}
        variant="contained"
        color="primary"
        className="mt-5 "
      >
        Back to Home
      </Button>
    </div>
  );
};

export default Error;
