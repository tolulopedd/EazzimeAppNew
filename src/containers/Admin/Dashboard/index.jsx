import React from "react";
import { Box } from "@mui/material";
import Cards from "./Cards";
import Chart from "./Chart";
import Calendar from "./Calendar";

const AdminDashboard = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", paddingBottom:"2rem" }}>
        <select style={{ width: "20%", padding: "0.5rem", borderRadius:"5px" }}>
          <option>daily</option>
          <option>weekly</option>
          <option>monthly</option>
        </select>
      </Box>
      <Box sx={{ width: "100%", padding: "0 0 2rem 0" }}>
        <Cards />
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

export default AdminDashboard;
