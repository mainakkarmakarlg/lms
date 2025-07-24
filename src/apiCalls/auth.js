import instance from "../utils/instance";
import { errorResponse, successResponse } from "../utils/responses";

export const loginUser = async (data) => {
  try {
    const response = await instance.post("/auth/lmslogin", data);
    if (response?.status === 200) {
      // return response?.data;
      return successResponse(
        "Login successful",
        response?.status,
        response?.data
      );
    }
  } catch (error) {
    return errorResponse(error);
  }
};
