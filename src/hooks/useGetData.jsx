import { useState, useEffect } from "react";
import instance from "../utils/instance";
import axios from "axios";
import { useSelector } from "react-redux";

const useGetData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { accessToken } = useSelector((state) => state.user);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const fetchData = async () => {
      try {
        const response = await instance.get(url, {
          signal,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setData(response.data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          setError(error);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };
    if (url) {
      fetchData();
    } else {
      setLoading(false);
    }

    return () => {
      abortController.abort();
    };
  }, [url, accessToken]);

  return { data, loading, error };
};

export default useGetData;
