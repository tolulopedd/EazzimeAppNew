"use client";
import React from "react";
import { CircularProgress, Backdrop } from "@mui/material";
import { useLoader } from "@/hooks";

const Loader = () => {
  const { showLoader } = useLoader();
  return showLoader ? (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.appBar + 1000 }}
      open={showLoader}
    >
      <CircularProgress color={"primary"} size={70} thickness={4} />
    </Backdrop>
  ) : null;
};

export default Loader;
