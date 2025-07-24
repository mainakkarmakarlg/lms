import instance from "../../utils/instance";
import { getHeaders } from "../../utils/requestHeaders";
import { errorResponse, successResponse } from "../../utils/responses";

export const questionFlag = async (data, token) => {
  const headers = getHeaders(token);
  const url = "/practice/flag";
  try {
    const response = await instance.post(url, data, { headers });
    if (response?.status === 200 || response?.status === 201) {
      return successResponse(
        "flagged successfully",
        response?.status,
        response?.data
      );
    }
  } catch (error) {
    return errorResponse(error);
  }
};

export const questionReport = async (data, token) => {
  const headers = getHeaders(token);
  const url = "/practice/report";
  try {
    const response = await instance.post(url, data, { headers });
    if (response?.status === 200 || response?.status === 201) {
      return successResponse(
        "reported successfully",
        response?.status,
        response?.data
      );
    }
  } catch (error) {
    return errorResponse(error);
  }
};
