"use client";
import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import NewControlledTextField from "@/components/ControlledComponents/NewControlledTextField";
import * as yup from "yup";
import { useFormik } from "formik";
import { BiSolidPhoneCall } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import {
  openLoader,
  closeLoader,
} from "@/lib/features/loaderSlice/loaderSlice";
import {
  getInTouch,
  resetGetInTouchFields,
} from "@/lib/features/getintouchdemoSlice";

const UpperPart = () => {
  const [data, setData] = useState({});
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const getintouchStatus = useSelector(
    (state) => state.contactUsDetails.status
  );
  const getintouchRes = useSelector((state) => state.contactUsDetails.details);
  const validationSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phone_number: yup.string().required(),
    employername: yup.string().required(),
    email: yup.string().email("Enter a valid email").required(),
    msg_reason: yup.string(),
  });

  const onSubmit = (value) => {
    setData(value);
  };

  const { setFieldValue, ...formik } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      employername: "",
      phone_number: "",
      email: "",
      msg_reason: "",
    },
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    if (getintouchStatus === "loading") {
      dispatch(openLoader());
    } else {
      dispatch(closeLoader());
      if (getintouchStatus === "success") {
        enqueueSnackbar(getintouchRes?.status, {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          autoHideDuration: 5000,
        });
        formik.handleReset();
      } else if (getintouchStatus === "failed") {
        enqueueSnackbar("Not Successful!", {
          variant: "info",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          autoHideDuration: 5000,
        });
      }
    }
  }, [getintouchRes, getintouchStatus]);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      dispatch(getInTouch(data));
    }
  }, [data]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: "2rem",
      }}
      id="get-in-touch"
    >
      <Grid container sx={{ display: "flex", alignItems: "center" }}>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          sx={{ paddingBottom: { sm: "2rem", xs: "2rem" } }}
        >
          <Grid container sx={{ display: "flex", alignItems: "center" }}>
            <Grid sx={{ margin: "0 2rem 0 0" }}>
              <BiSolidPhoneCall size={50} color="#fff" />
            </Grid>
            <Grid>
              <Typography
                sx={{ fontSize: "1.5em", textAlign: "left", color: "#fff" }}
              >
                Get In Touch
              </Typography>
              <Typography
                sx={{ fontSize: "1em", textAlign: "left", color: "#fff" }}
              >
                We will be glad to hear from you
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Grid container spacing={2} sx={{ width: "100%" }}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <NewControlledTextField
                name="firstName"
                formik={formik}
                label="First Name"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <NewControlledTextField
                name="lastName"
                formik={formik}
                label="Last Name"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <NewControlledTextField
                name="email"
                formik={formik}
                label="Email"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <NewControlledTextField
                name="phone_number"
                formik={formik}
                label="Phone Number"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={12} lg={12}>
              <NewControlledTextField
                name="employername"
                formik={formik}
                label="Employer's Name"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={12} lg={12}>
              <NewControlledTextField
                name="msg_reason"
                formik={formik}
                label="Comments"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "163px",
                borderRadius: "10px",
              }}
            >
              <Button
                variant="contained"
                sx={{ backgroundColor: "#D87554", color: "#fff" }}
                onClick={formik.handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UpperPart;
