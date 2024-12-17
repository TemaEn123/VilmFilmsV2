import { useRef } from "react";

import { useLocation } from "react-router";

const useWasPageChange = () => {
  const location = useLocation();

  const pathRef = useRef<{ pathname: string; search: string }>({
    pathname: "",
    search: "name",
  });

  const isFirstPageRef = useRef<boolean>(false);

  if (
    location.pathname !== pathRef.current.pathname ||
    location.search !== pathRef.current.search
  ) {
    isFirstPageRef.current = true;
    pathRef.current.pathname = location.pathname;
    pathRef.current.search = location.search;
  } else {
    isFirstPageRef.current = false;
  }

  return isFirstPageRef;
};

export default useWasPageChange;
