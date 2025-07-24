import { extractSubjectChapterLosFromQuestion } from "../common/extractSubjectChapterLosFromQuestion";

export const generateDoubtNumber = (course, question) => {
  const { chapter, los } = extractSubjectChapterLosFromQuestion(
    question?.FallNumber?.Subject[0]
  );
  const courseAbbr = getCourseAbbr(course, "");

  let doubtNumber = courseAbbr;

  if (los?.name) {
    doubtNumber = doubtNumber?.concat(`/${los?.name?.split(".")[0]}`);
  }

  if (chapter?.name) {
    doubtNumber = doubtNumber?.concat(`/${chapter?.name?.split(".")[0]}`);
  }

  doubtNumber = doubtNumber?.concat(`/${question?.id}`);

  return doubtNumber;
};

export function getCourseAbbr(course) {
  if (!course || !course.Course) {
    return course?.abbr || "";
  }
  return getCourseAbbr(course.Course) + "/" + course.abbr;
}
