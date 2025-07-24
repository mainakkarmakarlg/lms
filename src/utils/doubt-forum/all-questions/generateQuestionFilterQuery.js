import { convertObjectArrayToString } from "./convertObjectArrayToString";

export const generateQuestionFilterQuery = (
  selectedSubjects,
  selectedTopics,
  selectedPoints,
  questionType,
  sortOption,
  searchText
) => {
  const params = [];

  if (selectedPoints?.length > 0) {
    const subjectIds = convertObjectArrayToString(selectedPoints);
    params.push(`subjectIds=${subjectIds}`);
  } else if (selectedTopics?.length > 0) {
    const subjectIds = convertObjectArrayToString(selectedTopics);
    params.push(`subjectIds=${subjectIds}`);
  } else if (selectedSubjects?.length > 0) {
    const subjectIds = convertObjectArrayToString(selectedSubjects);
    params.push(`subjectIds=${subjectIds}`);
  }

  if (questionType !== "all") params.push(`type=${questionType}`);
  if (sortOption) params.push(`sort=${sortOption}`);
  if (searchText) params.push(`search=${searchText}`);

  return params.join("&");
};
