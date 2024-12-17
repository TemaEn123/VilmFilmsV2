import { Box, Link as MUILink, Typography } from "@mui/material";

import { IFilmInCatalog } from "../../interfaces";
import { memo } from "react";

interface Props {
  film: IFilmInCatalog;
}

const SearchFilm = memo(({ film }: Props) => {
  return (
    <Box>
      <MUILink
        href={`/movie/${film.id}`}
        sx={{
          display: "flex",
          textDecoration: "none",
          padding: "5px",
          transition: "all 0.3s ease 0s",
          "&:hover": {
            backgroundColor: "#212121",
          },
        }}
      >
        <Box
          sx={{
            display: "block",
            position: "relative",
            background: "#000",
            minHeight: { xs: "105px", md: "150px" },
            maxWidth: { xs: "80px", md: "100px" },
            width: "100%",
            marginRight: "10px",
          }}
        >
          <img className="poster" src={film.poster.url} alt="постер" />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "left",
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontSize: { xs: "14px", md: "16px" },
            }}
            variant="h3"
          >
            {film.name}
          </Typography>
          <Typography
            sx={{
              color: "#fff",
              fontSize: { xs: "10px", md: "12px" },
              marginTop: "5px",
            }}
            component="span"
          >
            {film.year}
          </Typography>
        </Box>
      </MUILink>
    </Box>
  );
});

export default SearchFilm;
