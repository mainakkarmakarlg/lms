import instance from "../../utils/instance";
import { getHeaders } from "../../utils/requestHeaders";
import { errorResponse, successResponse } from "../../utils/responses";

const getServerTime = async (token) => {
  const headers = getHeaders(token);
  const url = "/time";
  try {
    const response = await instance.get(url, { headers });
    if (response?.status === 200 || response?.status === 201) {
      return successResponse(
        "Time fetched successfully",
        response?.status,
        response?.data
      );
    }
  } catch (error) {
    return errorResponse(error);
  }
};
export default getServerTime;
