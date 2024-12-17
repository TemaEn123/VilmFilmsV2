import { memo } from "react";

import { Box } from "@mui/material";
import LoadingIcon from "../LoadingIcon/LoadingIcon";

interface Props {
  isLoading: boolean;
}

const VideoplayerSkeleton = memo(({ isLoading }: Props) => {
  return (
    <Box
      className="videooplayerSkeleton"
      sx={{
        background: "#272727",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isLoading ? (
        <LoadingIcon m="0px" />
      ) : (
        <Box component="span" sx={{ fontSize: "20px" }}>
          Фильм не найден :(
        </Box>
      )}
    </Box>
  );
});

export default VideoplayerSkeleton;
