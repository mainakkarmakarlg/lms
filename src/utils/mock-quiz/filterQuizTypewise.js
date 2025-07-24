export default function filterQuizTypewise(quizes) {
  const newQuiz = [];

  quizes.forEach((quiz) => {
    const currentDate = new Date();
    const quizDate = new Date(quiz.createdAt);
    // console.log("quizDate", quizDate);
    // console.log("currentDate", currentDate);
    // console.log("quizDate", quizDate);
    // console.log(quizDate > currentDate);
    // Check if the quiz is completed
    let quizData = null;
    if (quiz?.Quizzes?.length > 0) {
      quizData = enrichParentMock(quiz);
    } else {
      quizData = quiz;
    }
    if (quizDate < currentDate) {
      const existingType = newQuiz.find((item) => item.type === "Upcoming");

      if (existingType) {
        existingType.quizArray.push(quizData);
      } else {
        newQuiz.push({
          type: "Upcoming",
          quizArray: [quizData],
        });
      }
    }
  });

  return newQuiz;
}

function enrichParentMock(mock) {
  let totalDuration = 0;
  let totalQuestions = 0;
  let latestAttempt = null;

  mock.Quizzes.forEach((quiz) => {
    // Add duration (handle null)
    if (quiz.duration) {
      totalDuration += Number(quiz.duration);
    }

    // Add up questions count from _count.Questions
    totalQuestions += quiz._count?.Questions || 0;

    if (quiz?.Questions?.length > 0) {
      quiz.Questions.forEach((question) => {
        mock?.Questions.push(question);
      });
    }

    // Find latest attempt from Attempts array
    quiz.Attempts?.forEach((attempt) => {
      const attemptDate = new Date(attempt.updatedAt);
      if (!latestAttempt || attemptDate > new Date(latestAttempt.updatedAt)) {
        latestAttempt = attempt;
      }
    });
  });

  const mockData = {
    ...mock,
    duration: totalDuration,
    _count: {
      Questions: totalQuestions,
    },
    latestAttempt: latestAttempt || null,
  };

  return mockData;
}
