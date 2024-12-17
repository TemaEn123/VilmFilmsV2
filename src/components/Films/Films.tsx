import { memo, useCallback } from "react";

import { useDispatch } from "react-redux";
import { changeFilters } from "../../redux/slices/filtersSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

import ShowMoreButton from "../../ui/ShowMoreButton/ShowMoreButton";
import LoadingIcon from "../../ui/LoadingIcon/LoadingIcon";
import FilmCard from "../../ui/FilmCard/FilmCard";
import { Box } from "@mui/material";
import FilmCardSkeleton from "../../ui/FilmCardSkeleton/FilmCardSkeleton";

import {
  IFilmInCatalog,
  IFilters,
  IResponseFromFilmsApi,
} from "../../interfaces";

interface Props {
  filters: IFilters;
  films: IResponseFromFilmsApi | undefined;
  error: FetchBaseQueryError | SerializedError | undefined;
  isFetching: boolean;
}

const Films = memo(({ filters, films, error, isFetching }: Props) => {
  const dispatch = useDispatch();

  const handleShowMoreClick = useCallback(() => {
    dispatch(changeFilters(["page", (Number(filters.page) + 1).toString()]));
  }, [filters.page, dispatch]);

  if (error) {
    console.error(error);
  }

  return (
    <Box
      component="section"
      sx={{ display: "flex", flexWrap: "wrap", margin: "-5px" }}
    >
      {isFetching && Number(filters.page) < 2 ? (
        <FilmCardSkeleton count={16} popular={false} />
      ) : (films?.docs as [])?.length < 1 ? (
        <Box
          sx={{
            width: "100%",
            fontSize: "20px",
            textAlign: "center",
            marginTop: "50px",
          }}
        >
          Не найдено
        </Box>
      ) : (
        films?.docs.map((film: IFilmInCatalog) => {
          if (film.poster && film.poster.url && film.name) {
            return <FilmCard popular={false} film={film} key={film.id} />;
          }
        })
      )}
      {films?.pages !== Number(filters.page) &&
      !isFetching &&
      films?.docs.length ? (
        <ShowMoreButton handleShowMoreClick={handleShowMoreClick} />
      ) : null}
      {isFetching && films?.docs.length ? <LoadingIcon m="30px 0 0 0" /> : null}
    </Box>
  );
});

export default Films;
