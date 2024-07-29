import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import ControlledTextField from "@/components/ControlledComponents/ControlledTextField";
import { useLoader } from "@/hooks";
import { employerInfoUpdate, fundRequestApproval } from "@/api";
import ControlledPhoneInput from "@/components/ControlledComponents/ControlledPhoneInput";
import dayjs from "dayjs";
import ControlledAmountField from "@/components/ControlledComponents/ControlledAmountField";
import { useSnackbar } from "notistack";

const FundRequestDetails = ({ details }) => {
  const { displayLoader, hideLoader } = useLoader();
  const {enqueueSnackbar} = useSnackbar();

  const validationSchema = yup.object({
    account_key: yup.string().required("This field is required"),
    requestFundAmount: yup.string().required("This field is required"),
  });

  const onSubmit = async (values) => {
    try {
      displayLoader();
      const approveFundRes = await fundRequestApproval(values);
      enqueueSnackbar(approveFundRes?.data?.status, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
        autoHideDuration: 5000,
      });
    } catch (err) {
      console.log("errr", err);
    } finally {
      hideLoader();
    }
  };

  const { setFieldValue, ...formik } = useFormik({
    initialValues: {
      account_key: "",
      requestFundAmount: "",
    },
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    setFieldValue("account_key", details?.account_key);
    setFieldValue("requestFundAmount", details?.transaction_amount);
  }, []);
  return (
    <Box sx={{ width: "100%" }}>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <ControlledTextField
            name="account_key"
            label="Account Number"
            formik={formik}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <ControlledAmountField
            name="requestFundAmount"
            label="Amount"
            formik={formik}
            disabled
            size="small"
          />
        </Grid>
      </Grid>
      <Grid
        container
        sx={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <Button
          sx={{
            textTransform: "uppercase",
            backgroundColor: "#0D2B36",
            color: "#fff",
            fontSize: "0.8em",
            margin: "0 0 0 2rem",
            "&:hover": {
              backgroundColor: "#0D2B36",
            },
          }}
          onClick={formik.handleSubmit}
        >
          Approve
        </Button>
      </Grid>
    </Box>
  );
};

export default FundRequestDetails;
