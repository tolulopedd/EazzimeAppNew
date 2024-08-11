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
  useMediaQuery,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import LoginBg from "@/assets/login-bg.png";
import EazziMeLogo from "@/assets/eazzime-logo.png";
import ControlledTextField from "@/components/ControlledComponents/ControlledTextField";
import ControlledPasswordField from "@/components/ControlledComponents/ControlledPasswordField";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  openLoader,
  closeLoader,
} from "@/lib/features/loaderSlice/loaderSlice";
import { useSnackbar } from "notistack";
import { userAuth } from "@/lib/features/authSlices/userloginSlice";
import { useAuth, useLoader } from "@/hooks";
import { authLogin } from "@/api";

const LoginContainer = () => {
  const matchesTwo = useMediaQuery(`(max-width:900px)`);
  const router = useRouter();
  const { signIn } = useAuth();
  const { displayLoader, hideLoader } = useLoader();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const loginStatus = useSelector((state) => state.userLoginDetails.status);
  const loginRes = useSelector((state) => state.userLoginDetails.details);
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("This field is required"),
    password: yup.string().required(),
  });

  const onSubmit = async (values) => {
    // setLoginData(values);
    try {
      displayLoader();
      const authRes = await authLogin(values);
      enqueueSnackbar(authRes?.data?.status, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
        autoHideDuration: 5000,
      });
      formik.handleReset();
      signIn(authRes);
    } catch (err) {
      enqueueSnackbar(err?.response?.data?.status, {
        variant: "info",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
        autoHideDuration: 5000,
      });
    } finally {
      hideLoader();
    }
  };

  const { setFieldValue, ...formik } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit,
  });

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const showVisibility = showPassword ? (
    <Visibility size={5} />
  ) : (
    <VisibilityOff size={5} />
  );

  const checkLoginRes = /Successful/.test(loginRes?.status);

  if (!isClient) {
    return null;
  }

  return (
    <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
      <Box
        sx={{
          width: "50%",
          height: "100vh",
          backgroundImage: `url(${LoginBg.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
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
              cursor: "pointer",
            }}
            onClick={() => router.push("/")}
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
          width: { lg: "50%", md: "50%", sm: "100%", xs: "100%" },
          padding: "3rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack sx={{ width: "100%" }}>
          {matchesTwo && (
            <Grid
              container
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
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
                  cursor: "pointer",
                }}
                onClick={() => router.push("/")}
              >
                <Image
                  src={EazziMeLogo}
                  alt="eazzime logo"
                  width={150}
                  height={75}
                />
              </Grid>
            </Grid>
          )}
          <Grid
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Typography sx={{ fontSize: "1.5em", fontWeight: "700" }}>
              Login
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
              name="email"
              formik={formik}
              label="Email"
              sx={{ width: { lg: "70%", md: "70%", sm: "90%", xs: "90%" } }}
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
              sx={{ width: { lg: "70%", md: "70%", sm: "90%", xs: "90%" } }}
            />
          </Grid>
          <Grid
            sx={{
              width: "86%",
              display: "flex",
              justifyContent: "flex-end",
              margin: "-2rem 0 0 0",
            }}
          >
            <Button
              sx={{ color: "#8C4B36", fontSize: "0.7em", fontWeight: "700" }}
              onClick={() => router.push("/forgot-password")}
            >
              Forgot Password
            </Button>
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
                width: { lg: "70%", md: "70%", sm: "90%", xs: "90%" },
                "&:hover": {
                  backgroundColor: "#0D2B36",
                  color: "#fff",
                },
              }}
              onClick={formik.handleSubmit}
            >
              Login
            </Button>
          </Grid>
          <Grid
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              padding: "3rem 0 0 0",
            }}
          >
            Don&apos;t have an account?{" "}
            <span
              style={{
                margin: "0 0 0 1rem",
                fontWeight: "600",
                color: "#C86B4D",
                cursor: "pointer",
              }}
              onClick={() =>
                router.push("/signup", undefined, { replace: true })
              }
            >
              Sign up here
            </span>
          </Grid>
        </Stack>
      </Box>
    </Box>
  );
};

export default LoginContainer;
