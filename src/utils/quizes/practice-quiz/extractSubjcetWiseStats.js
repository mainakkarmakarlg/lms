import { extractSubjectChapterLosFromQuestion } from "../../common/extractSubjectChapterLosFromQuestion";

const extractStatusAndTimeTaken = (question, answers) => {
  const timeTaken = answers?.find(
    (answer) => answer?.answer?.questionId === question.id
  )?.timeTaken;

  const isCorrect = answers?.find((a) => a?.answer?.questionId === question.id)
    ?.answer?.Option?.RightOption?.optionId
    ? true
    : false;

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

  return { timeTaken, status };
};

function calculateStats(data) {
  let subjectStats = [];
  let topicStats = [];

  data.forEach((subject) => {
    let subjectId = subject.id;
    let subjectName = subject.name;
    let totalSubjectQuestions = 0;
    let correctSubjectQuestions = 0;
    let totalSubjectTime = 0;
    let unattemptedSubjectQuestions = 0;
    let wrongSubjectQuestions = 0;

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
        (sum, q) =>
          sum +
          (q.timeTaken ? q?.timeTaken : q?.status !== "unattempted" ? 1 : 0),
        0
      );

      // Calculate topic percentage & average time taken
      let topicPercentage =
        totalTopicQuestions - unattemptedTopicQuestions > 0
          ? (correctTopicQuestions /
              (totalTopicQuestions - unattemptedTopicQuestions)) *
            100
          : 0;

      // Store topic stats
      topicStats.push({
        id: topicId,
        name: topicName,
        correct: correctTopicQuestions,
        unAttempted: unattemptedTopicQuestions,
        wrong: wrongTopicQuestions,
        total: totalTopicQuestions,
        percentage: topicPercentage.toFixed(2),
        timeTaken: totalTopicTime, // Average time taken per question in topic
      });

      // Update subject stats
      totalSubjectQuestions += totalTopicQuestions;
      correctSubjectQuestions += correctTopicQuestions;
      unattemptedSubjectQuestions += unattemptedTopicQuestions;
      wrongSubjectQuestions += wrongTopicQuestions;
      totalSubjectTime += totalTopicTime;
    });

    // Calculate subject percentage & average time taken
    let subjectPercentage =
      totalSubjectQuestions - unattemptedSubjectQuestions > 0
        ? (correctSubjectQuestions /
            (totalSubjectQuestions - unattemptedSubjectQuestions)) *
          100
        : 0;

    // Store subject stats
    subjectStats.push({
      id: subjectId,
      name: subjectName,
      correct: correctSubjectQuestions,
      unAttempted: unattemptedSubjectQuestions,
      wrong: wrongSubjectQuestions,
      total: totalSubjectQuestions,
      percentage: subjectPercentage.toFixed(2),
      timeTaken: totalSubjectTime, // Average time taken per question in subject
    });
  });

  return { subjectStats, topicStats };
}

export const extractSubjcetWiseStats = (answers) => {
  const questionsData = [];

  for (let i = 0; i < answers.length; i++) {
    const question = answers[i];

    const { status, timeTaken } = extractStatusAndTimeTaken(question, answers);
    const belongsTo = extractSubjectChapterLosFromQuestion(
      question?.Question?.FallNumber[0]?.FallNumber?.Subject[0]
    );
    const subject = belongsTo?.subject;
    const subjectExists = questionsData?.find((item) => {
      return item.id === subject.id;
    });

    const questionToAdd = {
      id: question.questionId,
      optionId: question.optionId,
      order: question.order,
      question: question.Question.question,
      options: question.Question.Option,
      hasSubmitted: question.hasSubmitted,
      questionId: question.Question.id,
      UserFlag: question.Question.UserFlag,
      Question: question.Question.Question,
      score: question.Question.score,
      averageTime: question.Question.averageTime,
      difficulty: question.Question.difficulty,
      attribute: question.Question.attribute,
      createdAt: question.Question.createdAt,
      updatedAt: question.Question.updatedAt,
      attachment: question.Question.attachment,

      timeTaken: timeTaken,
      status: status,
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
  const percentages = calculateStats(questionsData, answers);
  return { questionsData, percentages };
};
