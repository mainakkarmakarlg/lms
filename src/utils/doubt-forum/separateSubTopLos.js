export const separateSubTopLos = (data) => {
  const subjects = new Map();
  const topics = new Map();
  const points = new Map();

  const traverse = (items) => {
    items.forEach((item) => {
      if (item.type === "subject") {
        subjects.set(item.id, item);
      } else if (item.type === "chapter") {
        topics.set(item.id, item);
      } else if (item.type === "los") {
        points.set(item.id, item);
      }

      if (item.Subjects && item.Subjects.length > 0) {
        traverse(item.Subjects);
      }
    });
  };

  traverse(data);

  return {
    subjects: Array.from(subjects.values()),
    topics: Array.from(topics.values()),
    points: Array.from(points.values()),
  };
};
