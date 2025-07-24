import { BsEye, BsEyeFill } from "react-icons/bs";
import {
  RiThumbDownFill,
  RiThumbDownLine,
  RiThumbUpFill,
  RiThumbUpLine,
} from "react-icons/ri";
import { TbMessageCircle, TbMessageCircleFilled } from "react-icons/tb";

const ActionButtons = ({ question }) => {
  const counts = question?._count;
  const likes = question?.likeCount || 0;
  const dislikes = question?.dislikeCount || 0;

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

  const isAnsweredByYou = question?.Answers?.length > 0 ? true : false;

  const isViewed = question?.Views?.length > 0 ? true : false;

  return (
    <div className="flex items-center space-x-4 text-gray-500 text-xs">
      <div className="flex items-center space-x-1">
        {isLiked ? (
          <RiThumbUpFill className="text-primary" />
        ) : (
          <RiThumbUpLine />
        )}
        <span>{likes}</span>
      </div>

      <div className="flex items-center space-x-1">
        {isDisliked ? (
          <RiThumbDownFill className="text-primary" />
        ) : (
          <RiThumbDownLine />
        )}
        <span>{dislikes}</span>
      </div>

      <div className="flex items-center space-x-1">
        {isAnsweredByYou ? (
          <TbMessageCircleFilled className="text-primary" />
        ) : (
          <TbMessageCircle />
        )}
        <span>{counts?.Answers}</span>
      </div>

      <div className="flex items-center space-x-1">
        {isViewed ? <BsEyeFill className="text-primary" /> : <BsEye />}
        <span>{counts?.Views}</span>
      </div>
    </div>
  );
};

export default ActionButtons;
