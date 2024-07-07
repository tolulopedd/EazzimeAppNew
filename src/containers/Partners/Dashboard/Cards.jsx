import React from "react";
import { Card, Box, Grid, CardContent, Typography } from "@mui/material";
import { FaUser, FaUserMinus, FaUserPlus } from "react-icons/fa";

const Cards = ({
  noofinactiveemployees,
  noofactiveemployees,
  totalemployee,
}) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Card
          sx={{
            background: "#35CB62",
            padding: "1rem",
            width: "250px",
            boxShadow: "2px 6px 14px -3px rgba(0,0,0,0.36)",
            borderRadius: "10px",
          }}
        >
          <CardContent sx={{ display: "flex", justifyContent: "start" }}>
            <Grid container sx={{ width: "100%" }}>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{ padding: "0 0 3rem 0" }}
              >
                <Typography sx={{ color: "#fff", fontWeight: "600" }}>
                  Employees
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Grid sx={{ display: "flex", justifyContent: "flex-start" }}>
                  <Typography
                    sx={{ color: "#fff", fontWeight: "600", fontSize: "1.5em" }}
                  >
                    {totalemployee}
                  </Typography>
                </Grid>
                <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <FaUser color="#fff" size={20} />
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card
          sx={{
            background: "#F2825D",
            padding: "1rem",
            width: "250px",
            boxShadow: "2px 6px 14px -3px rgba(0,0,0,0.36)",
            borderRadius: "10px",
          }}
        >
          <CardContent sx={{ display: "flex", justifyContent: "start" }}>
            <Grid container sx={{ width: "100%" }}>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{ padding: "0 0 3rem 0" }}
              >
                <Typography sx={{ color: "#fff", fontWeight: "600" }}>
                  Active Employees
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Grid sx={{ display: "flex", justifyContent: "flex-start" }}>
                  <Typography
                    sx={{ color: "#fff", fontWeight: "600", fontSize: "1.5em" }}
                  >
                    {noofactiveemployees}
                  </Typography>
                </Grid>
                <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <FaUserPlus color="#fff" size={20} />
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card
          sx={{
            background: "#26AAE0",
            padding: "1rem",
            width: "250px",
            boxShadow: "2px 6px 14px -3px rgba(0,0,0,0.36)",
            borderRadius: "10px",
          }}
        >
          <CardContent sx={{ display: "flex", justifyContent: "start" }}>
            <Grid container sx={{ width: "100%" }}>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{ padding: "0 0 3rem 0" }}
              >
                <Typography sx={{ color: "#fff", fontWeight: "600" }}>
                  Inactive Empployees
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Grid sx={{ display: "flex", justifyContent: "flex-start" }}>
                  <Typography
                    sx={{ color: "#fff", fontWeight: "600", fontSize: "1.5em" }}
                  >
                    {noofinactiveemployees}
                  </Typography>
                </Grid>
                <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <FaUserMinus color="#fff" size={20} />
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Cards;
