import { useSelector } from "react-redux";
import EachAnswer from "./all-answers/EachAnswer";
import NoItems from "../../../../../components/common/NoItems";

const AllAnswers = () => {
  const { answers } = useSelector(
    (state) => state.doubtForumQuestionDetailsAnswer
  );

  if (!answers) return null;

  return (
    <div className="flex flex-col space-y-3 w-full">
      {answers?.length === 0 ? (
        <NoItems className="w-full h-[200px]" text="Be the first to answer" />
      ) : (
        answers?.map((answer) => (
          <EachAnswer answer={answer} key={answer?.id} />
        ))
      )}
    </div>
  );
};

export default AllAnswers;
