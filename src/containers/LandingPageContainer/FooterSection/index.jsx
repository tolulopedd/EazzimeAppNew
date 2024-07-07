import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import UpperPart from "./UpperPart";
import LowerPart from "./LowerPart";

const index = () => {
  return (
    <Box
      sx={{
        width: "100%",
        padding: { lg: "3rem", md: "3rem", sm: "1rem", xs: "1rem" },
        background:
          "linear-gradient(165deg, rgba(2,22,31,1) 4%, rgba(9,93,128,1) 49%)",
      }}
    >
      <UpperPart />
      <LowerPart />
    </Box>
  );
};

export default index;
