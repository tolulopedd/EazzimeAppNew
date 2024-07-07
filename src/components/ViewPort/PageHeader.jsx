import React from "react";
import { Box, Stack, Typography } from "@mui/material";
const PageHeader = ({ title, icons }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding:"0.8rem 1rem 0.8rem 1rem",
        borderRadius: "6px",
        background:"#D92550",
        color:"#fff",
        marginBottom:"2rem"
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h5">{title || ""}</Typography>
      </Stack>
      <Stack spacing={0}></Stack>
      <Stack spacing={0} direction="row">
        {icons || ""}
      </Stack>
    </Box>
  );
};

export default PageHeader;
