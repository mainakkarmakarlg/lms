export const validateAskDoubt = (data) => {
  const {
    questionText,
    fallNumId,
    selectedSubject,
    selectedTopic,
    selectedPoint,
    selectedSource,
  } = data;
  if (!fallNumId) {
    if (!selectedSubject) {
      return "Please select a subject";
    } else if (!selectedTopic) {
      return "Please select a topic";
    } else if (!selectedPoint) {
      return "Please select a point";
    } else {
      return "Seems like something is wrong contact support team";
    }
  }
  if (!selectedSource) {
    return "Please select a source";
  }
  if (!questionText) {
    return "Question cannot be empty";
  }
};

export const validateEditDoubt = (data) => {
  const {
    questionText,
    fallNumId,
    selectedSubject,
    selectedTopic,
    selectedPoint,
    selectedSource,
  } = data;
  if (!fallNumId) {
    if (!selectedSubject) {
      return "Please select a subject";
    } else if (!selectedTopic) {
      return "Please select a topic";
    } else if (!selectedPoint) {
      return "Please select a point";
    } else {
      return "Seems like something is wrong contact support team";
    }
  }
  if (!selectedSource) {
    return "Please select a source";
  }
  if (!questionText) {
    return "Question cannot be empty";
  }
};
