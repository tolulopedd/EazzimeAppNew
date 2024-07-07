import React from "react";
import Image from "next/image";
import { Box, Grid, Typography } from "@mui/material";
import InstiqLogo from "@/assets/instiq-logo.png";
import ForgreenLogo from "@/assets/Forgreen-logo.png";
import EazziCashLogo from "@/assets/eazzicash-img.png";

const Partners = () => {
  return (
    <Box
      sx={{
        background: "#B9B9B9",
        width: "100%",
        padding: "3rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          padding: "1rem 0 2rem 0",
        }}
      >
        <Typography
          sx={{
            fontSize: { lg: "1.5em", md: "1em", sm: "1em", xs: "1em" },
            fontWeight: "550",
            textAlign: "center",
          }}
        >
          The workforce within these companies relies on our trustworthiness
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          padding: "1rem 0 1rem 0",
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Grid
            item
            xs={12}
            sm={3}
            md={3}
            lg={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: { xs: "1rem" },
            }}
          >
            <Image src={InstiqLogo} alt="instiq-logo" width={80} height={30} />
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            md={3}
            lg={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: { xs: "1rem" },
            }}
          >
            <Image
              src={ForgreenLogo}
              alt="forgreen-logo"
              width={80}
              height={30}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            md={3}
            lg={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: { xs: "1rem" },
            }}
          >
            <Image
              src={EazziCashLogo}
              alt="eazzicash-logo"
              width={80}
              height={30}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Partners;
