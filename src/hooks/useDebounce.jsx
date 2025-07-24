import { useRef, useCallback } from "react";

/**
 * useDebounce
 *
 * Creates a debounced version of the given function, which will be called after
 * the specified delay.
 *
 * @param {Function} func The function to debounce
 * @param {Number} delay The number of milliseconds to debounce for
 * @returns {Function} The debounced function
 */

const useDebounce = (func, delay) => {
  const timerRef = useRef(null);

  return useCallback(
    (...args) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    },
    [func, delay]
  );
};

export default useDebounce;
