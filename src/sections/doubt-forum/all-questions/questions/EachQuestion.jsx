import Avatar from "../../../../components/common/Avatar";
import { convertToTimeAgo } from "../../../../utils/common/dateTime";
import { useDispatch, useSelector } from "react-redux";
import {
  openQuestionDetails,
  setSelectedQuestion,
} from "../../../../redux/slices/doubt-forum/doubtForumQuestionDetails";
import FallNumber from "./each-question/FallNumber";
import ActionButtons from "./each-question/ActionButtons";
import { addQuestionViewed } from "../../../../apiCalls/doubt-forum/questions";
import { TbPinFilled } from "react-icons/tb";
import { viewQuestion } from "../../../../redux/slices/doubt-forum/doubtForumQuestions";

const EachQuestion = ({ question }) => {
  const { accessToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const changeCurrentQuestion = async () => {
    const data = {
      questionId: question?.id,
      subject: question?.FallNumber?.Subject[0],
    };
    dispatch(setSelectedQuestion(data));
    dispatch(openQuestionDetails());
    if (question?.Views?.length > 0) return;

    const response = await addQuestionViewed(question?.id, accessToken);
    if (response?.status === 200 || response?.status === 201) {
      setTimeout(() => {
        dispatch(viewQuestion(question?.id));
      }, 500);
    }
  };

  const user = question?.User;
  return (
    <div
      onClick={changeCurrentQuestion}
      className="cursor-pointer h-fit w-full shadow flex flex-col space-y-3 rounded-md p-3 bg-white"
    >
      <div className="w-full flex items-center space-x-3">
        <div>
          <Avatar
            fName={user?.fname}
            lName={user?.lname}
            image={user?.profile}
            rounded={true}
            size={"small"}
            textSize={"small"}
          />
        </div>

        <div className="flex flex-col w-[calc(100%-50px)]">
          <div className="w-full flex items-center justify-between">
            <span className="text-sm">{`${user?.fname} ${user?.lname}`}</span>
            <span className="text-xs text-gray-500">
              {convertToTimeAgo(question?.createdAt)}
            </span>
          </div>
          <div className="w-full">
            <FallNumber question={question} />
          </div>
        </div>
      </div>

      <div className="text-base font-medium text-gray-600">
        <p>{question?.questionText}</p>
      </div>

      <div className="w-full flex items-center justify-between">
        <ActionButtons question={question} />

        {question?.Pinned?.length > 0 && (
          <div className="text-primary">
            <TbPinFilled />
          </div>
        )}
      </div>
    </div>
  );
};

export default EachQuestion;
