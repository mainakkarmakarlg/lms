/**
 * Filter questions based on their status
 * @param {Array} questions the questions to filter
 * @param {Array} flaggedQuestions the questions that are flagged
 * @param {boolean} showFlagged whether to show flagged questions
 * @param {boolean} showAttempted whether to show attempted questions
 * @param {boolean} showUnattempted whether to show unattempted questions
 * @param {boolean} showCorrected whether to show corrected questions
 * @param {boolean} showInCorrect whether to show incorrect questions
 * @returns {Array} the filtered questions
 */

export const filterQuestions = (
  questions,
  flaggedQuestions,
  showFlagged,
  showAttempted,
  showUnattempted,
  showCorrected,
  showInCorrect
) => {
  // console.log("showFlagged : ", showFlagged);
  // console.log("showAttempted : ", showAttempted);
  // console.log("showUnattempted : ", showUnattempted);
  // console.log("showCorrected : ", showCorrected);
  // console.log("showInCorrect : ", showInCorrect);

  if (!showAttempted && !showFlagged && !showUnattempted) {
    return questions;
  }

  const flaggedSet = new Set(flaggedQuestions?.map((q) => q.questionId));
  return questions.filter((question) => {
    const isAttempted =
      question?.optionId !== null && question?.optionId !== undefined;
    const isUnattempted = question?.optionId == null;
    const isFlagged = flaggedSet.has(question?.Question?.id);
    const correctOptionId = question?.Question?.Option?.find(
      (option) => option?.RightOption?.optionId
    );

    const corrected = question?.optionId === correctOptionId?.id;
    const incorrect = question?.optionId !== correctOptionId?.id;

    return (
      (showAttempted && isAttempted) ||
      (showUnattempted && isUnattempted) ||
      (showFlagged && isFlagged) ||
      (showCorrected && corrected) ||
      (showInCorrect && incorrect)
    );
  });
};
