"use client";
import React from "react";
import { Paper } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const Calendar = () => {
  return (
    <Paper sx={{ padding: "0.5rem" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          readOnly
          sx={{ width: { lg: "100%", md: "100%", sm: "70%", xs: "70%" } }}
        />
      </LocalizationProvider>
    </Paper>
  );
};

export default Calendar;
