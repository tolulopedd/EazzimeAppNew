import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import ControlledTextField from "@/components/ControlledComponents/ControlledTextField";
import { useLoader } from "@/hooks";
import { employerInfoUpdate } from "@/api";
import ControlledPhoneInput from "@/components/ControlledComponents/ControlledPhoneInput";
import dayjs from "dayjs";
import ControlledSelect from "@/components/ControlledComponents/ControlledSelect";
import { useSnackbar } from "notistack";

const UpdatePartner = ({ details }) => {
  const { displayLoader, hideLoader } = useLoader();
  const { enqueueSnackbar } = useSnackbar();

  const validationSchema = yup.object({
    employeremail: yup.string().email().required("This field is required"),
    companyphone_no: yup.string().required("This field is required"),
    // referralemail: yup.string().email().required("This field is required"),
    // employerid: yup.string().email().required("This field is required"),
  });

  const onSubmit = async (values) => {
    const payload = {
      employeremail: values?.employeremail,
      companyphone_no: values?.companyphone_no,
      referralemail: values?.referralemail,
      employerid: values?.employerid,
    };
    try {
      displayLoader();
      const updateRes = await employerInfoUpdate(payload);
      console.log("updateRes", updateRes);
      if (updateRes?.status === 200) {
        enqueueSnackbar("Update Successful!", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          autoHideDuration: 5000,
        });
      }
    } catch (err) {
      console.log("errr", err);
    } finally {
      hideLoader();
    }
  };

  const { setFieldValue, ...formik } = useFormik({
    initialValues: {
      employeremail: "",
      companyphone_no: "",
      referralemail: "",
      employerid: "",
      employername: "",
      date_created: "",
      numberofemployees: "",
      activestatus: "",
    },
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    setFieldValue("employeremail", details?.employeremail);
    setFieldValue("companyphone_no", details?.companyphone_no);
    setFieldValue("referralemail", details?.referralemail);
    setFieldValue("employerid", details?.employer_key);
    setFieldValue("employername", details?.employername);
    setFieldValue(
      "date_created",
      dayjs(details?.date_created).format("YYYY-MM-DD HH:mm:ss")
    );
    setFieldValue("numberofemployees", details?.numberofemployees);
    setFieldValue("activestatus", details?.activestatus);
  }, []);

  const status = [
    {
      id: 0,
      value: "Active",
    },
    {
      id: 1,
      value: "Inactive",
    },
  ];

  const statusOptions = status.map((statusType) => {
    return {
      items: statusType?.value,
      value: statusType?.value,
    };
  });
  return (
    <Box sx={{ width: "100%" }}>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <ControlledTextField
            name="employername"
            label="Organization"
            formik={formik}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <ControlledTextField
            name="employerid"
            label="Partner ID"
            formik={formik}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <ControlledTextField
            name="employeremail"
            label="Partner Email"
            formik={formik}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <ControlledTextField
            name="numberofemployees"
            label="Number of Employees"
            formik={formik}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={3}
          sx={{ marginTop: { lg: "-1.4rem", md: "-1.4rem", sm: "0", xs: "0" } }}
        >
          <ControlledPhoneInput
            name="companyphone_no"
            label="Phone Number"
            formik={formik}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <ControlledTextField
            name="referralemail"
            label="Referral Email"
            formik={formik}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          {/* <ControlledSelect
            name="activestatus"
            label="Active Status"
            options={statusOptions}
            formik={formik}
          /> */}
          <ControlledTextField
            name="activestatus"
            label="Active Status"
            formik={formik}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <ControlledTextField
            name="date_created"
            label="Created Date"
            formik={formik}
            disabled
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
          Update
        </Button>
      </Grid>
    </Box>
  );
};

export default UpdatePartner;
