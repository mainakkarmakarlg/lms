import { AxiosError } from "axios";

/**
 * Generates an error response object with status, msg, and error.
 *
 * @param {number} [status] - Response status
 * @param {Error|AxiosError} [error] - Response error
 * @returns {Object} - Error response object
 */
export const errorResponse = (error) => {
  let msg = "Something went wrong";
  let status = 500;

  if (error) {
    if (error instanceof AxiosError) {
      status = error?.response?.status;
      msg = error?.response?.data?.message;
      error = error?.response?.data || error.message;
    }
  }
  const response = {
    status: status || 500,
    msg: msg || "Internal Server Error",
    error,
  };

  return response;
};

/**
 * Generates a success response object with msg, status, and data.
 *
 * @param {string} msg - Response message
 * @param {number} status - Response status
 * @param {Object} data - Response data
 * @returns {Object} - Success response object
 */
export const successResponse = (msg, status, data) => {
  const dataNew = JSON.parse(JSON.stringify(data));
  const response = {
    status: status,
    msg: msg,
    data: dataNew,
  };

  return response;
};
