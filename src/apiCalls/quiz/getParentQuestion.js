// import instance from "../../utils/instance";
// import { getHeaders } from "../../utils/requestHeaders";
import { getSocket } from "../../utils/socket";

// export const getParentQuestion = async (questionId, token) => {
//   const headers = getHeaders(token);
//   const url = `/practice/get-practice-parent-question?questionId=${questionId}`;
//   try {
//     const response = await instance.get(url, { headers });
//     if (response?.status === 200 || response?.status === 201) {
//       return successResponse(
//         "Parent question fetched successfully",
//         response?.status,
//         response?.data
//       );
//     }
//   } catch (error) {
//     return errorResponse(error);
//   }
// };

export const getParentQuestion = async (questionId) => {
  const socket = getSocket();
  return new Promise((resolve, reject) => {
    try {
      socket.emit("get-practice-parent-question", { questionId });

      socket.once("get-practice-parent-question-success", (data) => {
        console.log(data);

        const newData = {
          ...data,
          Questions: data?.Questions?.map((question) => {
            return transformQuestionToAttemptFormat(question);
          }),
        };
        console.log("newData", newData);
        resolve(newData);
      });

      socket.once("get-practice-parent-question-error", (error) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const transformQuestionToAttemptFormat = (data) => {
  if (!data) return null;

  const { Attempt, Option, ...questionFields } = data;

  const attempt = Attempt?.[0] || {};

  return {
    ...attempt,
    hasSubmitted: true,
    Question: {
      ...questionFields,
      Option: Option || [],
    },
  };
};
