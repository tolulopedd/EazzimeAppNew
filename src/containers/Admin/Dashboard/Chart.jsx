"use client";
import React from "react";
import { Box, Paper, Grid, Typography, useMediaQuery } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  // BarElement,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const macthesOne = useMediaQuery("(max-width:820px");
  const options = {
    responsive: false,
    plugins: {
      legend: {
        display: false,
        position: "bottom",
      },
      title: {
        display: true,
        text: "Chart Of Weekly Withdrawals",
      },
    },
    scales: {
      x: {
        ticks: {
          beginAtZero: true,
        },
      },
      y: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  const labels = ["Week 1", "Week-2", "Week-3", "Week-4"];

  const chartData1 = [1000, 500, 1300, 800];

  const data = {
    labels,
    datasets: [
      {
        data: chartData1,
        backgroundColor: "#F2825D",
        borderColor: "#26AAE0",
        tension: 0.5,
      },
    ],
  };

  return (
    <Paper sx={{ padding: "1rem", width: "100%" }}>
      <Grid
        container
        sx={{ width: { lg: "100%", md: "100%", sm: "70%", xs: "70%" } }}
      >
        <Line
          options={options}
          data={data}
          width={macthesOne ? 400 : 450}
          height={macthesOne ? 250 : 335}
        />
      </Grid>
    </Paper>
  );
};

export default Chart;
