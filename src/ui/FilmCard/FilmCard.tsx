import { memo } from "react";

import { Box, Link as MUILink, Typography } from "@mui/material";

import { IFilmInCatalog, IPopularFilm } from "../../interfaces";

interface Props {
  film: IFilmInCatalog | IPopularFilm;
  popular: boolean;
}

const FilmCard = memo(({ film, popular }: Props) => {
  return (
    <Box
      sx={{
        flex: { md: "0 1 25%", sm: "0 1 33.3333%", xs: "0 1 50%" },
        padding: "5px",
      }}
    >
      <Box
        sx={{ padding: { sm: "10px", xs: "5px" }, backgroundColor: "#1d1d1c" }}
      >
        <MUILink
          href={`/movie/${film.id}`}
          sx={{
            marginBottom: "10px",
            display: "block",
            position: "relative",
            background: "#000",
            paddingBottom: "150%",
          }}
        >
          <img className="poster" src={film.poster.url} alt="постер" />
        </MUILink>
        <MUILink
          href={`/movie/${film.id}`}
          sx={{
            textDecoration: "none",
            display: "block",
            marginBottom: !popular ? "10px" : "0px",
          }}
        >
          <Typography
            component="h3"
            sx={{
              color: "#fff",
              textAlign: "center",
              fontSize: !popular ? "14px" : "12px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "1",
              WebkitBoxOrient: "vertical",
              transition: "all 0.3s ease 0s",
              "&:hover": {
                opacity: "0.7",
              },
            }}
          >
            {film.name}
          </Typography>
        </MUILink>
        {!popular ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "16px",
            }}
          >
            <Box>
              <Typography
                component="span"
                sx={{ color: "#ffa500", fontSize: "16px", marginRight: "5px" }}
              >
                КП
              </Typography>
              {(film as IFilmInCatalog).rating.kp}
            </Box>
            <Typography
              component="span"
              sx={{ color: "#cb0000", fontSize: "16px", fontWeight: "700" }}
            >
              {(film as IFilmInCatalog).year}
            </Typography>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
});

export default FilmCard;
