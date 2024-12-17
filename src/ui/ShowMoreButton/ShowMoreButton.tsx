import { Box, Button } from "@mui/material";
import { memo } from "react";

interface Props {
  handleShowMoreClick: () => void;
}

const ShowMoreButton = memo(({ handleShowMoreClick }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        marginTop: "30px",
      }}
    >
      <Button
        onClick={handleShowMoreClick}
        sx={{ padding: "10px 20px" }}
        variant="contained"
      >
        Показать ещё
      </Button>
    </Box>
  );
});

export default ShowMoreButton;
