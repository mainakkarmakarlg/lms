import { createSlice } from "@reduxjs/toolkit";
import extractQuestionFromchild from "../../../utils/mock-quiz/extractQuestionFromchild";
import filterdResultQuestion from "../../../utils/mock-quiz/filterdResultQuestion";

const initialState = {
  result: null,
  resultQuestions: [],
  subjectWiseResults: [],
  topicWiseResults: [],
};

const mockResultSlice = createSlice({
  name: "mockResult",
  initialState,
  reducers: {
    setResult: (state, action) => {
      state.result = action.payload;
      const result = addQuestionIndexes(action.payload?.Quiz?.Questions);
      const questions = extractQuestionFromchild(result);

      const filterQuestion = filterdResultQuestion(questions);
      state.resultQuestions = filterQuestion;
      const subjectWiseResults = processQuestions(filterQuestion);
      state.subjectWiseResults = subjectWiseResults;
      const topicWiseResults = getChapterWiseResult(subjectWiseResults);
      state.topicWiseResults = topicWiseResults;
    },
  },
});

export const { setResult } = mockResultSlice.actions;
export default mockResultSlice.reducer;

const getStatus = (question) => {
  let status = "unattempted";
  const timeTaken = question?.Answers?.[0]?.timeTaken || 0;
  const firstAnswer = question?.Answers?.[0];
  const selectedOptionId = firstAnswer?.optionId;

  if (selectedOptionId != null) {
    status = question?.Option?.some(
      (option) => option?.RightOption?.optionId === selectedOptionId
    )
      ? "correct"
      : "wrong";
  }

  return {
    correct: status === "correct" ? 1 : 0,
    wrong: status === "wrong" ? 1 : 0,
    unattempted: status === "unattempted" ? 1 : 0,
    timeTaken,
  };
};

const processQuestions = (questions) => {
  const subjectMap = new Map();

  for (const question of questions) {
    const status = getStatus(question);
    const firstSubjectNode =
      question?.FallNumber?.[0]?.FallNumber?.Subject?.[0];
    if (!firstSubjectNode) continue;

    const los = firstSubjectNode?.Subject;
    const chapter = los?.Subject;
    const subject = chapter?.Subject;

    if (!subject || !chapter || !los) continue;

    // Handle Subject level
    if (!subjectMap.has(subject.id)) {
      subjectMap.set(subject.id, {
        id: subject.id,
        name: subject.name,
        type: subject.type,
        correct: 0,
        wrong: 0,
        unattempted: 0,
        timeTaken: 0,
        questionCount: 0,
        chapters: new Map(),
      });
    }

    const subjectEntry = subjectMap.get(subject.id);
    subjectEntry.correct += status.correct;
    subjectEntry.wrong += status.wrong;
    subjectEntry.unattempted += status.unattempted;
    subjectEntry.timeTaken += status.timeTaken;
    subjectEntry.questionCount += 1;

    // Handle Chapter level
    if (!subjectEntry.chapters.has(chapter.id)) {
      subjectEntry.chapters.set(chapter.id, {
        id: chapter.id,
        name: chapter.name,
        type: chapter.type,
        correct: 0,
        wrong: 0,
        unattempted: 0,
        timeTaken: 0,
        questionCount: 0,
        losList: [],
      });
    }

    const chapterEntry = subjectEntry.chapters.get(chapter.id);
    chapterEntry.correct += status.correct;
    chapterEntry.wrong += status.wrong;
    chapterEntry.unattempted += status.unattempted;
    chapterEntry.timeTaken += status.timeTaken;
    chapterEntry.questionCount += 1;

    // Add LOS (unique by ID)
    if (!chapterEntry.losList.find((l) => l.id === los.id)) {
      chapterEntry.losList.push({
        id: los.id,
        name: los.name,
        type: los.type,
      });
    }
  }

  // Convert Map to plain objects for final output
  return Array.from(subjectMap.values()).map((subject) => ({
    ...subject,
    chapters: Array.from(subject.chapters.values()),
  }));
};

const getChapterWiseResult = (subjectWiseResult) => {
  const chapterMap = new Map();

  subjectWiseResult?.forEach((subject) => {
    subject.chapters.forEach((chapter) => {
      if (!chapterMap.has(chapter.id)) {
        chapterMap.set(chapter.id, {
          id: chapter.id,
          name: chapter.name,
          type: chapter.type,
          correct: 0,
          wrong: 0,
          unattempted: 0,
          timeTaken: 0,
          questionCount: 0,
          losList: [],
        });
      }

      const chapterEntry = chapterMap.get(chapter.id);
      chapterEntry.correct += chapter.correct;
      chapterEntry.wrong += chapter.wrong;
      chapterEntry.unattempted += chapter.unattempted;
      chapterEntry.timeTaken += chapter.timeTaken;
      chapterEntry.questionCount += chapter.questionCount;

      chapter.losList.forEach((los) => {
        if (!chapterEntry.losList.find((l) => l.id === los.id)) {
          chapterEntry.losList.push({ ...los });
        }
      });
    });
  });

  return Array.from(chapterMap.values());
};

const addQuestionIndexes = (questions) => {
  const addIndexRecursively = (questionList, parentIndex = "") => {
    return questionList?.map((question, i) => {
      const indexStr = parentIndex ? `${parentIndex}.${i + 1}` : `${i + 1}`;
      const newQuestion = {
        ...question,
        questionIndex: indexStr,
      };

      if (question?.Questions?.length > 0) {
        newQuestion.Questions = addIndexRecursively(
          question.Questions,
          indexStr
        );
      }

      return newQuestion;
    });
  };

  return addIndexRecursively(questions);
};
