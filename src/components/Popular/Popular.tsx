import { useGetPopularFilmsQuery } from "../../redux/services/filmsApi";

import { Box } from "@mui/material";
import Slider from "../../ui/Slider/Slider";
import FilmCardSkeleton from "../../ui/FilmCardSkeleton/FilmCardSkeleton";

const Popular = () => {
  const { data: films, error, isLoading } = useGetPopularFilmsQuery(null);

  if (error) {
    console.error(error);
  }

  return (
    <Box
      component="section"
      sx={{ marginBottom: "10px", cursor: "grab", overflow: "hidden" }}
    >
      {isLoading ? (
        <>
          <Box sx={{ display: "flex" }}>
            <FilmCardSkeleton count={6} popular />
          </Box>
        </>
      ) : (
        films?.docs && <Slider films={films!.docs} />
      )}
    </Box>
  );
};

export default Popular;
