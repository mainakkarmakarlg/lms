const findCurrentQuestion = (
  questions,
  currentQuestionIdx,
  currentSubQuestionIdx
) => {
  if (currentSubQuestionIdx !== null) {
    return questions[currentQuestionIdx]?.Questions?.[currentSubQuestionIdx];
  }
  return questions[currentQuestionIdx];
};

export default findCurrentQuestion;
