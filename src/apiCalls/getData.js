import instance from "../utils/instance";
import { errorResponse, successResponse } from "../utils/responses";

export const getData = async (endPoint, token, type) => {
  try {
    const response = await instance.get(endPoint, {
      headers: {
        "Content-Type":
          type === "file" ? "multipart/form-data" : "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response?.status === 200 || response?.status === 201) {
      // return response?.data;
      return successResponse("success", response?.status, response?.data);
    }
  } catch (error) {
    return errorResponse(error);
  }
};
