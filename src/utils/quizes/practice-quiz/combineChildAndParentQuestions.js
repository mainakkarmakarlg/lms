import { getParentQuestion } from "../../../apiCalls/quiz/getParentQuestion";

const combineChildAndParentQuestions = async (accessToken, answers) => {
  if (!Array.isArray(answers) || answers.length === 0) {
    return { mergedAnswers: [], flagged: [], reported: [] };
  }

  const flagged = [];
  const reported = [];
  const updatedAnswers = [...answers];
  const parentMap = new Map();
  const parentIndexMap = new Map();

  for (let i = 0; i < updatedAnswers.length; i++) {
    const question = updatedAnswers[i];
    if (!question) continue;

    const { Question } = question;

    // FLAGGED
    if (Question?.UserFlag?.length > 0) {
      flagged.push({
        questionId: Question.id,
        text: Question.UserFlag[0]?.flagText,
      });
    }

    // REPORTED
    if (Question?.Report?.length > 0) {
      reported.push(Question.id);
    }

    const parentId = Question?.questionId;

    if (parentId) {
      try {
        let parentQuestion;

        // ✅ First: check if parent already exists in the answers array
        const parentFromAnswersIndex = updatedAnswers.findIndex(
          (q) => q?.Question?.id === parentId
        );

        if (parentFromAnswersIndex !== -1) {
          parentQuestion = updatedAnswers[parentFromAnswersIndex];

          if (!Array.isArray(parentQuestion.Questions)) {
            parentQuestion.Questions = [];
          }

          parentMap.set(parentId, parentQuestion);
          parentIndexMap.set(parentId, parentFromAnswersIndex);
        } else if (parentMap.has(parentId)) {
          parentQuestion = parentMap.get(parentId);
        } else {
          // 🔄 Fallback: Fetch from API if not in array or map
          const data = await getParentQuestion(Question.id);
          // console.log("___data___", data);
          parentQuestion = JSON.parse(JSON.stringify(data));

          if (!Array.isArray(parentQuestion.Questions)) {
            parentQuestion.Questions = [];
          }

          parentMap.set(parentId, parentQuestion);
          parentIndexMap.set(parentId, i); // 👈 insert parent at the index of the first child
        }

        // Push child if not already in parent
        const exists = parentQuestion.Questions.some(
          (q) => q?.Question?.id === Question.id
        );
        if (!exists) {
          parentQuestion.Questions.push(question);
        }

        // Remove the child from the top-level list
        updatedAnswers[i] = null;
      } catch (err) {
        console.error("Error fetching parent question:", err);
      }
    }
  }

  // ✅ Insert parents at correct index based on first child's position
  const mergedAnswers = [];

  for (let i = 0; i < updatedAnswers.length; i++) {
    if (updatedAnswers[i] !== null) {
      mergedAnswers.push(updatedAnswers[i]);
    } else {
      // Check if this index is where a parent should be inserted
      const parentAtThisIndex = Array.from(parentIndexMap.entries()).find(
        ([, index]) => index === i
      );

      if (parentAtThisIndex) {
        const parentId = parentAtThisIndex[0];
        const parentQuestion = parentMap.get(parentId);
        if (parentQuestion) {
          mergedAnswers.push(parentQuestion);
        }
      }
    }
  }

  // ✅ Assign fresh sequential questionIndex to parent and their children
  mergedAnswers.forEach((question, parentIdx) => {
    const baseIndex = (parentIdx + 1).toString();
    question.questionIndex = baseIndex;

    if (Array.isArray(question.Questions)) {
      question.Questions.forEach((child, childIdx) => {
        child.questionIndex = `${baseIndex}.${childIdx + 1}`;
      });
    }
  });

  return { mergedAnswers, flagged, reported };
};

export default combineChildAndParentQuestions;
