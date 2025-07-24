import { useMemo } from "react";
import { useSelector } from "react-redux";
const useRequestHeaders = ({ type }) => {
  const { accessToken } = useSelector((state) => state.user);
  const headers = useMemo(() => {
    const contentType =
      type !== "file" ? "application/json" : "multipart/form-data";
    return {
      contentType,
      Authorization: `Bearer ${accessToken}`,
    };
  }, [accessToken, type]);

  return headers;
};

export default useRequestHeaders;
