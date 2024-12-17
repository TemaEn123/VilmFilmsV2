import { Params, useParams } from "react-router";

import { useGetFilmByIdQuery } from "../../redux/services/filmsApi";

import FilmInfo from "../../components/FilmInfo/FilmInfo";
import Popular from "../../components/Popular/Popular";
import Slider from "../../ui/Slider/Slider";
import { Box } from "@mui/material";
import FilmCardSkeleton from "../../ui/FilmCardSkeleton/FilmCardSkeleton";
import FilmSkeleton from "../../ui/FilmSkeleton/FilmSkeleton";
import Videoplayer from "../../components/Videoplayer/Videoplayer";

const Film = () => {
  const params: Readonly<Params<string>> = useParams();

  const {
    data: film,
    error,
    isLoading,
  } = useGetFilmByIdQuery(params.filmId as string);

  if (error) {
    throw new Error("404");
  }

  return (
    <>
      {isLoading ? (
        <>
          <Popular />
          <FilmSkeleton />
          <Videoplayer />
          <Box sx={{ display: "flex" }}>
            <FilmCardSkeleton count={6} popular />
          </Box>
          <Box sx={{ display: "flex" }}>
            <FilmCardSkeleton count={6} popular />
          </Box>
        </>
      ) : (
        <>
          <Popular />
          <FilmInfo film={film!} />
          <Videoplayer />
          {!!film?.similarMovies?.length && (
            <Slider name="Похожие фильмы: " films={film!.similarMovies} />
          )}
          {!!film?.sequelsAndPrequels?.length && (
            <Slider
              name="Сиквелы и приквелы: "
              films={film!.sequelsAndPrequels}
            />
          )}
        </>
      )}
    </>
  );
};

export default Film;
