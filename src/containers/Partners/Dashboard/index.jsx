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
import { useAuth, useLoader } from "@/hooks";
import { fetchPartnerDashboardDetails, fetchUserDetails } from "@/api";

const Dashboard = () => {
  const [isClient, setIsClient] = useState(false);
  const { userData } = useAuth();
  const { displayLoader, hideLoader } = useLoader();
  const [userInfo, setUserInfo] = useState({});

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

  const fetchDashInfo = async () => {
    try {
      displayLoader();
      const dashRes = await fetchPartnerDashboardDetails(
        userInfo?.employer_key
      );
      console.log("dashRes", dashRes);
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
      fetchDashInfo();
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
      <Box sx={{ width: "100%", padding: "0 0 2rem 0" }}>
        <Cards
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
