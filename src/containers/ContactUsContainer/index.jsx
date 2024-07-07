import React from "react";
import { Box} from "@mui/material";
import UpperPart from "../LandingPageContainer/FooterSection/UpperPart";

const ContactUsContainer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        padding:"3rem",
        background:
          "linear-gradient(165deg, rgba(2,22,31,1) 4%, rgba(9,93,128,1) 49%)",
      }}
    >
      <UpperPart />
    </Box>
  );
};

export default ContactUsContainer;
