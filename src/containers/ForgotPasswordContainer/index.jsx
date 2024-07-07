"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Box,
  Grid,
  Typography,
  Button,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import LoginBg from "@/assets/login-bg.png";
import EazziMeLogo from "@/assets/eazzime-logo.png";
import ControlledTextField from "@/components/ControlledComponents/ControlledTextField";
import ControlledPasswordField from "@/components/ControlledComponents/ControlledPasswordField";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  openLoader,
  closeLoader,
} from "@/lib/features/loaderSlice/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "@/lib/features/passwordresetSlice/passwordresetSlice";
import { enqueueSnackbar } from "notistack";

const ForgotPasswordContainer = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const resetPasswordStatus = useSelector(
    (state) => state.updatePasswordDetails.status
  );
  const resetPasswordRes = useSelector(
    (state) => state.updatePasswordDetails.details
  );
  const [showPassword, setShowPassword] = useState(false);
  const [resetData, setResetData] = useState({});
  const validationSchema = yup.object({
    userEmail: yup
      .string()
      .email("Enter a valid email")
      .required("This field is required"),
    password: yup.string().required("This field is required"),
  });

  const onSubmit = (values) => {
    setResetData(values);
  };

  const { setFieldValue, ...formik } = useFormik({
    initialValues: {
      userEmail: "",
      password: "",
    },
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    if (resetPasswordStatus === "loading") {
      dispatch(openLoader());
    } else {
      dispatch(closeLoader());
      if (resetPasswordRes?.status === "password updated for this user") {
        enqueueSnackbar(resetPasswordRes?.status, {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          autoHideDuration: 5000,
        });
        formik.handleReset();
      }
      if (
        Object.keys(resetData).length > 0 &&
        resetPasswordRes?.status !== "password updated for this user"
      ) {
        enqueueSnackbar("Password reset not successful!", {
          variant: "info",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          autoHideDuration: 5000,
        });
      }
    }
  }, [resetPasswordStatus, resetPasswordRes]);

  useEffect(() => {
    if (Object.keys(resetData).length > 0) {
      dispatch(resetPassword(resetData));
    }
  }, [resetData]);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const showVisibility = showPassword ? (
    <Visibility sx={{ fontSize: 15 }} />
  ) : (
    <VisibilityOff sx={{ fontSize: 15 }} />
  );

  console.log("resetPasswordRes", resetPasswordRes);
  return (
    <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
      <Box
        sx={{
          width: "50%",
          height: "100vh",
          backgroundImage: `url(${LoginBg.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "0 0 2rem 0",
            }}
          >
            <Image
              src={EazziMeLogo}
              alt="eazzime logo"
              width={150}
              height={75}
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
            }}
          >
            <Typography
              sx={{ fontSize: "1em", width: "70%", textAlign: "center" }}
            >
              Fueling employees financial confidence to enhance productivity and
              success
            </Typography>
          </Grid>
        </Stack>
      </Box>
      <Box
        sx={{
          width: "50%",
          padding: "3rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack sx={{ width: "100%" }}>
          <Grid
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Typography sx={{ fontSize: "1.5em", fontWeight: "700" }}>
              Forgot Password
            </Typography>
          </Grid>
          <Grid
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ControlledTextField
              name="userEmail"
              formik={formik}
              label="Email"
              sx={{ width: "70%" }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    {<PersonIcon size={5} />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Grid>
          <Grid
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ControlledPasswordField
              name="password"
              formik={formik}
              label="Password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showVisibility}
                  </IconButton>
                </InputAdornment>
              }
              sx={{ width: "70%" }}
            />
          </Grid>
          <Grid
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              padding: "2rem 0 0 0",
            }}
          >
            <Button
              sx={{
                backgroundColor: "#0D2B36",
                color: "#fff",
                width: "70%",
                "&:hover": {
                  backgroundColor: "#0D2B36",
                  color: "#fff",
                },
              }}
              onClick={formik.handleSubmit}
            >
              Submit
            </Button>
          </Grid>
          <Grid
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              padding: "3rem 0 0 0",
              cursor: "pointer",
            }}
            onClick={() => router.push("/login")}
          >
            Go back to login page{" "}
          </Grid>
        </Stack>
      </Box>
    </Box>
  );
};

export default ForgotPasswordContainer;
