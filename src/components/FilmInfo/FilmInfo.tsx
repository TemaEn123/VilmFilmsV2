import { memo } from "react";

import { Box } from "@mui/material";
import FilmPoster from "../../ui/FilmPoster/FilmPoster";
import FilmDetails from "../FilmDetails/FilmDetails";

import { IFilmById } from "../../interfaces";

interface Props {
  film: IFilmById;
}

const FilmInfo = memo(({ film }: Props) => {
  return (
    <Box
      component="section"
      sx={{ backgroundColor: "#181818", padding: "5px", marginBottom: "30px" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          alignItems: { xs: "center", lg: "flex-start" },
        }}
      >
        <FilmPoster
          url={film.poster.url}
          alt={film.name}
          rating={film.rating}
        />
        <FilmDetails film={film} />
      </Box>
    </Box>
  );
});

export default FilmInfo;
