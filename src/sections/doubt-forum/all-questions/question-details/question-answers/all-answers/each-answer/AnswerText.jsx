import Attachments from "../../../../../../../components/doubt-forum/attachments/Attachments";

const AnswerText = ({ answer }) => {
  return (
    <div className="text-gray-500 fle flex-col space-y-2">
      <div>{answer?.answerText}</div>

      <div>
        <Attachments
          attachments={answer.attachments}
          editable={false}
          width="fit"
        />
      </div>
    </div>
  );
};

export default AnswerText;
