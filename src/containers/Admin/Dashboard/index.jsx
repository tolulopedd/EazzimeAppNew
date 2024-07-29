"use client";
import React, { useEffect, useState } from "react";
import { Box, Stack, Grid } from "@mui/material";
import Cards from "./Cards";
import Chart from "./Chart";
import Calendar from "./Calendar";
import { useAuth, useLoader } from "@/hooks";
import { fetchAdminDashboard, fetchUserDetails } from "@/api";

const AdminDashboard = () => {
  const [isClient, setIsClient] = useState(false);
  const { userData } = useAuth();
  const { displayLoader, hideLoader } = useLoader();
  const [userInfo, setUserInfo] = useState({});
  const [dashInfo, setDashInfo] = useState({});

  useEffect(() => {
    const fetchUserInfo = async () => {
      const payload = {
        userEmail: userData?.email,
      };
      try {
        displayLoader();
        const res = await fetchUserDetails(payload);
        setUserInfo(res?.data?.userDetails);
      } catch (err) {
        console.log("err", err);
      } finally {
        hideLoader();
      }
    };

    fetchUserInfo();
  }, []);

  const fetchDashInfo = async (key) => {
    const payload = {
      employerid: `${key}`,
    };
    try {
      displayLoader();
      const dashRes = await fetchAdminDashboard(payload);
      setDashInfo(dashRes.data.eazziMeDash?.[0]);
    } catch (err) {
      console.log("errrr", err);
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    if (
      (userInfo && userInfo?.employer_key !== undefined) ||
      userInfo?.employer_key !== ""
    )
      fetchDashInfo(0);
  }, [userInfo]);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container sx={{ width: "100%", padding: "0 0 2rem 0" }}>
          <Cards
            activePartners={dashInfo?.activepartners}
            employees={dashInfo?.employeescount}
            pendingFundReq={dashInfo?.pendingfundrequest}
            approvedFundReq={dashInfo?.approvedfundrequest}
          />
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            // justifyContent: "space-between",
            // padding: "2.3rem",
          }}
        >
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Chart />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Calendar />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

export default AdminDashboard;
