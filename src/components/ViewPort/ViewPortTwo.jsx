import React from "react";
import { Box } from "@mui/material";
import LowerPart from "@/containers/LandingPageContainer/FooterSection/LowerPart";
import TopNav from "@/containers/LandingPageContainer/TopNav";

const ViewPortTwo = ({ children }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <TopNav />
      {children}
      <Box
        sx={{
          width: "100%",
          padding: "3rem",
          background:
            "linear-gradient(165deg, rgba(2,22,31,1) 4%, rgba(9,93,128,1) 49%)",
        }}
      >
        <LowerPart />
      </Box>
    </Box>
  );
};

export default ViewPortTwo;
