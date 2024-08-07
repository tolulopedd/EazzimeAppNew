"use client";
import React, { useEffect, useState } from "react";
import { Box, Grid, MenuItem, TextField } from "@mui/material";
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

const Dashboard = () => {
  const { userData, userDetails } = useAuth();
  const { displayLoader, hideLoader } = useLoader();
  const [isClient, setIsClient] = useState(false);
  const [dashData, setDashData] = useState({});

  useEffect(() => {
    setIsClient(true);
  }, []);

  const dashboardUpdate = async () => {
    const payload = {
      accountid: userDetails?.accountid
    }
    try {
      displayLoader();
      const dashUpdateRes = await dashboardUpdateDetails(payload);
      console.log("dashUpdateRes", dashUpdateRes?.data)
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
        setDashData(dashRes?.data.detailAccount?.[0])
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
          display: "flex",
          justifyContent: "flex-end",
          paddingBottom: "2rem",
        }}
      >
        <TextField
          select
          size="small"
          placeholder="Select frequency"
          sx={{
            width: { lg: "20%", md: "20%", sm: "50%", xs: "50%" },
            padding: "0.5rem",
            borderRadius: "5px",
          }}
        >
          <MenuItem>daily</MenuItem>
          <MenuItem>weekly</MenuItem>
          <MenuItem>monthly</MenuItem>
        </TextField>
      </Box>
      <Box sx={{ width: "100%", padding: "0 0 2rem 0" }}>
        <Cards
          availableBal={dashData?.available_balance}
          utitilizedBal={dashData?.utilized_balance}
          repayableBal={dashData?.repaid_balance}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
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
