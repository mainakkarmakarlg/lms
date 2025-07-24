export const getSubjectDetailsThroughId = (subjects, id) => {
  return subjects?.find((subject) => Number(subject.id) === Number(id));
};
