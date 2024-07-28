"use client";
import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRouter } from "next/navigation";
import {
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  Grid,
  Button,
  Box,
} from "@mui/material";
import { useNavToggle } from "@/hooks";
import EazziMeLogo from "@/assets/eazzime-logo.png";
import Image from "next/image";
import dayjs from "dayjs";
import { FaUser } from "react-icons/fa6";
import resetstore from "@/lib/resetstore";
import {
  openLoader,
  closeLoader,
} from "@/lib/features/loaderSlice/loaderSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserDetails } from "@/lib/features/userSlices/getuserdetailsSlice";

const Navbar = ({ swipeable }) => {
  const { toggleSidebar } = useNavToggle();
  const [nowDate, setNowDate] = useState("");

  const dispatch = useDispatch();
  const getUserInfoStatus = useSelector(
    (state) => state.loggedInUserDetails?.status
  );
  const getUserInfoRes = useSelector(
    (state) => state.loggedInUserDetails.details
  );

  const userData = useSelector((state) => state.userLoginDetails?.details);

  const router = useRouter();

  useEffect(() => {
    const todayDate = dayjs().format("dddd, MMMM, DD, YYYY hh:mm A");
    setNowDate(todayDate);
  }, []);

  const logOutUser = () => {
    resetstore();
    router.push("/");
  };

  useEffect(() => {
    if (getUserInfoStatus === "loading") {
      dispatch(openLoader());
    } else if (getUserInfoStatus !== "loading") {
      dispatch(closeLoader());
      if (getUserInfoStatus === "success") {
        console.log("details fetched successfully");
      } else {
        console.log("details not fetched");
      }
    }
  }, [getUserInfoStatus, getUserInfoRes]);

  useEffect(() => {
    if (userData?.token) {
      const payloadData = {
        userEmail: userData?.email,
        token: userData?.token,
      };
      dispatch(fetchUserDetails(payloadData));
    }
  }, [userData?.token]);

  const loggedInUserName =
    `${getUserInfoRes?.userDetails?.firstname}` +
    " " +
    `${getUserInfoRes?.userDetails?.lastname}`;

  return (
    <>
      <AppBar position="relative" elevation={0}>
        <Toolbar variant="regular">
          <Grid
            container
            spacing={1}
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              flexWrap: "nowrap",
            }}
          >
            <Box>
              {swipeable && (
                <IconButton
                  onClick={toggleSidebar}
                  size={"large"}
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                >
                  <GiHamburgerMenu color="#000" />
                </IconButton>
              )}
            </Box>
            <Grid
              item
              xs={2}
              sx={{
                display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
              }}
            >
              <Image
                src={EazziMeLogo}
                alt="logo"
                width={100}
                height={70}
                style={{
                  marginRight: "8rem",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              />
            </Grid>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textAlign: "center",
                marginTop: "16px",
              }}
            >
              <Grid
                item
                xs={5}
                sm={6}
                md={6}
                lg={6}
                sx={{
                  display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
                  padding: "0 0 0 2rem",
                  marginLeft:"4rem"
                }}
              >
                <Typography variant="body1">{nowDate}</Typography>
              </Grid>
              <Grid
                item
                xs={4}
                sm={12}
                md={12}
                lg={6}
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                {getUserInfoRes?.userDetails?.firstname !== undefined &&
                  getUserInfoRes?.userDetails?.lastname !== undefined && (
                    <Grid
                      sx={{
                        display: {
                          lg: "flex",
                          md: "flex",
                          sm: "none",
                          xs: "none",
                        },
                        alignItems: "center",
                      }}
                    >
                      <FaUser color="#42E673" />
                      <Typography
                        sx={{ color: "#000", margin: "0 0 0 0.5rem" }}
                      >
                        {`Welcome ${loggedInUserName}`}
                      </Typography>
                    </Grid>
                  )}
                <Grid
                  sx={{
                    display: "flex",
                    justifyContent: { sm: "flex-end", xs: "flex-end" },
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={logOutUser}
                    sx={{
                      textTransform: "uppercase",
                      backgroundColor: "#0D2B36",
                      color: "#fff",
                      fontSize: "0.8em",
                      margin: "0 0 0 2rem",
                    }}
                  >
                    Logout
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default Navbar;
