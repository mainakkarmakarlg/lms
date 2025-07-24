import { BsEye, BsEyeFill } from "react-icons/bs";
import {
  RiThumbDownFill,
  RiThumbDownLine,
  RiThumbUpFill,
  RiThumbUpLine,
} from "react-icons/ri";
import { likeDislikeQuestion } from "../../../../../apiCalls/doubt-forum/questions";
import { useDispatch, useSelector } from "react-redux";
import {
  dislikeCurrentQuestion,
  likeCurrentQuestion,
} from "../../../../../redux/slices/doubt-forum/doubtForumQuestionDetails";
import { likeDisLikeQuestionFromQuestions } from "../../../../../redux/slices/doubt-forum/doubtForumQuestions";
import { TbMessageCircle, TbMessageCircleFilled } from "react-icons/tb";

const QuestionActionButtons = ({ question }) => {
  const { accessToken, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const counts = question?._count;
  const likes = question?.likeCount;
  const dislikes = question?.dislikeCount;

  const isLiked =
    question?.Likes?.length > 0
      ? question?.Likes[0]?.liked
        ? true
        : false
      : false;

  const isDisliked =
    question?.Likes?.length > 0
      ? question?.Likes[0]?.liked
        ? false
        : true
      : false;

  const isViewed = question?.Views?.length > 0 ? true : false;
  const isAnsweredByYou =
    question?.Answers?.filter((answer) => answer?.User?.id === user?.id)
      ?.length > 0
      ? true
      : false;

  const handleLike = async (type) => {
    let actionType;
    if (type === "like" && isLiked) {
      actionType = "";
    } else if (type === "dislike" && isDisliked) {
      actionType = "";
    } else {
      actionType = type;
    }
    const response = await likeDislikeQuestion(
      question?.id,
      actionType,
      accessToken
    );
    if (response?.status === 200 || response?.status === 201) {
      if (type === "like") {
        dispatch(likeCurrentQuestion());
        dispatch(
          likeDisLikeQuestionFromQuestions({
            questionId: question?.id,
            type: "like",
          })
        );
      } else {
        dispatch(dislikeCurrentQuestion());
        dispatch(
          likeDisLikeQuestionFromQuestions({
            questionId: question?.id,
            type: "dislike",
          })
        );
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center space-x-4 text-gray-500 text-sm">
        <div
          onClick={() => handleLike("like")}
          className="flex items-center space-x-1 cursor-pointer"
        >
          {isLiked ? (
            <RiThumbUpFill className="text-primary" />
          ) : (
            <RiThumbUpLine />
          )}
          <span>{likes}</span>
        </div>

        <div
          onClick={() => handleLike("dislike")}
          className="flex items-center space-x-1 cursor-pointer"
        >
          {isDisliked ? (
            <RiThumbDownFill className="text-primary" />
          ) : (
            <RiThumbDownLine />
          )}
          <span>{dislikes}</span>
        </div>

        <div className="flex items-center space-x-1 cursor-pointer">
          {isAnsweredByYou ? (
            <TbMessageCircleFilled className="text-primary" />
          ) : (
            <TbMessageCircle />
          )}
          <span>{counts?.Answers}</span>
        </div>

        <div className="flex items-center space-x-1 cursor-pointer">
          {isViewed ? <BsEyeFill className="text-primary" /> : <BsEye />}
          <span>{counts?.Views}</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionActionButtons;
