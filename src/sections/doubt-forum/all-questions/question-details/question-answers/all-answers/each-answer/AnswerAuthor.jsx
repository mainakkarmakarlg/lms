import Avatar from "../../../../../../../components/common/Avatar";
import { convertToTimeAgo } from "../../../../../../../utils/common/dateTime";

const AnswerAuthor = ({ answer }) => {
  const user = answer?.User;
  return (
    <div className="w-full flex items-center space-x-3">
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
      </div>

      <div>
        <span className="text-xs text-gray-500 whitespace-nowrap  ">
          {convertToTimeAgo(answer?.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default AnswerAuthor;
