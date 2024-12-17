import { Box } from "@mui/material";

import { memo } from "react";

interface Props {
  count: number;
  popular: boolean;
}

const FilmCardSkeleton = memo(({ count, popular }: Props) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <Box
          key={i}
          sx={{
            padding: "5px",
            flex: popular
              ? { md: "0 0 16.666%", sm: "0 0 26.3333%", xs: "0 0 45.5555%" }
              : { md: "0 1 25%", sm: "0 1 33.3333%", xs: "0 1 50%" },
          }}
        >
          <Box
            sx={{
              background: "#272727",
              paddingBottom: "150%",
            }}
          ></Box>
        </Box>
      ))}
    </>
  );
});

export default FilmCardSkeleton;
