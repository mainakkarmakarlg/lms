import EachExam from "./exams/EachExam";

const Exams = ({ items }) => {
  return (
    <div className="w-full h-fit flex flex-col gap-2">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-base font-bold text-gray-500">
          {/* {text + " (" + items?.length + ")"} */}
          Mock Exams
        </h1>
      </div>

      <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4   gap-4">
        {items?.map((quiz) => (
          <EachExam key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
};

export default Exams;
