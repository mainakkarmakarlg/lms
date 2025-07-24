import { MdAdd } from "react-icons/md";
import Container from "../components/common/Container";
import PageHeader from "../components/common/PageHeader";
import Filters from "../sections/doubt-forum/all-questions/Filters";
import Questions from "../sections/doubt-forum/all-questions/Questions";
import { twMerge } from "tailwind-merge";
import QuestionDetails from "../sections/doubt-forum/all-questions/QuestionDetails";
import { useSelector } from "react-redux";
import { useState } from "react";
import AskDoubt from "../components/doubt-forum/popups/AskDoubt";
import Modal from "../components/common/modal/Modal";

const DoubtForum = () => {
  const { showQuestionDetails } = useSelector(
    (state) => state.doubtForumQuestionDetails
  );

  const [showAskDoubtPopup, setShowAskDoubtPopup] = useState(false);

  const openAskDoubtPopup = () => {
    setShowAskDoubtPopup(true);
  };

  const closeAskDoubtPopup = () => {
    setShowAskDoubtPopup(false);
  };

  return (
    <>
      <Container>
        <PageHeader
          text={"Doubt Forum"}
          showButton={true}
          btnText={"Ask a Doubt"}
          buttonStartIcon={<MdAdd />}
          buttonOnClick={openAskDoubtPopup}
          buttonSize={"base"}
          isButtonStickyInMobile={true}
        />

        <div className="w-full h-[calc(100%-40px)] relative overflow-hidden ">
          <Filters />
          <Questions />

          <div
            className={twMerge(
              "w-full h-full bg-[#f8f9fa] transition-all ease-in-out py-3 px-1 absolute top-0 duration-700 overflow-hidden",
              showQuestionDetails ? "translate-x-0" : "translate-x-full"
            )}
          >
            <QuestionDetails />
          </div>
        </div>
      </Container>
      <Modal
        open={showAskDoubtPopup}
        width={"auto"}
        height={"auto"}
        handleClose={closeAskDoubtPopup}
      >
        <AskDoubt onClose={closeAskDoubtPopup} />
      </Modal>
    </>
  );
};

export default DoubtForum;
