"use client";
import React from "react";
import { Paper } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const Calendar = () => {
  return (
    <Paper sx={{ padding: "1rem" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar readOnly/>
      </LocalizationProvider>
    </Paper>
  );
};

export default Calendar;
