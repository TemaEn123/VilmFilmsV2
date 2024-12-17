import { memo } from "react";

import { ToggleButton } from "@mui/material";

interface Props {
  text: string;
  throttle: boolean;
}

const CategoryButton = memo(({ text, throttle }: Props) => {
  return (
    <ToggleButton
      disabled={throttle}
      sx={{
        color: "#fff",
        background: "#272727",
        borderRadius: "0px",
        flex: "1 1 14%",
        padding: "7px",
        border: "none !important",
        transition: "all 0.2s ease 0s",
        marginLeft: "0 !important",
        "&:disabled": {
          color: "#fff",
          opacity: 0.5,
        },
      }}
      value={text}
    >
      {text}
    </ToggleButton>
  );
});

export default CategoryButton;
