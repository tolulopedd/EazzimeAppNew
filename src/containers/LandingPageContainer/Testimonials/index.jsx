"use client";
import React from "react";
import Image from "next/image";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  useMediaQuery,
  Stack,
} from "@mui/material";
import HappyMan from "@/assets/testimonies-img.png";
import TestimonyIcon from "@/assets/testimony-icon.png";
import TestimonyCard from "@/assets/testimony-card-img.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import TestimonialsCard from "./TestimonialsCard";

const Testimonials = () => {
  const matches = useMediaQuery(`(max-width:1120px)`);
  const matchesTwo = useMediaQuery(`(max-width:700px)`);
  return (
    <Box
      sx={{
        width: "100%",
        background: "#E8F2F6",
        padding: { lg: "3rem", md: "2rem", sm: "2rem" },
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: { lg: "flex-start", md: "center", sm: "center" },
          padding: "2rem 0 0 0",
        }}
      >
        <Box
          sx={{
            width: { lg: "50%", md: "40%", sm: "30%" },
            display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
            justifyContent: {
              lg: "center",
              md: "center",
              sm: "flex-start",
            },
          }}
        >
          <Image
            src={HappyMan}
            alt="happy-man-testifies"
            width={matches ? 350 : matchesTwo ? 380 : 470}
            height={matches ? 400 : matchesTwo ? 230 : 550}
          />
        </Box>
        <Stack
          sx={{
            width: { lg: "50%", md: "55%", sm: "100%", xs: "100%" },
            display: "flex",
            justifyContent: {
              lg: "flex-end",
              md: "flex-end",
              sm: "center",
              xs: "center",
            },
            alignItems: { sm: "center", xs: "center" },
            marginLeft: { md: "2rem", sm: "0rem" },
          }}
        >
          <Box
            sx={{
              width: { lg: "100%", md: "80%", sm: "100%", xs: "100%" },
              display: "flex",
              alignItems: "center",
              justifyContent: {
                lg: "flex-start",
                md: "flex-start",
                sm: "center",
                xs: "center",
              },
              padding: "0 0 2rem 0",
            }}
          >
            <Grid sx={{ margin: "0 2rem 0 0" }}>
              <Image
                src={TestimonyIcon}
                alt="testimony-icon"
                width={50}
                height={50}
              />
            </Grid>
            <Grid
              sx={{
                display: "flex",
                justifyContent: { sm: "center", xs: "center", md: "center" },
              }}
            >
              <Typography
                sx={{
                  fontSize: { lg: "1.5em", md: "1.2em", sm: "1em", xs: "1em" },
                  fontWeight: "600",
                  padding: "0 0 1rem 0",
                  textAlign: { sm: "center", xs: "center" },
                }}
              >
                Testimonials About Us
              </Typography>
            </Grid>
          </Box>
          <Box
            sx={{
              width: "100%",
              justifyContent: {
                lg: "flex-start",
                md: "center",
                sm: "center",
                xs: "center",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: "1em",
                padding: "1rem",
                textAlign: {
                  lg: "left",
                  md: "left",
                  sm: "center",
                  xs: "center",
                },
                width: { lg: "70%", md: "100%", sm: "100%", xs: "100%" },
              }}
            >
              In the smallest case, we always do our best. Find out what other
              employees have to say about us:
            </Typography>
          </Box>

          <Box
            sx={{
              width: { lg: "100%", md: "100%", sm: "80%", xs: "80%" },
              padding: "2rem 0 1rem 0",
              // marginLeft: { sm: "1rem", xs: "1rem" },
            }}
          >
            <TestimonialsCard />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Testimonials;
