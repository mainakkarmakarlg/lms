const getCurrentQuestion = (
  questions,
  currentQuestionIdx,
  currentSubQuestionIdx
) => {
  if (currentSubQuestionIdx !== null) {
    return questions[currentQuestionIdx]?.Questions?.[currentSubQuestionIdx];
  }
  return questions[currentQuestionIdx];
};

export default getCurrentQuestion;
