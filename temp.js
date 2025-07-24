const flattenQuestions = (data) => {
  const result = [];

  const recurse = (items, prefix = "") => {
    items.forEach((item, index) => {
      const label = prefix ? `${prefix}.${index + 1}` : `${index + 1}`;
      const { Questions, ...rest } = item; // Remove nested children
      result.push({ ...rest, label }); // Flattened item

      if (Questions?.length) {
        recurse(Questions, label); // Recurse nested
      }
    });
  };

  recurse(data);
  return result;
};

const data = [
  {
    id: 4,
    question: "The statement which is not representative of unit costs?",
    score: null,
    averageTime: null,
    difficulty: 5,
    attachment: null,
    quizId: 1,
    order: null,
    canShuffle: null,
    questionId: null,
    type: null,
    attribute: "Concept",
    createdAt: "2025-04-24T07:20:38.853Z",
    updatedAt: "2025-04-24T07:20:38.853Z",
    Option: [],
    Answers: [
      {
        id: 15,
        attemptId: 1,
        questionId: 4,
        optionId: null,
        timeTaken: 35,
        difficulty: null,
        hasSubmitted: null,
        createdAt: "2025-05-02T05:55:49.887Z",
        updatedAt: "2025-05-02T06:00:21.714Z",
      },
    ],
    FallNumber: [
      {
        questionId: 4,
        fallNumberId: 142,
        FallNumber: {
          Subject: [
            {
              id: 671,
              fallId: 142,
              subjectId: 835,
              Subject: {
                id: 835,
                name: "A. determine and interpret breakeven and shutdown points of production, as well as how economies and diseconomies of scale affect costs under perfect and imperfect competition",
                order: null,
                type: "los",
                subjectId: 834,
                Subject: {
                  id: 834,
                  name: "12. The Firm and Market Structures",
                  order: null,
                  type: "chapter",
                  subjectId: 833,
                  Subject: {
                    id: 833,
                    name: "Economics",
                    order: 2,
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
    Questions: [
      {
        id: 3,
        question:
          "A measure that is least likely use standard deviation as a measure of risk & exhibit negative skewness in returns is the:",
        score: null,
        averageTime: null,
        difficulty: 5,
        attachment: null,
        quizId: 1,
        order: null,
        canShuffle: null,
        questionId: 4,
        type: null,
        attribute: "Concept",
        createdAt: "2025-04-24T07:20:38.652Z",
        updatedAt: "2025-04-24T07:20:38.652Z",
        Option: [
          {
            id: 2,
            answer: "Sharpe ratio",
            attachment: null,
            questionId: 3,
          },
          {
            id: 3,
            answer: "Safety-first measure.",
            attachment: null,
            questionId: 3,
          },
          {
            id: 1,
            answer:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique fuga, laborum earum fugit sapiente molestias, maxime eos sed maiores perferendis dolores recusandae, libero quis ea sint. Minima officia soluta quibusdam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique fuga, laborum earum fugit sapiente molestias, maxime eos sed maiores perferendis dolores recusandae, libero quis ea sint. Minima officia soluta quibusdam?\n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Similique fuga, laborum earum fugit sapiente molestias, maxime eos sed maiores perferendis dolores recusandae, libero quis ea sint. Minima officia soluta quibusdam?\n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Similique fuga, laborum earum fugit sapiente molestias, maxime eos sed maiores perferendis dolores recusandae, libero quis ea sint. Minima officia soluta quibusdam?\n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Similique fuga, laborum earum fugit sapiente molestias, maxime eos sed maiores perferendis dolores recusandae, libero quis ea sint. Minima officia soluta quibusdam?",
            attachment: null,
            questionId: 3,
          },
        ],
        Answers: [
          {
            id: 13,
            attemptId: 1,
            questionId: 3,
            optionId: 1,
            timeTaken: 14,
            difficulty: null,
            hasSubmitted: null,
            createdAt: "2025-05-02T05:44:44.395Z",
            updatedAt: "2025-05-02T05:56:49.714Z",
          },
        ],
        UserReports: [],
        UserFlags: [],
        FallNumber: [
          {
            questionId: 3,
            fallNumberId: 73,
            FallNumber: {
              Subject: [
                {
                  id: 602,
                  fallId: 73,
                  subjectId: 750,
                  Subject: {
                    id: 750,
                    name: "C. define shortfall risk, calculate the safety-first ratio, and identify an optimal portfolio using Roy’s safety-first criterion",
                    order: null,
                    type: "los",
                    subjectId: 747,
                    Subject: {
                      id: 747,
                      name: "5. Portfolio Mathematics",
                      order: null,
                      type: "chapter",
                      subjectId: 727,
                      Subject: {
                        id: 727,
                        name: "Quantitative Methods",
                        order: 1,
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
        questionIndex: "1.1",
      },
      {
        id: 5,
        question: "The companies having a high level of macro risk are:",
        score: null,
        averageTime: null,
        difficulty: 1,
        attachment: null,
        quizId: 1,
        order: null,
        canShuffle: null,
        questionId: 4,
        type: null,
        attribute: "Application based",
        createdAt: "2025-04-24T07:20:39.005Z",
        updatedAt: "2025-04-24T07:20:39.005Z",
        Option: [
          {
            id: 7,
            answer: "A coffee plantation in Brazil",
            attachment: null,
            questionId: 5,
          },
          {
            id: 8,
            answer: "A Swedish mining equipment manufacturer",
            attachment: null,
            questionId: 5,
          },
          {
            id: 9,
            answer: "A call center outsourcing business based in India",
            attachment: null,
            questionId: 5,
          },
        ],
        Answers: [
          {
            id: 12,
            attemptId: 1,
            questionId: 5,
            optionId: 7,
            timeTaken: 903,
            difficulty: null,
            hasSubmitted: null,
            createdAt: "2025-05-02T05:36:21.492Z",
            updatedAt: "2025-05-02T05:58:18.595Z",
          },
        ],
        UserReports: [
          {
            questionId: 5,
            userId: 593,
            reason: "fd",
            tag: '["I found a typo","Something is missing","Math is not showing up"]',
          },
        ],
        UserFlags: [],
        FallNumber: [
          {
            questionId: 5,
            fallNumberId: 153,
            FallNumber: {
              Subject: [
                {
                  id: 682,
                  fallId: 153,
                  subjectId: 848,
                  Subject: {
                    id: 848,
                    name: "D. explain the implementation of fiscal policy and difficulties of implementation as well as whether a fiscal policy is expansionary or contractionary",
                    order: null,
                    type: "los",
                    subjectId: 844,
                    Subject: {
                      id: 844,
                      name: "14. Fiscal Policy",
                      order: null,
                      type: "chapter",
                      subjectId: 833,
                      Subject: {
                        id: 833,
                        name: "Economics",
                        order: 2,
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
        questionIndex: "1.2",
      },
      {
        id: 6,
        question:
          "Which of the following sources of short-term financing is most likely used by smaller companies?",
        score: null,
        averageTime: null,
        difficulty: 0,
        attachment: null,
        quizId: 1,
        order: null,
        canShuffle: null,
        questionId: 4,
        type: null,
        attribute: "",
        createdAt: "2025-04-24T07:20:39.159Z",
        updatedAt: "2025-04-24T07:20:39.159Z",
        Option: [
          {
            id: 10,
            answer: "Uncommitted lines",
            attachment: null,
            questionId: 6,
          },
          {
            id: 11,
            answer: "Commercial paper",
            attachment: null,
            questionId: 6,
          },
          {
            id: 12,
            answer: "Collateralized loans",
            attachment: null,
            questionId: 6,
          },
        ],
        Answers: [
          {
            id: 14,
            attemptId: 1,
            questionId: 6,
            optionId: 10,
            timeTaken: 27,
            difficulty: null,
            hasSubmitted: null,
            createdAt: "2025-05-02T05:55:47.697Z",
            updatedAt: "2025-05-02T05:57:17.043Z",
          },
        ],
        UserReports: [
          {
            questionId: 6,
            userId: 593,
            reason: "",
            tag: '["I found a typo","Math is not showing up","I have a general feedback"]',
          },
        ],
        UserFlags: [
          {
            questionId: 6,
            userId: 593,
            flagText: null,
            createdAt: "2025-04-30T11:24:11.891Z",
            removed: null,
            updatedAt: "2025-04-30T11:24:11.891Z",
            id: 9,
          },
        ],
        FallNumber: [
          {
            questionId: 6,
            fallNumberId: 198,
            FallNumber: {
              Subject: [
                {
                  id: 711,
                  fallId: 198,
                  subjectId: 887,
                  Subject: {
                    id: 887,
                    name: "B. explain liquidity and compare issuers’ liquidity levels",
                    order: null,
                    type: "los",
                    subjectId: 885,
                    Subject: {
                      id: 885,
                      name: "23. Working Capital and Liquidity",
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
        questionIndex: "1.3",
      },
    ],
    UserFlags: [],
    UserReports: [],
    questionIndex: "1",
  },
  {
    id: 7,
    question:
      "With regard to capital allocation, an appropriate estimate of the incremental cash flows from an investment is least likely to include:",
    score: null,
    averageTime: null,
    difficulty: 0,
    attachment: null,
    quizId: 1,
    order: null,
    canShuffle: null,
    questionId: null,
    type: null,
    attribute: "",
    createdAt: "2025-04-24T07:20:39.278Z",
    updatedAt: "2025-04-24T07:20:39.278Z",
    Option: [
      {
        id: 15,
        answer: "Externalities",
        attachment: null,
        questionId: 7,
      },
      {
        id: 13,
        answer:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique fuga, laborum earum fugit sapiente molestias, maxime eos sed maiores perferendis dolores recusandae, libero quis ea sint. Minima officia soluta quibusdam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique fuga, laborum earum fugit sapiente molestias, maxime eos sed maiores perferendis dolores recusandae, libero quis ea sint. Minima officia soluta quibusdam?\n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Similique fuga, laborum earum fugit sapiente molestias, maxime eos sed maiores perferendis dolores recusandae, libero quis ea sint. Minima officia soluta quibusdam?\n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Similique fuga, laborum earum fugit sapiente molestias, maxime eos sed maiores perferendis dolores recusandae, libero quis ea sint. Minima officia soluta quibusdam?\n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Similique fuga, laborum earum fugit sapiente molestias, maxime eos sed maiores perferendis dolores recusandae, libero quis ea sint. Minima officia soluta quibusdam?",
        attachment: null,
        questionId: 7,
      },
      {
        id: 14,
        answer:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique fuga, laborum earum fugit sapiente molestias, maxime eos sed maiores perferendis dolores recusandae, libero quis ea sint. Minima officia soluta quibusdam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique fuga, laborum earum fugit sapiente molestias, maxime eos sed maiores perferendis dolores recusandae, libero quis ea sint. Minima officia soluta quibusdam?\n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Similique fuga, laborum earum fugit sapiente molestias, maxime eos sed maiores perferendis dolores recusandae, libero quis ea sint. Minima officia soluta quibusdam?\n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Similique fuga, laborum earum fugit sapiente molestias, maxime eos sed maiores perferendis dolores recusandae, libero quis ea sint. Minima officia soluta quibusdam?\n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Similique fuga, laborum earum fugit sapiente molestias, maxime eos sed maiores perferendis dolores recusandae, libero quis ea sint. Minima officia soluta quibusdam?",
        attachment: null,
        questionId: 7,
      },
    ],
    Answers: [
      {
        id: 6,
        attemptId: 1,
        questionId: 7,
        optionId: null,
        timeTaken: 4074,
        difficulty: 10,
        hasSubmitted: true,
        createdAt: "2025-04-28T06:06:12.074Z",
        updatedAt: "2025-05-02T06:00:41.698Z",
      },
    ],
    FallNumber: [
      {
        questionId: 7,
        fallNumberId: 201,
        FallNumber: {
          Subject: [
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
    Questions: [],
    UserFlags: [
      {
        questionId: 7,
        userId: 593,
        flagText: null,
        createdAt: "2025-04-30T10:22:38.592Z",
        removed: null,
        updatedAt: "2025-04-30T10:22:38.592Z",
        id: 5,
      },
    ],
    UserReports: [
      {
        questionId: 7,
        userId: 593,
        reason: "test report",
        tag: '["I found a typo"]',
      },
    ],
    questionIndex: "2",
  },
  {
    id: 8,
    question:
      "A three-year investment requires an initial outlay of $500. It is expected to provide three year-end cash flows of $100 plus a net salvage value of $350 at the end of three years. Its IRR is closest to:",
    score: null,
    averageTime: null,
    difficulty: 0,
    attachment: null,
    quizId: 1,
    order: null,
    canShuffle: null,
    questionId: null,
    type: null,
    attribute: "",
    createdAt: "2025-04-24T07:20:39.418Z",
    updatedAt: "2025-04-24T07:20:39.418Z",
    Option: [
      {
        id: 16,
        answer: "3.97%",
        attachment: null,
        questionId: 8,
      },
      {
        id: 17,
        answer: "11.026%",
        attachment: null,
        questionId: 8,
      },
      {
        id: 18,
        answer: "3.697%",
        attachment: null,
        questionId: 8,
      },
    ],
    Answers: [
      {
        id: 7,
        attemptId: 1,
        questionId: 8,
        optionId: null,
        timeTaken: 3101,
        difficulty: null,
        hasSubmitted: true,
        createdAt: "2025-04-28T06:06:13.782Z",
        updatedAt: "2025-05-02T06:01:13.709Z",
      },
    ],
    FallNumber: [
      {
        questionId: 8,
        fallNumberId: 201,
        FallNumber: {
          Subject: [
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
    Questions: [],
    UserFlags: [
      {
        questionId: 8,
        userId: 593,
        flagText: null,
        createdAt: "2025-05-01T12:35:37.191Z",
        removed: null,
        updatedAt: "2025-05-01T12:35:37.191Z",
        id: 16,
      },
    ],
    UserReports: [
      {
        questionId: 8,
        userId: 593,
        reason: "asdssd",
        tag: '["I found a typo","Something is missing","Math is not showing up","Something is incorrect"]',
      },
    ],
    questionIndex: "3",
  },
  {
    id: 9,
    question:
      "What type of project is most likely to yield new revenues for a company?",
    score: null,
    averageTime: null,
    difficulty: 0,
    attachment: null,
    quizId: 1,
    order: null,
    canShuffle: null,
    questionId: null,
    type: null,
    attribute: "",
    createdAt: "2025-04-24T07:20:39.572Z",
    updatedAt: "2025-04-24T07:20:39.572Z",
    Option: [
      {
        id: 19,
        answer: "Regulatory/compliance ",
        attachment: null,
        questionId: 9,
      },
      {
        id: 20,
        answer: "Going concern",
        attachment: null,
        questionId: 9,
      },
      {
        id: 21,
        answer: "Expansion",
        attachment: null,
        questionId: 9,
      },
    ],
    Answers: [
      {
        id: 8,
        attemptId: 1,
        questionId: 9,
        optionId: 21,
        timeTaken: 328,
        difficulty: 1,
        hasSubmitted: true,
        createdAt: "2025-04-28T06:06:15.401Z",
        updatedAt: "2025-05-01T05:46:25.282Z",
      },
    ],
    FallNumber: [
      {
        questionId: 9,
        fallNumberId: 200,
        FallNumber: {
          Subject: [
            {
              id: 713,
              fallId: 200,
              subjectId: 890,
              Subject: {
                id: 890,
                name: "A. describe types of capital investments",
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
    Questions: [],
    UserFlags: [],
    UserReports: [],
    questionIndex: "4",
  },
  {
    id: 10,
    question: "An example of significant execution risk is:",
    score: null,
    averageTime: null,
    difficulty: 5,
    attachment: null,
    quizId: 1,
    order: null,
    canShuffle: null,
    questionId: null,
    type: null,
    attribute: "Concept",
    createdAt: "2025-04-24T07:20:39.724Z",
    updatedAt: "2025-04-24T07:20:39.724Z",
    Option: [
      {
        id: 22,
        answer:
          "Pool chemicals plans to double its margins and triple its market share over the next five years. A manufacturer replaces aging factory machinery with similar but more efficient equipment.",
        attachment: null,
        questionId: 10,
      },
      {
        id: 23,
        answer:
          "A marketer of high-fashion pet accessories tests the market to see if there is demand for glamourous dog harnesses made with faux fur.",
        attachment: null,
        questionId: 10,
      },
      {
        id: 24,
        answer:
          "A company with consistent operating margins of about 5% with stable market share of 5% for swimming",
        attachment: null,
        questionId: 10,
      },
    ],
    Answers: [
      {
        id: 9,
        attemptId: 1,
        questionId: 10,
        optionId: 24,
        timeTaken: 1452,
        difficulty: 5,
        hasSubmitted: true,
        createdAt: "2025-04-28T06:06:16.882Z",
        updatedAt: "2025-05-01T06:19:00.800Z",
      },
    ],
    FallNumber: [
      {
        questionId: 10,
        fallNumberId: 205,
        FallNumber: {
          Subject: [
            {
              id: 718,
              fallId: 205,
              subjectId: 896,
              Subject: {
                id: 896,
                name: "B. explain factors affecting capital structure and the weighted-average cost of capital",
                order: null,
                type: "los",
                subjectId: 894,
                Subject: {
                  id: 894,
                  name: "25. Capital Structure",
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
    Questions: [],
    UserFlags: [
      {
        questionId: 10,
        userId: 593,
        flagText: null,
        createdAt: "2025-05-01T11:38:50.377Z",
        removed: null,
        updatedAt: "2025-05-01T11:38:50.377Z",
        id: 14,
      },
    ],
    UserReports: [],
    questionIndex: "5",
  },
  {
    id: 11,
    question:
      "When should an analyst expect a business model to employ premium pricing?",
    score: null,
    averageTime: null,
    difficulty: 0,
    attachment: null,
    quizId: 1,
    order: null,
    canShuffle: null,
    questionId: null,
    type: null,
    attribute: "",
    createdAt: "2025-04-24T07:20:39.849Z",
    updatedAt: "2025-04-24T07:20:39.849Z",
    Option: [
      {
        id: 25,
        answer: "the company is a price taker",
        attachment: null,
        questionId: 11,
      },
      {
        id: 26,
        answer: "the firm is small and returns are highly scale sensitive.",
        attachment: null,
        questionId: 11,
      },
      {
        id: 27,
        answer:
          "significant differentiation is possible in the product category.\n",
        attachment: null,
        questionId: 11,
      },
    ],
    Answers: [
      {
        id: 10,
        attemptId: 1,
        questionId: 11,
        optionId: null,
        timeTaken: 900,
        difficulty: 5,
        hasSubmitted: null,
        createdAt: "2025-04-28T06:06:20.219Z",
        updatedAt: "2025-05-02T06:00:32.898Z",
      },
    ],
    FallNumber: [
      {
        questionId: 11,
        fallNumberId: 208,
        FallNumber: {
          Subject: [
            {
              id: 721,
              fallId: 208,
              subjectId: 900,
              Subject: {
                id: 900,
                name: "A. describe key features of business models",
                order: null,
                type: "los",
                subjectId: 899,
                Subject: {
                  id: 899,
                  name: "26. Business Models",
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
    Questions: [],
    UserFlags: [],
    UserReports: [
      {
        questionId: 11,
        userId: 593,
        reason: "test",
        tag: '["I found a typo","Something is missing"]',
      },
    ],
    questionIndex: "6",
  },
  {
    id: 12,
    question:
      "Which of the following is the closest example of a one-sided network?\n",
    score: null,
    averageTime: null,
    difficulty: 0,
    attachment: null,
    quizId: 1,
    order: null,
    canShuffle: null,
    questionId: null,
    type: null,
    attribute: "",
    createdAt: "2025-04-24T07:20:40.007Z",
    updatedAt: "2025-04-24T07:20:40.007Z",
    Option: [
      {
        id: 28,
        answer: "An online employment website\n",
        attachment: null,
        questionId: 12,
      },
      {
        id: 29,
        answer: "A dating website for men and women",
        attachment: null,
        questionId: 12,
      },
      {
        id: 30,
        answer: "A social network for model train collectors",
        attachment: null,
        questionId: 12,
      },
    ],
    Answers: [
      {
        id: 11,
        attemptId: 1,
        questionId: 12,
        optionId: 30,
        timeTaken: 275,
        difficulty: 10,
        hasSubmitted: null,
        createdAt: "2025-04-28T06:06:22.032Z",
        updatedAt: "2025-05-02T05:58:09.906Z",
      },
    ],
    FallNumber: [
      {
        questionId: 12,
        fallNumberId: 209,
        FallNumber: {
          Subject: [
            {
              id: 722,
              fallId: 209,
              subjectId: 901,
              Subject: {
                id: 901,
                name: "B. describe various types of business models",
                order: null,
                type: "los",
                subjectId: 899,
                Subject: {
                  id: 899,
                  name: "26. Business Models",
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
    Questions: [],
    UserFlags: [
      {
        questionId: 12,
        userId: 593,
        flagText: null,
        createdAt: "2025-05-02T09:49:53.203Z",
        removed: null,
        updatedAt: "2025-05-02T09:49:53.203Z",
        id: 76,
      },
    ],
    UserReports: [
      {
        questionId: 12,
        userId: 593,
        reason: "vcvcv",
        tag: '["Something is missing","Math is not showing up","I have a general feedback"]',
      },
    ],
    questionIndex: "7",
  },
];
console.log(flattenQuestions(data));
