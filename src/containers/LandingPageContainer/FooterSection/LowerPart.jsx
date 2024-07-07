import React from "react";
import Image from "next/image";
import EazziCashLogo from "@/assets/eazzime-footer-logo.png";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { MdOutlineCopyright } from "react-icons/md";

const LowerPart = () => {
  return (
    <Box
      sx={{
        width: "100%",
        padding: { lg: "3rem", md: "3rem", sm: "1rem", xs: "1rem" },
      }}
    >
      <Stack>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Image
              src={EazziCashLogo}
              alt="Eazzi Cash Logo"
              width={150}
              height={75}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={3}
          sx={{
            display: "flex",
            alignItems: "flex-start",
            // justifyContent: "space-between",
          }}
        >
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Typography
              sx={{
                fontSize: "0.8em",
                color: "#fff",
                padding: "1rem 0 0 0",
                width: { lg: "55%", md: "55%", sm: "90%", xs: "90%" },
              }}
            >
              EazziMe was developed as a platform where employees gain early
              access to their wages. Consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2}>
            <Typography
              sx={{
                color: "#fff",
                fontSize: "1em",
                fontWeight: "600",
                padding: "0 0 1rem 0",
              }}
            >
              Solutions
            </Typography>
            <Typography
              sx={{ color: "#fff", fontSize: "0.8em", padding: "0 0 0.5rem 0" }}
            >
              Employees
            </Typography>
            <Typography
              sx={{ color: "#fff", fontSize: "0.8em", padding: "0 0 0.5rem 0" }}
            >
              Employers
            </Typography>
            <Typography
              sx={{ color: "#fff", fontSize: "0.8em", padding: "0 0 0.5rem 0" }}
            >
              Partners
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2}>
            <Typography
              sx={{
                color: "#fff",
                fontSize: "1em",
                fontWeight: "600",
                padding: "0 0 1rem 0",
              }}
            >
              About Us
            </Typography>
            <Typography
              sx={{ color: "#fff", fontSize: "0.8em", padding: "0 0 0.5rem 0" }}
            >
              Our Story
            </Typography>
            <Typography
              sx={{ color: "#fff", fontSize: "0.8em", padding: "0 0 0.5rem 0" }}
            >
              Contact Us
            </Typography>
            <Typography
              sx={{ color: "#fff", fontSize: "0.8em", padding: "0 0 0.5rem 0" }}
            >
              Updates
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2}>
            <Typography
              sx={{
                color: "#fff",
                fontSize: "1em",
                fontWeight: "600",
                padding: "0 0 1rem 0",
              }}
            >
              Support
            </Typography>
            <Typography
              sx={{ color: "#fff", fontSize: "0.8em", padding: "0 0 0.5rem 0" }}
            >
              Chat Our Support Team
            </Typography>
            <Typography
              sx={{ color: "#fff", fontSize: "0.8em", padding: "0 0 0.5rem 0" }}
            >
              Frequently Asked Questions
            </Typography>
            <Typography
              sx={{ color: "#fff", fontSize: "0.8em", padding: "0 0 0.5rem 0" }}
            >
              Updates
            </Typography>
          </Grid>
        </Grid>
      </Stack>
      <Grid
        container
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "3rem 0 0 0",
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid sx={{ margin: "0 0.5rem 0 0" }}>
            <MdOutlineCopyright size={12} color="#fff" />
          </Grid>
          <Grid>
            <Typography
              sx={{ fontSize: "0.6em", fontWeight: "700", color: "#fff" }}
            >
              Eazzime 2024
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LowerPart;
