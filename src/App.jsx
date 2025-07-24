import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layout/MainLayout";
import UserNotFound from "./pages/UserNotFound";
import QuizLayout from "./layout/QuizLayout";
import Error from "./pages/Error";
import DoubtForum from "./pages/DoubtForum";

import PracticeQuizHome from "./pages/PracticeQuizHome";
import PracticeQuizExam from "./pages/PracticeQuizExam";
import PracticeResult from "./pages/PracticeResult";
import QuizExam from "./pages/QuizExam";
import MockResult from "./pages/mock/MockResult";
import ChildExamsPage from "./sections/quizes/mock-quiz/exams/ChildExamsPage";
import MockQuizHome from "./pages/MockQuizHome";
import NoQuestions from "./pages/NoQuestions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            path="doubt-forum/:combination/:phone"
            element={<DoubtForum />}
          />

          <Route path="/" element={<QuizLayout />}>
            <Route
              path="practice-quiz/:combination/:phone"
              element={<PracticeQuizHome />}
            />
            {/* <Route
              path="mock-quiz/:combination/:phone"
              element={<MockQuizHome />}
            /> */}
            <Route
              path="mock-quiz/:combination/:phone"
              element={<MockQuizHome />}
            />
            <Route
              path="mock-quiz/no-questions/:combination/:phone"
              element={<NoQuestions />}
            />
            <Route
              path="mock-quiz/:courseId/:combination/:phone"
              element={<ChildExamsPage />}
            />
            <Route
              path="mock-quiz/attempt/:attemptId/:combination/:phone"
              element={<QuizExam />}
            />
            <Route
              path="mock-quiz/result/:attemptId/:combination/:phone"
              element={<MockResult />}
            />
            <Route
              path="practice-quiz/:attemptId/:combination/:phone"
              element={<PracticeQuizExam />}
            />
            <Route
              path="practice-quiz/result/:attemptId/:combination/:phone"
              element={<PracticeResult />}
            />
          </Route>
          <Route path="/error/:combination/:phone" element={<Error />} />
        </Route>
        <Route path="/not-enrolled" element={<UserNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
