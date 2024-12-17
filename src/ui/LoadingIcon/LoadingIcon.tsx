import { memo } from "react";

import { Box, SvgIcon } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

interface Props {
  m: string;
}

const LoadingIcon = memo(({ m }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        margin: m,
      }}
    >
      <SvgIcon className="loading" sx={{ fontSize: "30px" }}>
        <RestartAltIcon />
      </SvgIcon>
    </Box>
  );
});

export default LoadingIcon;
