import AnswerActions from "./each-answer/AnswerActions";
import AnswerAuthor from "./each-answer/AnswerAuthor";
import AnswerText from "./each-answer/AnswerText";

const EachAnswer = ({ answer }) => {
  return (
    <div className="w-full space-y-3 pt-3 border-t px-3">
      <AnswerAuthor answer={answer} />
      <AnswerText answer={answer} />
      <AnswerActions answer={answer} />
    </div>
  );
};

export default EachAnswer;
