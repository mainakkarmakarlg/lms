import instance from "../../utils/instance";
import { getHeaders } from "../../utils/requestHeaders";
import { errorResponse, successResponse } from "../../utils/responses";

export const postAnswer = async (questionId, data, token) => {
  const url = `/doubtforum/${questionId}`;
  const headers = getHeaders(token, "file");
  try {
    const response = await instance.post(url, data, { headers });
    if (response?.status === 200 || response?.status === 201) {
      return successResponse(
        "Answer posted successfully",
        response?.status,
        response?.data
      );
    }
  } catch (error) {
    return errorResponse(error);
  }
};

export const answerreport = async (id, data, token) => {
  const url = `/doubtforum/answer/report/${id}`;
  const headers = getHeaders(token);
  try {
    const response = await instance.post(url, data, { headers });
    if (response?.status === 200 || response?.status === 201) {
      return successResponse(
        "Answer reported successfully",
        response?.status,
        response?.data
      );
    }
  } catch (error) {
    return errorResponse(error);
  }
};

export const likeDislikeAnswer = async (answerId, type, token) => {
  const params = [];
  if (type) {
    params.push(`type=${type}`);
  }
  const paramsStr = params.join("&");
  const url = `/doubtforum/answer/like/${answerId}?${paramsStr}`;
  const headers = getHeaders(token);
  try {
    const response = await instance.get(url, { headers });
    if (response?.status === 200 || response?.status === 201) {
      return successResponse(
        "Answer liked successfully",
        response?.status,
        response?.data
      );
    }
  } catch (error) {
    return errorResponse(error);
  }
};

export const patchAnswer = async (answerId, data, token) => {
  const url = `/doubtforum/answer/${answerId}`;
  const headers = getHeaders(token, "file");
  try {
    const response = await instance.patch(url, data, { headers });
    if (response?.status === 200 || response?.status === 201) {
      return successResponse(
        "Answer updated successfully",
        response?.status,
        response?.data
      );
    }
  } catch (error) {
    return errorResponse(error);
  }
};

export const deleteAnswer = async (answerId, token) => {
  const url = `/doubtforum/answer/${answerId}`;
  const headers = getHeaders(token);
  try {
    const response = await instance.delete(url, { headers });
    if (response?.status === 200 || response?.status === 201) {
      return successResponse(
        "Answer updated successfully",
        response?.status,
        response?.data
      );
    }
  } catch (error) {
    return errorResponse(error);
  }
};
