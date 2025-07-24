const textSubject = [
  {
    id: 664,
    name: "Quantitative Methods-Pre-requisites",
    order: 1,
    type: "subject",
    subjectId: null,
    FallNumber: [],
    Subjects: [
      {
        id: 665,
        name: "PR1. Interest Rates, Present Value, and Future Value",
        order: null,
        type: "chapter",
        subjectId: 664,
        Subjects: [
          {
            id: 666,
            name: "A. interpret interest rates as required rates of return, discount rates, or opportunity costs",
            order: null,
            type: "los",
            subjectId: 665,
            FallNumber: [
              {
                fallId: 1,
              },
            ],
            Subjects: [],
          },
          {
            id: 667,
            name: "B. explain an interest rate as the sum of a real risk-free rate and premiums that compensate investors for bearing distinct types of risk",
            order: null,
            type: "los",
            subjectId: 665,
            FallNumber: [
              {
                fallId: 2,
              },
            ],
            Subjects: [],
          },
        ],
      },
      {
        id: 672,
        name: "PR2. Organizing, Visualizing, and Describing Data",
        order: null,
        type: "chapter",
        subjectId: 664,
        Subjects: [
          {
            id: 673,
            name: "A. identify and compare data types",
            order: null,
            type: "los",
            subjectId: 672,
            FallNumber: [
              {
                fallId: 7,
              },
            ],
            Subjects: [],
          },
          {
            id: 674,
            name: "B. describe how data are organized for quantitative analysis",
            order: null,
            type: "los",
            subjectId: 672,
            FallNumber: [
              {
                fallId: 8,
              },
            ],
            Subjects: [],
          },
        ],
      },
    ],
  },
  {
    id: 727,
    name: "Quantitative Methods",
    order: 1,
    type: "subject",
    subjectId: null,
    FallNumber: [],
    Subjects: [
      {
        id: 728,
        name: "1. Rates and Returns",
        order: null,
        type: "chapter",
        subjectId: 727,
        Subjects: [
          {
            id: 729,
            name: "A. interpret interest rates as required rates of return, discount rates, or opportunity costs and explain an interest rate as the sum of a real risk-free rate and premiums that compensate investors for bearing distinct types of risk",
            order: null,
            type: "los",
            subjectId: 728,
            FallNumber: [
              {
                fallId: 56,
              },
            ],
            Subjects: [],
          },
          {
            id: 730,
            name: "B. calculate and interpret different approaches to return measurement over time and describe their appropriate uses",
            order: null,
            type: "los",
            subjectId: 728,
            FallNumber: [
              {
                fallId: 57,
              },
            ],
            Subjects: [],
          },
        ],
      },
      {
        id: 734,
        name: "2. Time Value of Money in Finance",
        order: null,
        type: "chapter",
        subjectId: 727,
        Subjects: [
          {
            id: 735,
            name: "A. calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows",
            order: null,
            type: "los",
            subjectId: 734,
            FallNumber: [
              {
                fallId: 61,
              },
            ],
            Subjects: [],
          },
          {
            id: 736,
            name: "B. calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flows",
            order: null,
            type: "los",
            subjectId: 734,
            FallNumber: [
              {
                fallId: 62,
              },
            ],
            Subjects: [],
          },
        ],
      },
    ],
  },
];

const traverseSubjects = (data) => {
  const subjects = new Map();
  const topics = new Map();
  const points = new Map();

  const traverse = (items) => {
    items.forEach((item) => {
      if (item.type === "subject") {
        subjects.set(item.id, item);
      } else if (item.type === "chapter") {
        topics.set(item.id, item);
      } else if (item.type === "los") {
        points.set(item.id, item);
      }

      if (item.Subjects && item.Subjects.length > 0) {
        traverse(item.Subjects);
      }
    });
  };

  traverse(data);

  return {
    subjects: Array.from(subjects.values()),
    topics: Array.from(topics.values()),
    points: Array.from(points.values()),
  };
};

// const result = traverseSubjects(textSubject);
// console.log(result);
