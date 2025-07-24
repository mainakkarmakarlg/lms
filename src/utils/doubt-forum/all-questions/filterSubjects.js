export const filterSubjects = (
  allSubjects,
  allTopics,
  allPoints,
  subjectId,
  topicId,
  pointId
) => {
  let subjects = [];
  let topics = [];
  let points = [];
  let selectedSubjectByTopicId = null;
  let selectedTopicByPointId = null;

  if (pointId) {
    const exists = allPoints.find((p) => p.subjectId === pointId);
    if (!topicId) {
      selectedTopicByPointId = exists?.subjectId;
    }

    if (exists) {
      points = allPoints?.filter((p) => p.subjectId === topicId);
      const subId = points[0]?.subjectId;
      if (subId) {
        selectedSubjectByTopicId = subId;
      }
    }
  } else if (topicId) {
    const exists = allTopics.find((t) => t.id === topicId);
    if (!subjectId) {
      selectedSubjectByTopicId = exists?.subjectId;
    }
    if (exists) {
      topics = allTopics?.filter((t) => t.subjectId === subjectId);
      if (exists?.Subjects?.length) {
        points = exists?.Subjects;
      }
    }
  } else if (subjectId) {
    const exists = allSubjects.find((s) => s.id === subjectId);
    if (exists) {
      subjects = allSubjects;
      if (exists?.Subjects?.length) {
        topics = exists?.Subjects;
      }

      if (topics?.length) {
        for (let i = 0; i < topics?.length; i++) {
          const topic = topics[i];
          if (topic?.Subjects?.length) {
            points?.push(...topic.Subjects);
          }
        }
      }
    }
  }

  return {
    subjects,
    topics,
    points,
    selectedSubjectByTopicId,
    selectedTopicByPointId,
  };
};
