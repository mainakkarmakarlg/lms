import { extractSubjectChapterLosFromQuestion2 } from "../common/extractSubjectChapterLosFromQuestion2";

const filterdResultQuestion = (questions) => {
  const updatedQuestions = questions?.map((question) => {
    let status = "unattempted";
    const { subject, chapter, los } = extractSubjectChapterLosFromQuestion2(
      question?.FallNumber?.[0]?.FallNumber
    );

    const firstAnswer = question?.Answers?.[0];
    const selectedOptionId = firstAnswer?.optionId;

    if (selectedOptionId != null) {
      status = "attempted";

      const isCorrect = question?.Option?.some(
        (option) => option?.RightOption?.optionId === selectedOptionId
      );

      status = isCorrect ? "correct" : "wrong";
    }

    return {
      ...question,
      subject,
      chapter,
      los,
      status,
    };
  });

  return updatedQuestions;
};

export default filterdResultQuestion;
