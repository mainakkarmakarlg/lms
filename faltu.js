let question = {
  id: 12,
  question:
    "The NPV of an investment is equal to the sum of the expected cash flows discounted at the:",
  averageTime: null,
  difficulty: 0,
  attachment: null,
  questionId: null,
  attribute: "",
  createdAt: "2025-02-15T13:16:13.699Z",
  updatedAt: "2025-02-15T13:16:13.699Z",
  Option: [
    {
      id: 13,
      answer: "Risk-free rate.",
      attachment: null,
      questionId: 12,
    },
  ],
  FallNumber: [
    {
      questionId: 12,
      fallNumberId: 201,
      FallNumber: {
        id: 201,
        number: "26BC1",
        Subject: [
          {
            id: 201,
            fallId: 201,
            subjectId: 247,
            Subject: {
              id: 247,
              name: "B. describe the capital allocation process, calculate net present value (NPV), internal rate of return (IRR), and return on invested capital (ROIC), and contrast their use in capital allocation",
              order: null,
              type: "los",
              subjectId: 245,
              Subject: {
                id: 245,
                name: "26. Capital Investments and Capital Allocation",
                order: null,
                type: "chapter",
                subjectId: 228,
                Subject: {
                  id: 228,
                  name: "Corporate Issuers",
                  order: 4,
                  type: "subject",
                  subjectId: null,
                  Subject: null,
                },
              },
            },
          },
          {
            id: 714,
            fallId: 201,
            subjectId: 891,
            Subject: {
              id: 891,
              name: "B. describe the capital allocation process, calculate net present value (NPV), internal rate of return (IRR), and return on invested capital (ROIC), and contrast their use in capital allocation",
              order: null,
              type: "los",
              subjectId: 889,
              Subject: {
                id: 889,
                name: "24. Capital Investments and Capital Allocation",
                order: null,
                type: "chapter",
                subjectId: 872,
                Subject: {
                  id: 872,
                  name: "Corporate Issuers",
                  order: 4,
                  type: "subject",
                  subjectId: null,
                  Subject: null,
                },
              },
            },
          },
        ],
      },
    },
  ],
};
function extractSubjectData(subject) {
  const result = {
    subject: null,
    chapter: null,
    los: null,
  };

  function traverse(node) {
    if (!node) return;

    if (node.type === "subject") {
      result.subject = {
        id: node.id,
        name: node.name,
        order: node.order,
      };
    } else if (node.type === "chapter") {
      result.chapter = {
        id: node.id,
        name: node.name,
        order: node.order,
      };
    } else if (node.type === "los") {
      result.los = {
        id: node.id,
        name: node.name,
        order: node.order,
      };
    }

    if (node.Subject) {
      traverse(node.Subject);
    }
  }

  traverse(subject.Subject);
  return result;
}

// const data = extractSubjectData(
//   question?.FallNumber[0]?.FallNumber?.Subject[0]
// );

// console.log(data);

const mockQuizData1 = [
  {
    id: 2,
    name: "Mock A - Session 2",
    resultType: "never",
    accessType: "free",
    timeType: "duration",
    duration: 2000000,
    isActive: null,
    attemptType: "multiple",
    quizId: null,
    startTime: null,
    endTime: null,
    notified: null,
    createdAt: "2025-04-22T12:24:30.830Z",
    updatedAt: "2025-04-18T11:20:54.509Z",
    Quizzes: [],
    CourseNdPlatform: [
      {
        slug: "test",
        platformId: 4,
      },
      {
        slug: "test",
        platformId: 9,
      },
    ],
    _count: {
      Questions: 10,
    },
    Questions: [
      {
        _count: {
          Answers: 0,
        },
      },
      {
        _count: {
          Answers: 0,
        },
      },
      {
        _count: {
          Answers: 0,
        },
      },
      {
        _count: {
          Answers: 0,
        },
      },
      {
        _count: {
          Answers: 0,
        },
      },
      {
        _count: {
          Answers: 0,
        },
      },
      {
        _count: {
          Answers: 0,
        },
      },
      {
        _count: {
          Answers: 0,
        },
      },
      {
        _count: {
          Answers: 0,
        },
      },
      {
        _count: {
          Answers: 0,
        },
      },
    ],
    Attempts: [],
  },
  {
    id: 1,
    name: "Mock A - Session 1",
    resultType: "aftersubmit",
    accessType: "free",
    timeType: "duration",
    duration: 120,
    isActive: null,
    attemptType: "single",
    quizId: null,
    startTime: "2025-05-08T08:55:00.000Z",
    endTime: "2025-05-15T08:55:00.000Z",
    notified: null,
    createdAt: "2025-04-22T12:24:30.830Z",
    updatedAt: "2025-04-18T11:20:54.509Z",
    Quizzes: [],
    CourseNdPlatform: [
      {
        slug: "test",
        platformId: 9,
      },
      {
        slug: "test",
        platformId: 4,
      },
    ],
    _count: {
      Questions: 10,
    },
    Questions: [
      {
        _count: {
          Answers: 0,
        },
      },
      {
        _count: {
          Answers: 0,
        },
      },
      {
        _count: {
          Answers: 0,
        },
      },
      {
        _count: {
          Answers: 0,
        },
      },
      {
        _count: {
          Answers: 0,
        },
      },
      {
        _count: {
          Answers: 0,
        },
      },
      {
        _count: {
          Answers: 0,
        },
      },
      {
        _count: {
          Answers: 0,
        },
      },
      {
        _count: {
          Answers: 0,
        },
      },
      {
        _count: {
          Answers: 0,
        },
      },
    ],
    Attempts: [],
  },
  {
    id: 3,
    name: "Mock A - Session 3",
    resultType: "aftersubmit",
    accessType: "free",
    timeType: "duration",
    duration: 10000,
    isActive: null,
    attemptType: "multiple",
    quizId: null,
    startTime: "2025-05-01T12:10:37.884Z",
    endTime: "2025-05-03T13:29:35.246Z",
    notified: null,
    createdAt: "2025-04-22T12:24:30.830Z",
    updatedAt: "2025-04-18T11:20:54.509Z",
    Quizzes: [],
    CourseNdPlatform: [
      {
        slug: "test",
        platformId: 4,
      },
      {
        slug: "test",
        platformId: 9,
      },
    ],
    _count: {
      Questions: 0,
    },
    Questions: [],
    Attempts: [],
  },
];
