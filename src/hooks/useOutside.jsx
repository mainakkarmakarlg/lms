import { useEffect } from "react";

const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback(event);
      }
    };

    document?.addEventListener("click", handleClickOutside);
    return () => {
      document?.removeEventListener("click", handleClickOutside);
    };
  }, [ref, callback]);
};

export default useOutsideClick;
