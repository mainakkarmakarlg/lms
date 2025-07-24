import updatingImg from "/practise-quiz/updating.jpg";

const EmptySubject = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
      <img
        src={updatingImg}
        alt="Updating Quiz"
        className="w-full sm:w-1/2 md:w-2/3  mb-6"
      />
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-custom-black">
        Please Wait, We Are Updating Your Practice Quiz!
      </h1>
      <p className="text-xs sm:text-sm md:text-base text-custom-black max-w-2xl mt-3">
        Thank you for your patience! We are currently updating and enhancing the
        practice quiz questions to provide you with the best learning
        experience. Stay tuned as we work on bringing new content your way!
      </p>
    </div>
  );
};

export default EmptySubject;
