"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Cards from "./Cards";
import Chart from "./Chart";
import Calendar from "./Calendar";
import { useDispatch, useSelector } from "react-redux";
import { fetchPartnerDashboardInfo } from "@/lib/features/dasbhoardSlices.js/getpartnerdashboardinfoSlice";
import {
  closeLoader,
  openLoader,
} from "@/lib/features/loaderSlice/loaderSlice";

const Dashboard = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userLoginDetails?.details);

  const getUserInfoRes = useSelector(
    (state) => state.loggedInUserDetails.details
  );
  const dashboardInfoStatus = useSelector(
    (state) => state.getPartnerDashboardInfoDetails.status
  );
  const dashboardInfoRes = useSelector(
    (state) => state.getPartnerDashboardInfoDetails.details
  );

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
      const payloadTwo = {
        token: userData.token,
        userId: getUserInfoRes?.userDetails?.userid,
      };
      dispatch(fetchPartnerDashboardInfo(payloadTwo));
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
        <select
          style={{ width: "20%", padding: "0.5rem", borderRadius: "5px" }}
        >
          <option>daily</option>
          <option>weekly</option>
          <option>monthly</option>
        </select>
      </Box>
      <Box sx={{ width: "100%", padding: "0 0 2rem 0" }}>
        <Cards
          totalemployee={
            dashboardInfoRes?.employerDashboardMetrics?.[0]?.totalemployee
          }
          noofactiveemployees={
            dashboardInfoRes?.employerDashboardMetrics?.[0]?.noofactiveemployees
          }
          noofinactiveemployees={
            dashboardInfoRes?.employerDashboardMetrics?.[0]
              ?.noofinactiveemployees
          }
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "2.3rem",
        }}
      >
        <Box>
          <Chart />
        </Box>
        <Box>
          <Calendar />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
