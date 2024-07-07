"use client";
import React from "react";
import { CircularProgress, Backdrop } from "@mui/material";
import { useSelector } from "react-redux";

const Loader = () => {
  const showLoaderTwo = useSelector((state) => state.loader.isLoaderOpen);

  return showLoaderTwo ? (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.appBar + 1000 }}
      open={showLoaderTwo}
    >
      <CircularProgress color={"primary"} size={70} thickness={4} />
    </Backdrop>
  ) : null;
};

export default Loader;
