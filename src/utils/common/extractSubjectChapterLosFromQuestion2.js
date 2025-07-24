export const extractSubjectChapterLosFromQuestion2 = (subject) => {
  const result = {
    subject: null,
    chapter: null,
    los: null,
  };

  function traverse(node) {
    if (!node) return;

    if (node.type === "subject") {
      result.subject = {
        id: node.id,
        name: node.name,
        order: node.order,
      };
    } else if (node.type === "chapter") {
      result.chapter = {
        id: node.id,
        name: node.name,
        order: node.order,
      };
    } else if (node.type === "los") {
      result.los = {
        id: node.id,
        name: node.name,
        order: node.order,
      };
    }

    if (node.Subject) {
      traverse(node.Subject);
    }
  }

  traverse(subject?.Subject?.[0]);
  return result;
};
