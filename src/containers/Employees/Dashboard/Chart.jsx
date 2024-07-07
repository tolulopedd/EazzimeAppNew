"use client";
import React from "react";
import { Box, Paper, Grid, Typography } from "@mui/material";
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
    <Paper
      sx={{
        padding: "1rem",
        width: "100%",
        height: {lg:"350px", md:"350px", sm:"350px"},
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Line options={options} data={data} />
    </Paper>
  );
};

export default Chart;
