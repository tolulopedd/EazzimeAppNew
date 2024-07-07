"use client";
import React, { useState } from "react";
import { Box, Grid, Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import ControlledTextField from "@/components/ControlledComponents/ControlledTextField";

const UploadEmployee = () => {
  const [uploadFile, setUploadFile] = useState(null);
  const validationSchema = yup.object({
    file: yup.mixed().test("fileSize", "Max allowed size is 2MB", (value) => {
      if (!value) {
        // No file selected

        return true;
      }
      console.log("orobo", uploadFile);
      const fileSize = uploadFile?.[0]?.size;
      const maxSizeInBytes = 2 * 1024 * 1024; // 5MB
      return fileSize <= maxSizeInBytes;
    }),
  });
  const onSubmit = async (values) => {
    console.log("values", values);
    try {
    } catch (err) {}
  };

  const { setFieldValue, ...formik } = useFormik({
    initialValues: {
      companyName: "",
      file: "",
    },
    validationSchema,
    onSubmit,
  });

  console.log("formik values", formik.values);
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container>
        <Grid xs={12} sm={12} md={4} lg={4}>
          <ControlledTextField
            name="companyName"
            formik={formik}
            label="Name of Organization"
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={12} sm={12} md={4} lg={4}>
          <ControlledTextField
            name="file"
            formik={formik}
            label="Upload Employee List"
            type="file"
            onFileSelect={setUploadFile}
          />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "2rem 0 0 0",
        }}
      >
        <Button
          sx={{
            backgroundColor: "black.main",
            color: "#fff",
            width: "100px",
            "&:hover": {
              backgroundColor: "black.main",
              color: "#fff",
            },
          }}
          onClick={formik.handleSubmit}
        >
          Submit
        </Button>
      </Grid>
    </Box>
  );
};

export default UploadEmployee;
