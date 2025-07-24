import { useSelector } from "react-redux";
import Avatar from "../../../../../components/common/Avatar";
import { convertToTimeAgo } from "../../../../../utils/common/dateTime";
import { getCourseAbbr } from "../../../../../utils/doubt-forum/generateDoubtNumber";

const QuestionAuthor = ({ question }) => {
  const user = question?.User;
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div>
          <Avatar
            size={"small"}
            fName={user?.fname}
            lName={user?.lname}
            image={user?.profile}
            rounded={true}
            textSize={"small"}
            backgroundColor={"primary"}
          />
        </div>
        <div className="w-full flex flex-col ">
          <span className="text-sm">{`${user?.fname} ${user?.lname}`}</span>
          <span className="text-xs text-gray-500">
            {convertToTimeAgo(question?.createdAt)}
          </span>
        </div>
      </div>
      <QuestionCourse question={question} />
    </div>
  );
};

export default QuestionAuthor;

const QuestionCourse = () => {
  const { course } = useSelector((state) => state.course);
  const courseAbbr = getCourseAbbr(course?.course, "");
  return (
    <div className="flex items-center space-x-2 select-text text-gray-400 text-sm font-semibold">
      <span className="text-sm">{courseAbbr}</span>
    </div>
  );
};
