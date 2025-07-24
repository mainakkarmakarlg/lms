const result = [
  {
    id: 5947,
    timeTaken: 1938,
    Question: {
      questionId: 5942,
    },
    status: "Not Attempted",
  },
  {
    id: 5907,
    timeTaken: 410,
    Question: {
      questionId: null,
    },
    status: "Not Attempted",
  },
  {
    id: 5948,
    timeTaken: 5,
    Question: {
      questionId: 5942,
    },
    status: "Wrong",
  },
  {
    id: 5949,
    timeTaken: 5,
    Question: {
      questionId: 5942,
    },
    status: "Correct",
  },
  {
    id: 5950,
    timeTaken: 76,
    Question: {
      questionId: null,
    },
    status: "Wrong",
  },
  {
    id: 5951,
    timeTaken: 76,
    Question: {
      questionId: 5001,
    },
    status: "Wrong",
  },
  {
    id: 5952,
    timeTaken: 76,
    Question: {
      questionId: 5002,
    },
    status: "Wrong",
  },
];

// i want a array base on questionId that should be look like this

[
  {
    id: 5947,
    timeTaken: 1938,
    Question: {
      questionId: 5942,
    },
    status: "Not Attempted",
    questionIndex: "1.1", //becouse the question have parent i means this question child of 5942 and i want all child question of 5942 back to back then other question
  },
  {
    id: 5948,
    timeTaken: 5,
    Question: {
      questionId: 5942,
    },
    status: "Wrong",
    questionIndex: "1.2", //becouse the question have parent i means this question child of 5942 and i want all child question of 5942 back to back then other question
  },
  {
    id: 5949,
    timeTaken: 5,
    Question: {
      questionId: 5942,
    },
    status: "Correct",
    questionIndex: "1.3", //becouse the question have parent i means this question child of 5942 and i want all child question of 5942 back to back then other question
  },
  {
    id: 5907,
    timeTaken: 410,
    Question: {
      questionId: null,
    },
    status: "Not Attempted",
    questionIndex: "2", //becouse this question is not child of any question
  },
  {
    id: 5950,
    timeTaken: 76,
    Question: {
      questionId: null,
    },
    status: "Wrong",
    questionIndex: "3", //becouse this question is not child of any question
  },
  {
    id: 5951,
    timeTaken: 76,
    Question: {
      questionId: 5001,
    },
    status: "Wrong",
    questionIndex: "4.1", //becouse the question have parent i means this question child of 5001 and i want all child question of 5001 back to back then other question
  },
  {
    id: 5952,
    timeTaken: 76,
    Question: {
      questionId: 5002,
    },
    status: "Wrong",
    questionIndex: "5.1", //becouse the question have parent i means this question child of 5002 and i want all child question of 5002 back to back then other question
  },
];

// const final = [];
// const seenGroups = new Map(); // maps questionId -> groupIndex
// let groupCounter = 1;

// result.forEach((item) => {
//   const qid = item.Question.questionId;

//   if (qid === null) {
//     final.push({ ...item, questionIndex: `${groupCounter++}` });
//   } else {
//     if (!seenGroups.has(qid)) {
//       seenGroups.set(qid, groupCounter++);
//     }
//     const groupIndex = seenGroups.get(qid);
//     // Count how many items already assigned in this group so far
//     const countInGroup =
//       final.filter((x) => x.Question.questionId === qid).length + 1;
//     final.push({ ...item, questionIndex: `${groupIndex}.${countInGroup}` });
//   }
// });

// console.log(final);
// console.log("");

// Step 1: Group by questionId, preserving order of first appearance
// const groups = [];
// const map = new Map();

// for (const item of result) {
//   const key = item.Question.questionId;
//   if (!map.has(key)) {
//     map.set(key, []);
//     groups.push(map.get(key)); // push the reference to keep order
//   }
//   map.get(key).push(item);
// }

// // Step 2: Flatten and assign questionIndex
// let groupCounter = 1;
// const final = [];

// for (const group of groups) {
//   if (group[0].Question.questionId === null) {
//     // standalone
//     for (const item of group) {
//       final.push({ ...item, questionIndex: `${groupCounter++}` });
//     }
//   } else {
//     let childCounter = 1;
//     for (const item of group) {
//       final.push({
//         ...item,
//         questionIndex: `${groupCounter}.${childCounter++}`,
//       });
//     }
//     groupCounter++;
//   }
// }

// console.log(final);

// function assignQuestionIndices(data) {
//   let mainIndex = 1;
//   const parentMap = new Map(); // Maps questionId to { index: mainIndex, count: number of children }

//   return data.map((item) => {
//     const qid = item.Question.questionId;

//     if (qid === null) {
//       const updated = { ...item, questionIndex: `${mainIndex}` };
//       mainIndex++;
//       return updated;
//     } else {
//       if (!parentMap.has(qid)) {
//         parentMap.set(qid, { index: mainIndex, count: 1 });
//         const updated = { ...item, questionIndex: `${mainIndex}.1` };
//         mainIndex++;
//         return updated;
//       } else {
//         const entry = parentMap.get(qid);
//         entry.count += 1;
//         return { ...item, questionIndex: `${entry.index}.${entry.count}` };
//       }
//     }
//   });
// }

// function groupAndIndexQuestions(arr) {
//   const groups = new Map();
//   const order = [];

//   // Group by questionId, preserving first occurrence order
//   for (const item of arr) {
//     const qid = item.Question.questionId;
//     if (!groups.has(qid)) {
//       groups.set(qid, []);
//       order.push(qid);
//     }
//     groups.get(qid).push(item);
//   }

//   const result = [];
//   let groupNumber = 1;

//   for (const qid of order) {
//     const items = groups.get(qid);
//     if (qid === null) {
//       // Standalone questions, assign whole numbers like "2", "3", etc.
//       for (const item of items) {
//         result.push({
//           ...item,
//           questionIndex: String(groupNumber),
//         });
//         groupNumber++;
//       }
//     } else {
//       // Grouped questions, assign like "1.1", "1.2", ...
//       items.forEach((item, idx) => {
//         result.push({
//           ...item,
//           questionIndex: `${groupNumber}.${idx + 1}`,
//         });
//       });
//       groupNumber++;
//     }
//   }

//   return result;
// }

// const resultWithIndices = groupAndIndexQuestions(result);
// console.log(resultWithIndices);

// function groupByQuestionId(arr) {
//   const groups = {};

//   // Group by questionId
//   arr.forEach((item) => {
//     const qid = item.Question.questionId ?? "null"; // Use string "null" for null keys to keep as key in object
//     if (!groups[qid]) {
//       groups[qid] = {
//         questionId: item.Question.questionId,
//         items: [],
//       };
//     }
//     groups[qid].items.push(item);
//   });

//   // Convert groups object to array of groups
//   const groupedArray = Object.values(groups);

//   // Flatten all grouped items into one array (just concatenating all)
//   const flattened = groupedArray.flatMap((group) => group.items);

//   return { groupedArray, flattened };
// }
// const { groupedArray, flattened } = groupByQuestionId(result);
// console.log("Grouped Array:", groupedArray);
// console.log("Flattened Array:", flattened);

function assignQuestionIndicesSimple(input) {
  const output = [];
  let mainIndex = 1;

  // To track which parent questionIds we have assigned a main index to
  const parentIndexMap = new Map();

  const childrenMap = new Map();

  // First, group children by their parent questionId
  for (const item of input) {
    const parentId = item.Question.questionId;
    if (parentId !== null) {
      if (!childrenMap.has(parentId)) {
        childrenMap.set(parentId, []);
      }
      childrenMap.get(parentId).push(item);
    }
  }

  for (let i = 0; i < input.length; i++) {
    const item = input[i];
    const parentId = item.Question.questionId;

    if (parentId === null) {
      // This is a top-level question
      item.questionIndex = String(mainIndex);
      output.push(item);
      mainIndex++;
    } else {
      // This is a child question
      if (!parentIndexMap.has(parentId)) {
        // Assign mainIndex to this parentId (the parent's group)
        parentIndexMap.set(parentId, mainIndex);
        mainIndex++;

        // Now, push all children with this parentId
        const children = childrenMap.get(parentId) || [];

        // Sort children by their first occurrence in input (optional but keeps order stable)
        children.sort((a, b) => input.indexOf(a) - input.indexOf(b));

        children.forEach((child, idx) => {
          child.questionIndex = `${parentIndexMap.get(parentId)}.${idx + 1}`;
          output.push(child);
        });
      }
      // If parent already inserted, skip this child because it is already added in previous iteration
    }
  }

  return output;
}
const resultWithIndices = assignQuestionIndicesSimple(result);
console.log(resultWithIndices);
