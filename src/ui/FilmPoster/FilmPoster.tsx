import { memo } from "react";

import { Box } from "@mui/material";

interface Props {
  url: string;
  alt: string;
  rating: { kp: number; imdb: number };
}

const FilmPoster = memo(({ url, alt, rating }: Props) => {
  return (
    <Box
      sx={{
        position: "relative",
        flex: "1 0 30%",
        paddingBottom: "45%",
        minWidth: { xs: "290px", sm: "350px" },
        minHeight: { xs: "420px", sm: "520px" },
        marginBottom: { xs: "10px", lg: "0px" },
      }}
    >
      <img className="poster" src={url} alt={`${alt} poster`} />
      <Box sx={{ position: "absolute", bottom: "20px" }}>
        <Box
          className="ratingItem"
          sx={{ background: "#f60", marginBottom: "10px" }}
        >
          КП: {rating.kp.toFixed(1)}
        </Box>
        <Box className="ratingItem" sx={{ background: "#fc0" }}>
          IMDB: {rating.imdb.toFixed(1)}
        </Box>
      </Box>
    </Box>
  );
});

export default FilmPoster;
