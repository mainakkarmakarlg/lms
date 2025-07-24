export const getSelectedSubjectId = (subjects) => {
  return subjects?.reduce((ids, subject) => {
    if (subject?.selected) {
      return [...ids, subject?.id];
    }
    if (subject?.Subjects?.length) {
      return [
        ...ids,
        ...subject.Subjects.reduce((subIds, topic) => {
          return topic.selected ? [...subIds, topic.id] : subIds;
        }, []),
      ];
    }
    return ids;
  }, []);
};
