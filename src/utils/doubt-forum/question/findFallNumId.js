export const findFallNumId = (subjectId, allSubjects) => {
  const exists = allSubjects.find((s) => s.id === subjectId);
  if (exists) {
    if (exists.FallNumber?.length > 0) {
      return exists.FallNumber[0]?.fallId;
    }
  }
};

export const findFallNumIdFromQuestion = (question) => {
  const fallNumber = question?.FallNumber?.id;
  return fallNumber;
};
