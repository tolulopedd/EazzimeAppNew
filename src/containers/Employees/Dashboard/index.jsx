"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Cards from "./Cards";
import Chart from "./Chart";
import Calendar from "./Calendar";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserDashboardInfo } from "@/lib/features/dasbhoardSlices.js/getuserdashboardinfoSlice";
import {
  openLoader,
  closeLoader,
} from "@/lib/features/loaderSlice/loaderSlice";
import { updateDashboardData } from "@/lib/features/dasbhoardSlices.js/updatedashboardSlice";
import { useAuth, useLoader } from "@/hooks";
import { dashboardUpdateDetails, fetchDashboardDetails } from "@/api";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { userData, userDetails } = useAuth();
  const route = useRouter();
  const { displayLoader, hideLoader } = useLoader();
  const [isClient, setIsClient] = useState(false);
  const [dashData, setDashData] = useState({});

  useEffect(() => {
    setIsClient(true);
  }, []);

  const dashboardUpdate = async () => {
    const payload = {
      accountid: userDetails?.accountid,
    };
    try {
      displayLoader();
      const dashUpdateRes = await dashboardUpdateDetails(payload);
      console.log("dashUpdateRes", dashUpdateRes?.data.status);
    } catch (err) {
      console.log(err);
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        displayLoader();
        const dashRes = await fetchDashboardDetails(userDetails?.accountid);
        setDashData(dashRes?.data.detailAccount?.[0]);
      } catch (err) {
        console.log(err);
      } finally {
        hideLoader();
      }
    };
    dashboardUpdate();
    getDashboardData();
  }, [userDetails]);

  if (!isClient) {
    return null;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          // display: "flex",
          // flexDirection: "column",
          // justifyContent: "flex-end",
          // alignItems: "flex-start",
          // paddingBottom: "2rem",
          padding: {
            sm: "2rem",
            xs: "2rem",
            md: "0 0 2rem 0",
            lg: "0 0 2rem 0",
          },
        }}
      >
        <Grid container sx={{ display: "flex", alignItems: "center" }}>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              paddingBottom: { sm: "1rem", xs: "1rem", md: "0", lg: "0" },
            }}
          >
            <Button
              sx={{
                backgroundColor: "#35CB62",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#35CB62",
                },
              }}
              onClick={() => route.push("/employee/request-fund")}
            >
              Request for fund
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: {
                lg: "flex-end",
                md: "flex-end",
                sm: "flex-start",
                xs: "flex-start",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: "0.8em",
                fontWeight: "500",
                margin: {
                  lg: "0 0.5rem 0 0",
                  md: "0 0.5rem 0 0",
                  sm: "0 0 0 0.5rem",
                  xs: "0 0 0 0.5rem",
                },
                textAlign: "right",
              }}
            >
              Select Frequency
            </Typography>
            <TextField
              select
              size="small"
              placeholder="Select frequency"
              sx={{
                width: { lg: "40%", md: "40%", sm: "50%", xs: "50%" },
                padding: "0.5rem",
                borderRadius: "5px",
              }}
            >
              <MenuItem>daily</MenuItem>
              <MenuItem>weekly</MenuItem>
              <MenuItem>monthly</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          width: "100%",
          // padding: "0 0 2rem 0",
          padding: {
            sm: "2rem",
            xs: "2rem",
            md: "0 0 2rem 0",
            lg: "0 0 2rem 0",
          },
        }}
      >
        <Cards
          availableBal={dashData?.available_balance}
          utitilizedBal={dashData?.utilized_balance}
          repayableBal={dashData?.repaid_balance}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          padding: { sm: "2rem", xs: "2rem", md: "0", lg: "0" },
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Chart />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Calendar />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
