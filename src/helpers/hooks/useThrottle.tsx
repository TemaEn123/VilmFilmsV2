import { useEffect } from "react";

const useThrottle = (callback: () => void, delay: number = 700) => {
  useEffect(() => {
    const handler = setTimeout(function () {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);
};

export default useThrottle;
