import { useSelector } from "react-redux";
import {
  useGetActorQuery,
  useGetFilmsByLinkClickQuery,
  useGetFilmsBySearchQuery,
} from "../../redux/services/filmsApi";
import { RootState } from "../../redux/store";

import queryString from "query-string";

import Films from "../../components/Films/Films";
import { Box } from "@mui/material";

import { queryBySearchAndClick } from "../../data";

import useWasPageChange from "../../helpers/hooks/useWasPageChange";

const SearchPage = () => {
  const isFirstPageRef = useWasPageChange();

  const parsed = queryString.parse(location.search);

  const filters = useSelector((state: RootState) => state.filters.filters);

  const skip: boolean = Object.keys(parsed)[0] === "title";

  const {
    data: actor,
    error: errorActor,
    isFetching: isFetchingActor,
  } = useGetActorQuery(parsed["persons.id"] as string, {
    skip: Object.keys(parsed)[0] !== "persons.id",
  });

  const {
    data: filmsBySearch,
    error: errorBySearch,
    isFetching: isFetchingBySearch,
  } = useGetFilmsBySearchQuery(
    [parsed.title as string, isFirstPageRef.current ? "1" : filters.page],
    {
      skip:
        !skip ||
        !queryBySearchAndClick.includes(Object.keys(parsed)[0]) ||
        parsed[Object.keys(parsed)[0]]!.length < 1,
    }
  );

  const {
    data: filmsByClick,
    error: errorByClick,
    isFetching: isFetchingByClick,
  } = useGetFilmsByLinkClickQuery(
    [
      Object.keys(parsed)[0],
      parsed[Object.keys(parsed)[0]] as string,
      isFirstPageRef.current ? "1" : filters.page,
    ],
    {
      skip:
        skip ||
        !queryBySearchAndClick.includes(Object.keys(parsed)[0]) ||
        parsed[Object.keys(parsed)[0]]!.length < 1,
    }
  );

  return (
    <>
      {!queryBySearchAndClick.includes(Object.keys(parsed)[0]) ||
      parsed[Object.keys(parsed)[0]]!.length < 1 ||
      errorByClick ||
      errorBySearch ||
      errorActor ? (
        <Box
          sx={{
            width: "100%",
            fontSize: "20px",
            textAlign: "center",
            marginTop: "50px",
          }}
        >
          Некорректный запрос
        </Box>
      ) : (
        <>
          {!isFetchingBySearch && !isFetchingByClick && !isFetchingActor && (
            <Box
              sx={{
                fontSize: { xs: "20px", md: "25px" },
                marginBottom: { xs: "20px", md: "25px" },
              }}
            >
              {Object.keys(parsed)[0] === "persons.id"
                ? actor?.name
                : parsed[Object.keys(parsed)[0]]}
            </Box>
          )}
          <Films
            filters={filters}
            films={skip ? filmsBySearch : filmsByClick}
            error={skip ? errorBySearch : errorByClick}
            isFetching={skip ? isFetchingBySearch : isFetchingByClick}
          />
        </>
      )}
    </>
  );
};

export default SearchPage;
