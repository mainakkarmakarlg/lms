const getUnattemptedQuestions = (questions) => {
  const unAttemptedQuestions = [];
  let totalQuestionIncludeSubQuestions = 0;

  const checkUnattempted = (questionList, parentIndex = null) => {
    questionList.forEach((question, index) => {
      const hasSubQuestions = question?.Questions?.length > 0;

      if (hasSubQuestions) {
        // Recursively check subquestions
        checkUnattempted(question.Questions, index);
      } else {
        totalQuestionIncludeSubQuestions++;
        const isUnattempted =
          question?.Answers?.length > 0
            ? question?.Answers?.[0]?.optionId === null
            : true;

        if (isUnattempted) {
          if (parentIndex !== null) {
            // Format: parentIndex+1.childIndex+1
            unAttemptedQuestions.push(`${parentIndex + 1}.${index + 1}`);
          } else {
            // Top-level unattempted without subquestions
            unAttemptedQuestions.push(`${index + 1}`);
          }
        }
      }
    });
  };

  checkUnattempted(questions);
  console.log(
    "totalQuestionIncludeSubQuestions",
    totalQuestionIncludeSubQuestions
  );
  return { unAttemptedQuestions, totalQuestionIncludeSubQuestions };
};

export default getUnattemptedQuestions;
