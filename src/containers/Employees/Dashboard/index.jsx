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

const Dashboard = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userLoginDetails?.details);

  const updateDashboardStatus = useSelector(
    (state) => state.dashUpdateDetails.status
  );
  const updateDashboardRes = useSelector(
    (state) => state.dashUpdateDetails.details
  );
  const getUserInfoRes = useSelector(
    (state) => state.loggedInUserDetails.details
  );
  const dashboardInfoStatus = useSelector(
    (state) => state.getUserDashboardInfo.status
  );
  const dashboardInfoRes = useSelector(
    (state) => state.getUserDashboardInfo.details
  );

  useEffect(() => {
    if (updateDashboardStatus === "loading") {
      dispatch(openLoader());
    } else {
      dispatch(closeLoader());
      if (updateDashboardStatus === "success") {
        console.log("success");
      } else {
        console.log("failed");
      }
    }
  }, [updateDashboardStatus]);

  useEffect(() => {
    if (dashboardInfoStatus === "loading") {
      dispatch(openLoader());
    } else {
      dispatch(closeLoader());
      if (dashboardInfoStatus === "success") {
        console.log("success");
      } else {
        console.log("failed");
      }
    }
  }, [dashboardInfoStatus]);

  useEffect(() => {
    if (getUserInfoRes?.userDetails?.accountid !== "") {
      const payloadOne = {
        token: userData?.token,
        accountid: getUserInfoRes?.userDetails?.accountid,
      };
      dispatch(updateDashboardData(payloadOne));
      // dispatch(fetchUserDashboardInfo(payloadOne));
    }
  }, [userData, getUserInfoRes]);

  useEffect(() => {
    if (getUserInfoRes?.userDetails?.accountid !== "") {
      const payloadTwo = {
        token: userData.token,
        accountId: getUserInfoRes?.userDetails?.accountid,
      };
      dispatch(fetchUserDashboardInfo(payloadTwo));
    }
  }, [userData, getUserInfoRes]);


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
          availableBal={dashboardInfoRes?.detailAccount[0]?.available_balance}
          utitilizedBal={dashboardInfoRes?.detailAccount[0]?.utilized_balance}
          repayableBal={dashboardInfoRes?.detailAccount[0]?.repaid_balance}
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
