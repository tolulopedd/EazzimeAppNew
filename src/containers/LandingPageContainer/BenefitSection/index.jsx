"use client";
import React from "react";
import Image from "next/image";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import BenefitIcon from "@/assets/benefits-of-eaw-icon.png";
import FinancialFlex from "@/assets/financial-flex-img.png";
import IncreaseProd from "@/assets/increase-prod-img.png";
import EmployeeRetention from "@/assets/employee-retention-img.png";
import AttractTopTalent from "@/assets/attract-top-talent-img.png";
import BenefitLady from "@/assets/beaw-img.png";

const Benefits = () => {
  const matches = useMediaQuery(`(max-width:1120px)`);
  const matchesTwo = useMediaQuery(`(max-width:700px)`);
  return (
    <Box sx={{ width: "100%", padding: "3rem" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Grid sx={{ margin: "0 2rem 0 0" }}>
            <Image
              src={BenefitIcon}
              alt="benefit-icon"
              width={50}
              height={50}
            />
          </Grid>
          <Grid>
            <Typography
              sx={{
                fontSize: { lg: "1.5em", md: "1.2em", sm: "1em", xs: "1em" },
                fontWeight: "600",
              }}
            >
              Benefits of EazziMe
            </Typography>
          </Grid>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          padding: "3rem",
        }}
      >
        <Box
          sx={{
            width: { lg: "50%", md: "50%", sm: "100%", xs: "100%" },
            display: "flex",
            justifyContent: {
              lg: "flex-end",
              md: "flex-end",
              sm: "center",
              xs: "center",
            },
          }}
        >
          <Grid container sx={{ width: "100%" }}>
            <Grid
              container
              sx={{
                width: "100%",
                padding: "0 0 2rem 0",
                display: "flex",
                justifyContent: { sm: "center", xs: "center" },
              }}
            >
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                sx={{
                  display: "flex",
                  justifyContent: { sm: "center", xs: "center" },
                  paddingBottom: { sm: "1.5rem", xs: "1.5rem" },
                }}
              >
                <Image
                  src={FinancialFlex}
                  alt="financial-flexibility"
                  width={matches ? 200 : matchesTwo ? 180 : 270}
                  height={matches ? 180 : matchesTwo ? 160 : 250}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                sx={{
                  display: "flex",
                  justifyContent: { sm: "center", xs: "center" },
                  paddingBottom: { sm: "1.5rem", xs: "1.5rem" },
                }}
              >
                <Image
                  src={IncreaseProd}
                  alt="increase-productivity"
                  width={matches ? 200 : matchesTwo ? 180 : 270}
                  height={matches ? 180 : matchesTwo ? 160 : 250}
                />
              </Grid>
            </Grid>
            <Grid container sx={{ width: "100%" }}>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                sx={{
                  display: "flex",
                  justifyContent: { sm: "center", xs: "center" },
                  paddingBottom: { sm: "1.5rem", xs: "1.5rem" },
                }}
              >
                <Image
                  src={EmployeeRetention}
                  alt="employee-retention"
                  width={matches ? 200 : matchesTwo ? 180 : 270}
                  height={matches ? 180 : matchesTwo ? 160 : 250}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                sx={{
                  display: "flex",
                  justifyContent: { sm: "center", xs: "center" },
                  paddingBottom: { sm: "1.5rem", xs: "1.5rem" },
                }}
              >
                <Image
                  src={AttractTopTalent}
                  alt="attract-top-talent"
                  width={matches ? 200 : matchesTwo ? 180 : 270}
                  height={matches ? 180 : matchesTwo ? 160 : 250}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            width: "50%",
            display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
            justifyContent: "flex-end",
          }}
        >
          <Image
            src={BenefitLady}
            alt="benefit-lady"
            width={matches ? 350 : matchesTwo ? 380 : 500}
            height={matches ? 350 : matchesTwo ? 230 : 500}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Benefits;
