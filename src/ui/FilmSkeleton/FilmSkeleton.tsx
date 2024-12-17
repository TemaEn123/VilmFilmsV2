import { Box } from "@mui/material";

const FilmSkeleton = () => {
  return (
    <>
      <Box
        sx={{
          margin: "10px 0",
          width: "100%",
          height: { xs: "800px", sm: "900px", lg: "520px" },
          background: "#272727",
        }}
      ></Box>
    </>
  );
};

export default FilmSkeleton;
