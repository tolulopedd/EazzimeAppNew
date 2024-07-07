"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import HeroBg from "@/assets/herosection-bg.png";
import HeroImg from "@/assets/hero-img.png";

const HeroSection = () => {
  const matches = useMediaQuery(`(max-width:1120px)`);
  const matchesTwo = useMediaQuery(`(max-width:700px)`);
  return (
    <Box
      sx={{
        padding: "2rem",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        backgroundImage: `url(${HeroBg.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100vw 90vh",
        // backgroundAttachment: "fixed",
      }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          // justifyContent: "center",
          alignItems: "center",
          width: "100%",
          padding: { lg: "3rem", md: "1rem" },
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          sx={{
            display: { sm: "flex", xs: "flex" },
            flexDirection: { sm: "column", xs: "column" },
            justifyContent: { sm: "center", xs: "center" },
            // alignItems: { sm: "center", xs: "center" },
          }}
        >
          <Grid
            sx={{
              padding: { lg: "0.5rem 0 1.5rem 0" },
              display: { sm: "flex", xs: "flex" },
              flexDirection: {
                sm: "column",
                xs: "column",
              },
              justifyContent: { sm: "center", xs: "center" },
              alignItems: { sm: "center", xs: "center" },
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontSize: {
                  lg: "2.5em",
                  md: "1.5em",
                  sm: "1em",
                  xs: "1em",
                },
                padding: { lg: "0 0 1.5rem 0" },
                width: { lg: "100%", md: "100%", sm: "100%", xs: "100%" },
                fontWeight: "600",
                textAlign: {
                  sm: "center",
                  xs: "center",
                  md: "left",
                  lg: "left",
                },
              }}
            >
              Supporting Businesses,{" "}
              <span style={{ color: "#42E673" }}>Financially Empowering</span>{" "}
              Employees
            </Typography>
            <Typography
              sx={{
                fontSize: { lg: "0.9em", md: "0.7em", sm: "0.6em", xs:"0.6em" },
                color: "#fff",
                width: { lg: "100%", md: "100%", sm: "85%", xs: "85%" },
                textAlign: {
                  sm: "center",
                  xs: "center",
                  md: "left",
                  lg: "left",
                },
                padding: "1rem 0 0 0",
              }}
            >
              This is a platform that fuels employees financial confidence by
              making fund available to them. It eliminates the elongated
              processes, high interest rates involved in securing a loan
              guarantees fast access to cash.
            </Typography>
          </Grid>
          <Grid
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: {
                md: "flex-start",
                sm: "center",
                xs: "center",
                lg: "flex-start",
              },
              alignItems: {
                md: "flex-start",
                sm: "center",
                xs: "center",
                lg: "flex-start",
              },
              padding: {
                sm: "2rem 0 0 0",
                xs: "2rem 0 0 0",
              },
            }}
          >
            <Link href="#get-in-touch" passHref>
              <Button
                sx={{
                  color: "#fff",
                  fontWeight: "600",
                  backgroundColor: "buttonColor.main",
                  fontSize: "0.8em",
                  padding: "0.5rem",
                  "&:hover": {
                    backgroundColor: "buttonColor.main",
                  },
                }}
              >
                Request for a demo
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          sx={{
            display: { lg: "flex", md: "flex", sm: "flex", xs: "none" },
            justifyContent: {
              lg: "flex-end",
              md: "flex-end",
              sm: "center",
              xs: "center",
            },
            padding: { sm: "2rem 0 0 0", xs: "2rem 0 0 0" },
            margin: { lg: "-5rem 0 0 0" },
          }}
        >
          <Image
            src={HeroImg}
            alt="hero-image"
            width={matches ? 350 : matchesTwo ? 380 : 650}
            height={matches ? 250 : matchesTwo ? 230 : 500}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeroSection;
