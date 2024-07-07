import React from "react";
import { Card, Box, Grid, CardContent, Typography } from "@mui/material";
import { FaMoneyBillWave } from "react-icons/fa";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdLocalActivity } from "react-icons/md";
import { formatAmount } from "@/helpers/utils";

const Cards = ({ availableBal, utitilizedBal, repayableBal }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Grid item xs={12} sm={12} md={6} lg={3} >
          <Card
            sx={{
              background: "#35CB62",
              padding: "1rem",
              // width: "250px",
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
                    Available Fund
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
                      {formatAmount(availableBal)}
                    </Typography>
                  </Grid>
                  <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <FaMoneyBillWave color="#fff" size={20} />
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <Card
            sx={{
              background: "#F2825D",
              padding: "1rem",
              // width: "250px",
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
                    Total Withdrawal
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
                      {formatAmount(utitilizedBal)}
                    </Typography>
                  </Grid>
                  <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <BiMoneyWithdraw color="#fff" size={20} />
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={3} >
          <Card
            sx={{
              background: "#26AAE0",
              padding: "1rem",
              // width: "250px",
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
                    Repayable Balance
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
                      {formatAmount(repayableBal)}
                    </Typography>
                  </Grid>
                  <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <MdLocalActivity color="#fff" size={20} />
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
