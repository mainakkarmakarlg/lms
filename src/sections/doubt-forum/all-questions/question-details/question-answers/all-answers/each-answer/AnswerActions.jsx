import {
  RiThumbDownFill,
  RiThumbDownLine,
  RiThumbUpFill,
  RiThumbUpLine,
} from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAnswer,
  likeDislikeAnswer,
} from "../../../../../../../apiCalls/doubt-forum/answers";
import {
  deleteFromAnswers,
  disLikeAnswer,
  likeAnswer,
  setSelectedAnswer,
} from "../../../../../../../redux/slices/doubt-forum/doubtForumQuestionDetailsAnswer";
import Lists from "../../../../../../../components/common/lists/Lists";
import ListItem from "../../../../../../../components/common/lists/ListItem";
import { MdMoreVert, MdOutlineReportProblem } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Icon from "../../../../../../../components/common/Icon";
import Popover from "../../../../../../../components/common/popover/Popover";
import Modal from "../../../../../../../components/common/modal/Modal";
import Report from "../../../../../../../components/doubt-forum/popups/Report";
import { Fragment, useState } from "react";
import EditAnswer from "../../../../../../../components/doubt-forum/popups/EditAnswer";

const AnswerActions = ({ answer }) => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.user);

  const [showReportPopup, setShowReportPopup] = useState(false);
  const [showEditPopup, setOpenEditPopup] = useState(false);

  const handleCloseReportPopup = () => {
    setShowReportPopup(false);
  };

  const handleOpenReportPopup = () => {
    setShowReportPopup(true);
  };

  const handleCloseEditPopup = () => {
    setOpenEditPopup(false);
  };

  const handleOpenEditPopup = () => {
    setOpenEditPopup(true);
    dispatch(setSelectedAnswer(answer));
  };

  const onDeleteClick = async () => {
    const response = await deleteAnswer(answer?.id, accessToken);
    if (response?.status === 200 || response?.status === 201) {
      dispatch(deleteFromAnswers(answer?.id));
    }
  };

  // const counts = answer?._count;
  const likes = answer?.likeCount;
  const dislikes = answer?.dislikeCount;

  const isLiked =
    answer?.Likes?.length > 0
      ? answer?.Likes[0]?.liked
        ? true
        : false
      : false;

  const isDisliked =
    answer?.Likes?.length > 0
      ? answer?.Likes[0]?.liked
        ? false
        : true
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
    const response = await likeDislikeAnswer(
      answer?.id,
      actionType,
      accessToken
    );
    if (response?.status === 200 || response?.status === 201) {
      if (type === "like") {
        dispatch(likeAnswer(answer?.id));
      } else {
        dispatch(disLikeAnswer(answer?.id));
      }
    }
  };

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center space-x-4 text-gray-500 text-xs">
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
      </div>

      <div>
        <Popover
          position="left"
          displayComponent={
            <Icon hoverClass={"hover:bg-gray-200"}>
              <MdMoreVert />
            </Icon>
          }
        >
          <MoreAction
            handleOpenReportPopup={handleOpenReportPopup}
            handleOpenEditPopup={handleOpenEditPopup}
            answer={answer}
            handleDeleteClick={onDeleteClick}
          />
        </Popover>
      </div>

      <Modal
        height={"auto"}
        width={"auto"}
        open={showReportPopup}
        handleClose={handleCloseReportPopup}
      >
        <Report
          type={"answer"}
          answer={answer}
          onClose={handleCloseReportPopup}
        />
      </Modal>
      <Modal
        height={"auto"}
        width={"auto"}
        open={showEditPopup}
        handleClose={handleCloseEditPopup}
      >
        <EditAnswer onClose={handleCloseEditPopup} />
      </Modal>
    </div>
  );
};

export default AnswerActions;

const MoreAction = ({
  handleOpenReportPopup,
  handleOpenEditPopup,
  handleDeleteClick,
  answer,
}) => {
  const { user } = useSelector((state) => state.user);
  const onReportClick = () => {
    handleOpenReportPopup();
  };

  const onEditClick = () => {
    handleOpenEditPopup();
  };

  const onDelete = () => {
    handleDeleteClick();
  };

  const actionsArr = [
    {
      title: "Report",
      isVisible: user?.id === answer?.User?.id ? false : true,
      clickFunction: onReportClick,
      icon: <MdOutlineReportProblem />,
    },
    {
      isVisible: user?.id === answer?.User?.id ? true : false,
      title: "Edit",
      clickFunction: onEditClick,
      icon: <FiEdit2 />,
    },
    {
      isVisible: user?.id === answer?.User?.id ? true : false,
      title: "Delete",
      clickFunction: onDelete,
      icon: <AiOutlineDelete />,
      className: "text-red-500",
    },
  ];
  return (
    <Lists>
      {actionsArr?.map((action) => (
        <Fragment key={action?.title}>
          {action?.isVisible && (
            <ListItem
              type={"simple"}
              startIcon={action.icon}
              onClick={action.clickFunction}
              className={action?.className}
            >
              {action?.title}
            </ListItem>
          )}
        </Fragment>
      ))}
    </Lists>
  );
};
