export const QUESTION_REPORT_CATEGORIES = [
  {
    id: 1,
    value: "Inappropriate or offensive language",
  },
  {
    id: 2,
    value: "Off-topic/irrelevant content",
  },
  {
    id: 3,
    value: "Incorrect information",
  },
  {
    id: 4,
    value: "Plagiarism",
  },
  {
    id: 5,
    value: "Spam/advertising",
  },
  {
    id: 6,
    value: "Harassment/bullying",
  },
  {
    id: 7,
    value: "Violates exam integrity",
  },
  {
    id: 8,
    value: "Other",
  },
];

export const QUESTION_TYPE_FILTERS = [
  {
    name: "All Questions",
    value: "all",
  },
  {
    name: "Asked Questions",
    value: "own",
  },
  {
    name: "Pinned Questions",
    value: "pinned",
  },
  {
    name: "Unanswered Questions",
    value: "unanswered",
  },
];

export const QUESTION_SORT_FILTERS = [
  {
    name: "Most Viewed",
    value: "views",
  },
  {
    name: "Most Liked",
    value: "liked",
  },
  {
    name: "Oldest",
    value: "oldest",
  },
];

export const ANSWER_SORT_FILTERS = [
  {
    name: "All",
    value: "all",
  },
  {
    name: "Recommended",
    value: "recommended",
  },
  {
    name: "Most recent",
    value: "recent",
  },
  {
    name: "Oldest",
    value: "oldest",
  },
];

export const VALID_IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg"];
export const VALID_PDF_TYPES = ["application/pdf"];
export const MAX_IMAGE_UPLOAD_SIZE = 2000000; // 2MB
export const MAX_PDF_UPLOAD_SIZE = 2000000; // 1MB
export const MAX_IMAGE_UPLOAD_COUNT = 5;
export const MAX_PDF_UPLOAD_COUNT = 1;
