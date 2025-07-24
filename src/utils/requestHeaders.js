/**
 * Generates headers for API requests.
 *
 * @param {string} token - The auth token of the user.
 * @param {string} [type=json] - The type of the request. Can be "json" or "file".
 * @returns {object} The generated headers.
 */
export const getHeaders = (token, type = "json") => {
  const headers = {
    "Content-Type":
      type === "json" ? "application/json" : "multipart/form-data",
    Authorization: `Bearer ${token}`,
  };

  return headers;
};
