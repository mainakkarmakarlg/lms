const QuizNotFound = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-5">
      <div className="w-[90%] md:w-[60%] lg:w-[30%] flex flex-col items-center justify-center">
        <img src="/mock-quiz/quiz-not-found.png" alt="No exam exists" />
      </div>

      <div className="flex flex-col space-y-3 items-center justify-center text-center px-2">
        <h2 className="text-xl text-[#8a8a8a] font-semibold">
          No Mock Tests Available Yet
        </h2>
        <p className="text-[#c7c7c7]">
          We&apos;re still preparing mock tests for this topic. They&apos;ll be
          available shortly!
        </p>
      </div>
    </div>
  );
};

export default QuizNotFound;
