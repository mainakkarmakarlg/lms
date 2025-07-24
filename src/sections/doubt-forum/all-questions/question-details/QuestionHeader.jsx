import { useDispatch, useSelector } from "react-redux";
import {
  closeQuestionDetails,
  pinCurrentQuestion,
  setQuestion,
  setSelectedQuestion,
} from "../../../../redux/slices/doubt-forum/doubtForumQuestionDetails";
import { TbPin, TbPinFilled } from "react-icons/tb";
import { IoMdArrowBack } from "react-icons/io";
import {
  deleteQuestion,
  questionPin,
} from "../../../../apiCalls/doubt-forum/questions";
import { MdMoreVert, MdOutlineReportProblem } from "react-icons/md";
import Popover from "../../../../components/common/popover/Popover";
import { generateDoubtNumber } from "../../../../utils/doubt-forum/generateDoubtNumber";
import Modal from "../../../../components/common/modal/Modal";
import { Fragment, useState } from "react";
import Lists from "../../../../components/common/lists/Lists";
import ListItem from "../../../../components/common/lists/ListItem";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { BiCopy } from "react-icons/bi";
import Icon from "../../../../components/common/Icon";
import Report from "../../../../components/doubt-forum/popups/Report";
import toast from "react-hot-toast";
import { setSelectedQuestionAnswers } from "../../../../redux/slices/doubt-forum/doubtForumQuestionDetailsAnswer";
import EditDoubt from "../../../../components/doubt-forum/popups/EditDoubt";
import { setQuestionToEdit } from "../../../../redux/slices/doubt-forum/doubtforumEditDoubt";
import { deleteFromAllQuestions } from "../../../../redux/slices/doubt-forum/doubtForumQuestions";

const QuestionHeader = () => {
  const { question } = useSelector((state) => state.doubtForumQuestionDetails);
  const { accessToken } = useSelector((state) => state.user);

  const [showReportPopup, setShowReportPopup] = useState(false);
  const [showEditPopup, setOpenEditPopup] = useState(false);

  const isPinned = question?.Pinned?.length > 0 ? true : false;

  const dispatch = useDispatch();

  const closeReportPopup = () => {
    setShowReportPopup(false);
  };

  const closeEditPopup = () => {
    setOpenEditPopup(false);
  };

  const hideQuestionDetails = () => {
    dispatch(closeQuestionDetails());
    setTimeout(() => {
      dispatch(setQuestion(null));
      dispatch(setSelectedQuestion(null));
      dispatch(setSelectedQuestionAnswers([]));
    }, 500);
  };

  const pinQuestion = async () => {
    const response = await questionPin(question?.id, accessToken);
    if (response?.status === 200 || response?.status === 201) {
      dispatch(pinCurrentQuestion());
    }
  };

  return (
    <div className="w-full h-[40px] flex items-center justify-between ">
      <div onClick={hideQuestionDetails} className=" text-gray-500 ">
        <IoMdArrowBack className="text-2xl cursor-pointer" />
      </div>

      <div className="flex  items-center space-x-2 text-gray-500">
        <div onClick={pinQuestion} className="text-2xl">
          {isPinned ? (
            <TbPinFilled className="cursor-pointer text-primary" />
          ) : (
            <TbPin className="cursor-pointer" />
          )}
        </div>

        <div>
          <Popover
            leftPosition={80}
            displayComponent={
              <Icon hoverClass={"hover:bg-gray-200"}>
                <MdMoreVert className="text-xl" />
              </Icon>
            }
          >
            <MoreActions
              question={question}
              setReportPopup={setShowReportPopup}
              setOpenEditPopup={setOpenEditPopup}
            />
          </Popover>
        </div>
      </div>
      <Modal
        open={showReportPopup}
        handleClose={closeReportPopup}
        height="auto"
        className={"flex items-center justify-center"}
      >
        <Report
          question={question}
          type="question"
          onClose={closeReportPopup}
        />
      </Modal>

      <Modal
        open={showEditPopup}
        handleClose={closeEditPopup}
        width="auto"
        height="auto"
        className={"flex items-center justify-center"}
      >
        <EditDoubt onClose={closeEditPopup} />
      </Modal>
    </div>
  );
};

export default QuestionHeader;

const MoreActions = ({ question, setReportPopup, setOpenEditPopup }) => {
  const { course } = useSelector((state) => state.course);
  const { user, accessToken } = useSelector((state) => state.user);
  const { allSubjects, allTopics, allPoints } = useSelector(
    (state) => state.doubtForumSubjects
  );

  const dispatch = useDispatch();

  const onReportClick = async () => {
    setReportPopup(true);
  };

  const onCopyClick = () => {
    const doubtNumber = generateDoubtNumber(course.course, question);
    navigator.clipboard.writeText(doubtNumber);
    toast.success("Doubt number copied");
  };

  const onEditClick = () => {
    setOpenEditPopup(true);
    dispatch(
      setQuestionToEdit({ question, allSubjects, allTopics, allPoints })
    );
  };

  const onDeleteClick = async () => {
    const response = await deleteQuestion(question?.id, accessToken);
    if (response?.status === 200 || response?.status === 201) {
      dispatch(setQuestion(null));
      dispatch(setSelectedQuestion(null));
      dispatch(closeQuestionDetails());
      dispatch(deleteFromAllQuestions(question?.id));
      toast.success("Question deleted successfully");
    }
  };

  const actionsArr = [
    {
      isVisible: user?.id === question?.User?.id ? false : true,
      title: "Report",
      clickFunction: onReportClick,
      icon: <MdOutlineReportProblem />,
    },
    {
      isVisible: true,
      title: "Doubt number",
      clickFunction: onCopyClick,
      icon: <BiCopy />,
    },
    {
      title: "Edit",
      isVisible: user?.id === question?.User?.id ? true : false,
      clickFunction: onEditClick,
      icon: <FiEdit2 />,
    },
    {
      title: "Delete",
      isVisible: user?.id === question?.User?.id ? true : false,
      clickFunction: onDeleteClick,
      icon: <AiOutlineDelete />,
      className: "text-red-500",
    },
  ];

  return (
    <div className="w-fit">
      <Lists>
        {actionsArr?.map((action) => (
          <Fragment key={action?.title}>
            {action?.isVisible && (
              <ListItem
                type={"simple"}
                startIcon={action?.icon}
                onClick={action?.clickFunction}
                className={`${action?.className} text-sm`}
              >
                {action?.title}
              </ListItem>
            )}
          </Fragment>
        ))}
      </Lists>
    </div>
  );
};
