"use client";
import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import Container from "@mui/material/Container";
import Box from "@mui/system/Box";
import { NavToggleProvider } from "../../context/NavToggleContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import PageHeader from "./PageHeader";
// import { useAuth } from 'hooks'

const Viewport = ({ children, swipeable, noContainer, title }) => {
  const theme = useTheme();
  // const { showViewport } = useAuth()
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("lg"));

  // if (!showViewport()) return null
  return (
    <NavToggleProvider>
      <Navbar swipeable={swipeable || isMediumScreen} />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar swipeable={swipeable || isMediumScreen} />
        {!noContainer ? (
          <Box
            display="flex"
            flexDirection="column"
            width="100%"
            sx={{
              padding: {
                lg: "1rem 2rem 0 2rem",
                md: "1rem 2rem 0 2rem",
                sm: "1rem 2rem 0 2rem",
              },
            }}
          >
            {/* <PageHeader title={title} /> */}
            <Container
              sx={{
                flexGrow: 1,
                paddingTop: 4,
                paddingBottom: 3,
              }}
              maxWidth="lg"
            >
              {children}
            </Container>
          </Box>
        ) : (
          <Box sx={{ flexGrow: 1 }}>{children}</Box>
        )}
      </Box>
    </NavToggleProvider>
  );
};

export default Viewport;