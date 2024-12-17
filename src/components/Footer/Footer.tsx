import { useMemo } from "react";

import { Box } from "@mui/material";

const Footer = () => {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <Box
      sx={{
        textAlign: "center",
        fontSize: { xs: "20px", sm: "24px", md: "28px" },
        padding: { xs: "20px 0", sm: "25px 0" },
        fontWeight: "bold",
      }}
      component="footer"
    >
      Vilm © {year}
    </Box>
  );
};

export default Footer;
