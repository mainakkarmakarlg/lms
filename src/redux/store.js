import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user";
import quizSubjectsSlice from "./slices/practice-quiz/quizSubjects";
import practiceQuizSlice from "./slices/practice-quiz/practiceQuiz";
import questionsSlice from "./slices/practice-quiz/questions";
import customizeOptionsSlice from "./slices/practice-quiz/customizeOptions";
import courseSlice from "./slices/practice-quiz/course";
import searchSubjectsSlice from "./slices/practice-quiz/searchSubjects";
import recentActivitiesSlice from "./slices/practice-quiz/recentActivites";
import timerSlice from "./slices/practice-quiz/timer";
import resultSlice from "./slices/practice-quiz/result";
import questionNavigatorSlice from "./slices/practice-quiz/questionNavigator";
import flaggedQuestionSlice from "./slices/practice-quiz/flagQuestions";
import reportedQuestionSlice from "./slices/practice-quiz/reportQuestion";
import doubtForumsubjectsSlice from "./slices/doubt-forum/doubtForumSubjects";
import doubtForumQuestionsFiltersSlice from "./slices/doubt-forum/doubtForumQuestionsFilters";
import doubtForumQuestionDetailsSlice from "./slices/doubt-forum/doubtForumQuestionDetails";
import doubtForumAskDoubtSlice from "./slices/doubt-forum/doubtForumAskDoubt";
import doubtForumEditDoubtSlice from "./slices/doubt-forum/doubtforumEditDoubt";
import doubtForumQuestionsSlice from "./slices/doubt-forum/doubtForumQuestions";
import doubtForumQuestionDetailsAnswerSlice from "./slices/doubt-forum/doubtForumQuestionDetailsAnswer";
import mockQuizesSlice from "./slices/mock-quiz/mockQuiz";
import mockQuestionsSlice from "./slices/mock-quiz/mockQuestions";
import mockQuestionNavigatorSlice from "./slices/mock-quiz/mockQuestionNavigator";
import mockResultSlice from "./slices/mock-quiz/mockResult";
import appSlice from "./slices/app";
import lectureGuideSlice from "./slices/lectureguide/lectureGuide";

export const store = configureStore({
  reducer: {
    // common
    user: userSlice,
    course: courseSlice,
    app: appSlice,

    // quiz
    quizSubjects: quizSubjectsSlice,
    practiceQuiz: practiceQuizSlice,
    questions: questionsSlice,
    customizeOptions: customizeOptionsSlice,
    searchSubjects: searchSubjectsSlice,
    recentActivities: recentActivitiesSlice,
    timer: timerSlice,
    result: resultSlice,
    questionNavigator: questionNavigatorSlice,
    flaggedQuestion: flaggedQuestionSlice,
    reportQuestion: reportedQuestionSlice,

    // doubt forum
    doubtForumSubjects: doubtForumsubjectsSlice,
    doubtForumQuestionsFilters: doubtForumQuestionsFiltersSlice,
    doubtForumQuestionDetails: doubtForumQuestionDetailsSlice,
    doubtForumAskDoubt: doubtForumAskDoubtSlice,
    doubtForumEditDoubt: doubtForumEditDoubtSlice,
    doubtForumQuestions: doubtForumQuestionsSlice,
    doubtForumQuestionDetailsAnswer: doubtForumQuestionDetailsAnswerSlice,

    //mock quiz
    mockQuizes: mockQuizesSlice,
    mockQuestions: mockQuestionsSlice,
    mockQuestionNavigator: mockQuestionNavigatorSlice,
    mockResult: mockResultSlice,

    // lectureGuide
    lectureGuide: lectureGuideSlice,
  },
});
