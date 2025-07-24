import axios from "axios";
import instance from "../../utils/instance";
import { getHeaders } from "../../utils/requestHeaders";
import { errorResponse, successResponse } from "../../utils/responses";
const controllers = new Map(); // Store controllers per request URL

export const fetchQuestions = async (url, token) => {
  // Abort the previous request for the same URL if it exists
  if (controllers.has(url)) {
    controllers.get(url).abort();
  }

  // Create a new controller for this specific request
  const controller = new AbortController();
  controllers.set(url, controller);

  const { signal } = controller;
  const headers = getHeaders(token);

  try {
    const response = await instance.get(url, { headers, signal });

    // Remove the controller from the map after successful completion
    controllers.delete(url);

    if (response?.status === 200 || response?.status === 201) {
      return successResponse(
        "Questions fetched successfully",
        response?.status,
        response?.data
      );
    }
  } catch (error) {
    // Remove the controller from the map on error as well
    controllers.delete(url);

    if (axios.isCancel(error)) {
      console.log("Request canceled:", error.message);
    } else {
      return errorResponse(error);
    }
  }
};

export const fetchQuestion = async (questionId, token) => {
  const url = `/doubtforum/${questionId}`;
  const headers = getHeaders(token);
  try {
    const response = await instance.get(url, { headers });
    if (response?.status === 200 || response?.status === 201) {
      return successResponse(
        "Question fetched successfully",
        response?.status,
        response?.data
      );
    }
  } catch (error) {
    return errorResponse(error);
  }
};

export const askQuestion = async (data, token) => {
  const url = "/doubtforum";
  const headers = getHeaders(token, "file");
  try {
    const response = await instance.post(url, data, { headers });
    if (response?.status === 200 || response?.status === 201) {
      return successResponse(
        "Question asked successfully",
        response?.status,
        response?.data
      );
    }
  } catch (error) {
    return errorResponse(error);
  }
};

export const patchQuestion = async (data, questionId, token) => {
  const url = `/doubtforum/${questionId}`;
  const headers = getHeaders(token, "file");
  try {
    const response = await instance.patch(url, data, { headers });
    if (response?.status === 200 || response?.status === 201) {
      return successResponse(
        "Question asked successfully",
        response?.status,
        response?.data
      );
    }
  } catch (error) {
    return errorResponse(error);
  }
};

export const deleteQuestion = async (questionId, token) => {
  const url = `/doubtforum/${questionId}`;
  const headers = getHeaders(token);
  try {
    const response = await instance.delete(url, { headers });
    if (response?.status === 200 || response?.status === 201) {
      return successResponse(
        "Question deleted successfully",
        response?.status,
        response?.data
      );
    }
  } catch (error) {
    return errorResponse(error);
  }
};

export const likeDislikeQuestion = async (questionId, type, token) => {
  const params = [];
  if (type) {
    params.push(`type=${type}`);
  }
  const paramsStr = params.join("&");

  const url = `/doubtforum/like/${questionId}?${paramsStr}`;
  const headers = getHeaders(token);
  try {
    const response = await instance.get(url, { headers });
    if (response?.status === 200 || response?.status === 201) {
      return successResponse(
        "Question liked successfully",
        response?.status,
        response?.data
      );
    }
  } catch (error) {
    return errorResponse(error);
  }
};

export const addQuestionViewed = async (questionId, token) => {
  const url = `/doubtforum/view/${questionId}`;
  const headers = getHeaders(token);
  try {
    const response = await instance.get(url, { headers });
    if (response?.status === 200 || response?.status === 201) {
      return successResponse(
        "Question viewed successfully",
        response?.status,
        response?.data
      );
    }
  } catch (error) {
    return errorResponse(error);
  }
};

export const questionPin = async (questionId, token) => {
  const url = `/doubtforum/pin/${questionId}`;
  const headers = getHeaders(token);
  try {
    const response = await instance.get(url, { headers });
    if (response?.status === 200 || response?.status === 201) {
      return successResponse(
        "Question pinned successfully",
        response?.status,
        response?.data
      );
    }
  } catch (error) {
    return errorResponse(error);
  }
};

export const questionReport = async (questionId, data, token) => {
  const url = `/doubtforum/report/${questionId}`;
  const headers = getHeaders(token);
  try {
    const response = await instance.post(url, data, { headers });
    if (response?.status === 200 || response?.status === 201) {
      return successResponse(
        "Question pinned successfully",
        response?.status,
        response?.data
      );
    }
  } catch (error) {
    return errorResponse(error);
  }
};

export const fetchSources = async (token) => {
  const url = "/doubtforum/source";
  const headers = getHeaders(token);
  try {
    const response = await instance.get(url, { headers });
    if (response?.status === 200 || response?.status === 201) {
      return successResponse(
        "Sources fetched successfully",
        response?.status,
        response?.data
      );
    }
  } catch (error) {
    return errorResponse(error);
  }
};

export const fetchSourceQuestions = async (sourceId, token) => {
  const url = `/doubtforum/source/${sourceId}`;
  const headers = getHeaders(token);
  try {
    const response = await instance.get(url, { headers });
    if (response?.status === 200 || response?.status === 201) {
      return successResponse(
        "Questions fetched successfully",
        response?.status,
        response?.data
      );
    }
  } catch (error) {
    return errorResponse(error);
  }
};
