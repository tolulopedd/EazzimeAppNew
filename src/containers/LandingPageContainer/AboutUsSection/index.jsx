"use client";
import React from "react";
import Image from "next/image";
import AboutUsImg from "@/assets/about-img.png";
import { Box, Grid, Stack, Typography, useMediaQuery } from "@mui/material";

const AboutUsSection = () => {
  const matches = useMediaQuery(`(max-width:1120px)`);
  const matchesTwo = useMediaQuery(`(max-width:700px)`);
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "flex-start",
        padding: "3rem",
      }}
    >
      <Box
        sx={{
          width: {lg:"55%", md:"55%", sm:"40%"},
          display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
          justifyContent: { lg: "center", md: "center", sm: "flex-start" },
          marginTop: { lg: "-10rem", md: "-3rem", sm: "-4rem" },
        }}
      >
        <Image
          src={AboutUsImg}
          alt="About Us"
          width={matches ? 350 : matchesTwo ? 380 : 650}
          height={matches ? 250 : matchesTwo ? 230 : 500}
        />
      </Box>
      <Box
        sx={{
          width: { lg: "45%", md: "45%", sm: "100%", xs: "100%" },
          display: { xs: "flex" },
          justifyContent: { xs: "center" },
        }}
      >
        <Stack>
        <Typography
          sx={{
            textTransform: "uppercase",
            color: "buttonColor.main",
            fontSize: { lg: "1.25em", md: "1em", sm: "1em", xs: "1em" },
            fontWeight: "600",
            padding: "0 0 1.5rem 0",
            textAlign: {lg:"left", md:"left", sm:"center", xs:"center"},
          }}
        >
          About Eazzime
        </Typography>
        <Typography
          sx={{
            width: { lg: "91%", md: "100%", sm: "100%", xs: "100%" },
            fontSize: { lg: "1em", md: "0.8em", sm: "0.7em", xs: "0.7em" },
            textAlign: "justify",
          }}
        >
          EazziMe is a software solution that provides early access wage, also
          referred to as earned wage access or wage advance. This enables
          employees to receive a portion of their earned wages before the
          regular payday, typically facilitated through technology platforms.
          This arrangement offers relief for employees facing unexpected
          expenses and aims to reduce reliance on high-interest loans
        </Typography>

        </Stack>
      </Box>
    </Box>
  );
};

export default AboutUsSection;
