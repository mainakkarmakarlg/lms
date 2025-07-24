export const getSelectedSubjects = (subjects) => {
  return subjects?.reduce((selected, subject) => {
    if (subject?.selected) {
      return [...selected, subject];
    }
    if (subject?.Subjects?.length) {
      const nestedSelected = subject.Subjects.reduce((subSelected, topic) => {
        return topic.selected ? [...subSelected, topic] : subSelected;
      }, []);
      return [...selected, ...nestedSelected];
    }
    return selected;
  }, []);
};
