import React from "react";
import { Card, Box, Grid, CardContent, Typography } from "@mui/material";
import { FaUser, FaUserMinus, FaHandshake, FaUserCheck } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";

const Cards = ({
  activePartners,
  employees,
  pendingFundReq,
  approvedFundReq,
}) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid
        container
        columnSpacing={4}
        rowSpacing={4}
        sx={{
          display: "flex",
          alignItems: "center",
          // justifyContent: "space-around",
        }}
      >
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Card
            sx={{
              background: "#35CB62",
              padding: "1rem",
              width: { lg: "250px", md: "250px", sm: "320px", xs: "320px" },
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
                    Active Partners
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
                      sx={{
                        color: "#fff",
                        fontWeight: "600",
                        fontSize: "1.5em",
                      }}
                    >
                      {activePartners}
                    </Typography>
                  </Grid>
                  <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <FaHandshake color="#fff" size={20} />
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Card
            sx={{
              background: "#F2825D",
              padding: "1rem",
              width: { lg: "250px", md: "250px", sm: "320px", xs: "320px" },
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
                      sx={{
                        color: "#fff",
                        fontWeight: "600",
                        fontSize: "1.5em",
                      }}
                    >
                      {employees}
                    </Typography>
                  </Grid>
                  <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <FaUserTie color="#fff" size={20} />
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2} lg={2}>
          <Card
            sx={{
              background: "#A3A3A3",
              padding: "1rem 0.3rem 1rem 0.3rem",
              width: { lg: "125px", md: "125px", sm: "320px", xs: "320px" },
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
                  sx={{ padding: "0 0 1.7rem 0" }}
                >
                  <Typography
                    sx={{ color: "#fff", fontWeight: "600", fontSize: "0.8em" }}
                  >
                    Pending Fund Requests
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
                      sx={{
                        color: "#fff",
                        fontWeight: "600",
                        fontSize: "1.2em",
                      }}
                    >
                      {pendingFundReq}
                    </Typography>
                  </Grid>
                  <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <FaUser color="#fff" size={20} />
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2} lg={2}>
          <Card
            sx={{
              background: "#26AAE0",
              padding: "1rem 0.3rem 1rem 0.3rem",
              width: { lg: "125px", md: "125px", sm: "320px", xs: "320px" },
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
                  sx={{ padding: "0 0 0.9rem 0" }}
                >
                  <Typography
                    sx={{ color: "#fff", fontWeight: "600", fontSize: "0.9em" }}
                  >
                    Approved Fund Requests
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
                      sx={{
                        color: "#fff",
                        fontWeight: "600",
                        fontSize: "1.2em",
                      }}
                    >
                      {approvedFundReq}
                    </Typography>
                  </Grid>
                  <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <FaUserCheck color="#fff" size={20} />
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cards;
