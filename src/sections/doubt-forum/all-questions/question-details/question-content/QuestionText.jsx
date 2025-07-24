import Attachments from "../../../../../components/doubt-forum/attachments/Attachments";

const QuestionText = ({ question }) => {
  return (
    <div className="w-full text-gray-500 space-y-5">
      <p>{question?.questionText}</p>

      <div className="w-full">
        <Attachments
          editable={false}
          attachments={question?.attachments}
          width="fit"
        />
      </div>
    </div>
  );
};

export default QuestionText;
