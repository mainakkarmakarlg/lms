import { extractSubjectChapterLosFromQuestion } from "../../common/extractSubjectChapterLosFromQuestion";

const findQuestionStatus = (question, answers) => {
  const isCorrect = answers?.find((a) => a?.answer?.questionId === question.id)
    ?.answer?.Option?.RightOption?.optionId
    ? true
    : false;

  const timeTaken = answers?.find(
    (answer) => answer?.answer?.questionId === question.id
  )?.timeTaken;

  const isAttempted = answers?.find(
    (a) => a?.answer?.questionId === question.id
  )?.answer?.optionId
    ? true
    : false;

  let status = "";

  if (isCorrect) {
    status = "correct";
  } else {
    if (isAttempted) {
      status = "wrong";
    } else {
      status = "unattempted";
    }
  }

  return { status, timeTaken };
};

function calculateStats(data) {
  let subjectStats = []; // Stores subject-wise stats
  let topicStats = []; // Stores topic-wise stats

  data.forEach((subject) => {
    let subjectId = subject.id;
    let subjectName = subject.name;

    let totalSubjectQuestions = 0;
    let correctSubjectQuestions = 0;
    let unattemptedSubjectQuestions = 0;
    let wrongSubjectQuestions = 0;

    let totalSubjectTime = 0;

    subject.topics.forEach((topic) => {
      let topicId = topic.id;
      let topicName = topic.name;
      let totalTopicQuestions = topic.questions.length;

      let correctTopicQuestions = topic.questions.filter(
        (q) => q.status === "correct"
      ).length;

      let unattemptedTopicQuestions = topic.questions.filter(
        (q) => q.status === "unattempted"
      )?.length;

      let wrongTopicQuestions = topic.questions.filter(
        (q) => q.status === "wrong"
      )?.length;

      let totalTopicTime = topic.questions.reduce(
        (sum, q) => sum + (q.timeTaken || 0),
        0
      );

      // Store topic stats
      topicStats.push({
        id: topicId,
        name: topicName,
        correct: correctTopicQuestions,
        wrong: wrongTopicQuestions,
        total: totalTopicQuestions,
        unattempted: unattemptedTopicQuestions,
        timeTaken: totalTopicTime.toFixed(2), // Average time taken per question in topic
      });

      // Update subject stats
      totalSubjectQuestions += totalTopicQuestions;
      correctSubjectQuestions += correctTopicQuestions;
      unattemptedSubjectQuestions += unattemptedTopicQuestions;
      wrongSubjectQuestions += wrongTopicQuestions;

      totalSubjectTime += totalTopicTime;
    });

    // Calculate subject percentage & average time taken
    // let avgSubjectTime =
    //   totalSubjectQuestions > 0 ? totalSubjectTime / totalSubjectQuestions : 0;

    // Store subject stats
    subjectStats.push({
      id: subjectId,
      name: subjectName,
      correct: correctSubjectQuestions,
      wrong: wrongSubjectQuestions,
      total: totalSubjectQuestions,
      unattempted: unattemptedSubjectQuestions,
      timeTaken: totalSubjectTime.toFixed(2), // Average time taken per question in subject
    });
  });

  return { subjectStats, topicStats };
}

export const extractSubjectWiseQuestionsAnalysis = (answers) => {
  const questionsData = [];

  for (let i = 0; i < answers.length; i++) {
    const question = answers[i];

    const { status, timeTaken } = findQuestionStatus(question, answers);
    const belongsTo = extractSubjectChapterLosFromQuestion(
      question?.Question?.FallNumber[0]?.FallNumber?.Subject[0]
    );
    const subject = belongsTo?.subject;
    const subjectExists = questionsData?.find((item) => {
      return item.id === subject.id;
    });

    const questionToAdd = {
      id: question.questionId,
      status: status,
      optionId: question.optionId,
      questionId: question.Question.id,
      timeTaken: timeTaken,
    };

    if (subjectExists) {
      //then i need to check topic
      const topic = belongsTo?.chapter;
      const topicExists = subjectExists?.topics?.find(
        (item) => item.id === topic.id
      );

      if (topicExists) {
        // add question removing th fallnumbr key
        topicExists?.questions.push(questionToAdd);
      } else {
        subjectExists?.topics.push({
          // i want all keys of topic except Subject
          id: belongsTo?.chapter.id,
          name: belongsTo?.chapter.name,
          questions: [questionToAdd],
        });
      }
    } else {
      questionsData?.push({
        id: subject.id,
        name: subject.name,
        order: subject.order,
        type: subject.type,
        topics: [
          {
            id: belongsTo?.chapter.id,
            name: belongsTo?.chapter.name,
            questions: [questionToAdd],
          },
        ],
      });
    }
  }
  const analysedData = calculateStats(questionsData, answers);
  return { questionsData, analysedData };
};
