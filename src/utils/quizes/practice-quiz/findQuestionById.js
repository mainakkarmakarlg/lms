function findQuestionById(data, targetId) {
  if (!data) return null;

  if (Array.isArray(data)) {
    for (const item of data) {
      const result = findQuestionById(item, targetId);
      if (result) return result;
    }
  } else if (typeof data === "object") {
    // Check for match at this level
    if (data.questionId === targetId || data.id === targetId) {
      return data;
    }

    // If Questions exist and have elements, go deeper
    if (Array.isArray(data.Questions) && data.Questions.length > 0) {
      const result = findQuestionById(data.Questions, targetId);
      if (result) return result;
    }

    // Check other properties (in case structure varies)
    for (const key in data) {
      if (key !== "Questions") {
        const result = findQuestionById(data[key], targetId);
        if (result) return result;
      }
    }
  }

  return null;
}

export default findQuestionById;
