import { memo } from "react";

import { Link } from "react-router";

import { Box, Typography, Link as MUILink } from "@mui/material";
import FilmDetailsLinks from "../../ui/FilmDetailsLinks/FilmDetailsLinks";

import { IFilmById } from "../../interfaces";

interface Props {
  film: IFilmById;
}

const FilmDetails = memo(({ film }: Props) => {
  return (
    <Box sx={{ marginLeft: { xs: "0px", lg: "10px" }, flex: "1 1 auto" }}>
      <Box sx={{ backgroundColor: "#222" }} className="filmDetailsItem">
        <Box className="filmDetailsName">Название:</Box>
        <Box>
          <Typography
            sx={{
              fontSize: { xs: "16px", sm: "18px" },
              "&::first-letter": { color: "red", fontWeight: "normal" },
              fontWeight: "normal",
            }}
            variant="h1"
          >
            {film.name}
          </Typography>
        </Box>
      </Box>
      <Box className="filmDetailsItem">
        <Box className="filmDetailsName">Год:</Box>
        <Box>
          <MUILink
            sx={{ color: "#fff", fontSize: { xs: "14px", sm: "16px" } }}
            component={Link}
            to={`/search?year=${film.year}`}
          >
            {film.year}
          </MUILink>
        </Box>
      </Box>
      <Box sx={{ backgroundColor: "#222" }} className="filmDetailsItem">
        <Box className="filmDetailsName">Страна:</Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            lineHeight: "150%",
          }}
        >
          <FilmDetailsLinks
            items={film.countries.slice(0, 3)}
            filter="countries.name"
          />
        </Box>
      </Box>
      <Box className="filmDetailsItem">
        <Box className="filmDetailsName">Жанр:</Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            lineHeight: "150%",
          }}
        >
          <FilmDetailsLinks
            items={film.genres.slice(0, 3)}
            filter="genres.name"
          />
        </Box>
      </Box>
      <Box sx={{ backgroundColor: "#222" }} className="filmDetailsItem">
        <Box className="filmDetailsName">Время:</Box>
        <Box>
          {film.seriesLength ? film.seriesLength : film.movieLength} мин.
        </Box>
      </Box>
      <Box className="filmDetailsItem">
        <Box className="filmDetailsName">В ролях:</Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            lineHeight: "150%",
          }}
        >
          <FilmDetailsLinks
            items={film.persons.slice(0, 5)}
            filter="persons.id"
          />
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "#222",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
        className="filmDetailsItem"
      >
        <Box sx={{ marginBottom: "10px" }} className="filmDetailsName">
          Описание:
        </Box>
        <Box>
          <Typography
            sx={{ fontSize: { xs: "12px", sm: "14px" } }}
            component="p"
          >
            {film.description ? film.description : film.shortDescription}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
});

export default FilmDetails;
