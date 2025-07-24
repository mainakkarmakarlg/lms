import instance from "../../utils/instance";
import { getHeaders } from "../../utils/requestHeaders";
import { errorResponse, successResponse } from "../../utils/responses";

export const getCombination = async (url, token) => {
  const headers = getHeaders(token);
  try {
    const response = await instance.get(url, { headers });
    if (response?.status === 200 || response?.status === 201) {
      return successResponse(
        "Combination fetched successfully",
        response?.status,
        response?.data
      );
    }
  } catch (error) {
    return errorResponse(error);
  }
};
