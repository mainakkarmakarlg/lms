export const getSelectedQuestionCount = (subjects) => {
  return subjects?.reduce((count, subject) => {
    if (subject?.selected) {
      return count + subject?.questionCount;
    }
    if (subject?.Subjects?.length) {
      return (
        count +
        subject.Subjects.reduce((subCount, topic) => {
          return topic.selected ? subCount + topic.questionCount : subCount;
        }, 0)
      );
    }
    return count;
  }, 0);
};
