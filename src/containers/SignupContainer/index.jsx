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
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  MenuItem,
  InputAdornment,
  IconButton,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import EazziMeLogo from "@/assets/eazzime-black-logo.png";
import ControlledTextField from "@/components/ControlledComponents/ControlledTextField";
import ControlledSelect from "@/components/ControlledComponents/ControlledSelect";
import ControlledPasswordField from "@/components/ControlledComponents/ControlledPasswordField";
import ListOfCompanies from "@/helpers/listOfCompanies.json";
import dayjs from "dayjs";
import { useFormik } from "formik";
import * as yup from "yup";
import ControlledPhoneInput from "@/components/ControlledComponents/ControlledPhoneInput";
import { useDispatch, useSelector } from "react-redux";
import {
  openLoader,
  closeLoader,
} from "@/lib/features/loaderSlice/loaderSlice";
import { useSnackbar } from "notistack";
import { partnerCreation } from "@/lib/features/signupSlices/createpartnerSlice";
import { userCreation } from "@/lib/features/signupSlices/usersignupSlice";
import { userSignup } from "@/api";
import { useLoader, useAuth } from "@/hooks";

const SignupContainer = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [checkPartner, setCheckPartner] = useState(false);
  const [show, setShow] = useState(false);
  const { displayLoader, hideLoader } = useLoader();

  const dispatch = useDispatch();

  const [firstData, setFirstData] = useState({});
  const [secondData, setSecondData] = useState({});

  const createPartnerStatus = useSelector(
    (state) => state.createPartnerDetails.status
  );
  const createPartnerRes = useSelector(
    (state) => state.createPartnerDetails.details
  );

  const createUserStatus = useSelector(
    (state) => state.createUserDetails.status
  );
  const createUserRes = useSelector((state) => state.createUserDetails.details);

  const handleCheckPartner = () => {
    setCheckPartner((prev) => !prev);
  };

  const handleShowPassword = () => {
    setShow((prev) => !prev);
  };

  const companyOptions = ListOfCompanies?.listOfEmployer?.map((companyy) => {
    return {
      items: companyy?.employername,
      value: companyy?.employerid,
    };
  });
  const validateOne = yup.object({
    firstname: yup.string().required("This field is required"),
    middleware: yup.string().required("This field is required"),
    lastname: yup.string().required("This field is required"),
    password: yup.string().required("This field is required"),
    phone_no: yup.string().required("This field is required"),
    email: yup
      .string()
      .required("This field is required")
      .email("Please, enter a valid email."),
    dateofbirth: yup.string().required("This field is required"),
    employer_key: yup.string().required("This field is required"),
  });
  const validateTwo = yup.object({
    employername: yup.string().required("This field is required"),
    companyphone_no: yup.string().required("This field is required"),
    contactperson: yup.string().required("This field is required"),
    employeremail: yup
      .string()
      .required("This field is required")
      .email("Please, enter a valid email."),
    referralemail: yup.string().email("Please, enter a valid email."),
  });

  const initialValuesOne = {
    firstname: "",
    middleware: "",
    lastname: "",
    password: "",
    phone_no: "",
    email: "",
    dateofbirth: "",
    role_key: "1",
    employer_key: "",
  };

  const initialValuesTwo = {
    employername: "",
    employeremail: "",
    companyphone_no: "",
    contactperson: "",
    referralemail: "",
    referralphone: "",
    referralname: "",
  };

  const onSubmit1 = async (values1) => {
    // setFirstData(values1);
    try {
      displayLoader();
      const signupRes1 = await userSignup(values1);
      console.log("signupRes1", signupRes1);
      const checkCreatePartnerRes = /Success/.test(signupRes1?.data?.status);
      if(checkCreatePartnerRes){
        enqueueSnackbar(createUserRes?.status, {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          autoHideDuration: 5000,
        });
        formik1.handleReset();
        formik2.handleReset();
        setCheckPartner(false);

      }
    } catch (err) {
      console.log("err", err);
    } finally {
      hideLoader();
    }
  };
  const onSubmit2 = async (values2) => {
    try {
      displayLoader();
      const signupRes2 = await userSignup(values2);
      console.log("signupRes2", signupRes2);
      const checkCreateUserRes = /Successfully/.test(signupRes2?.data?.status);
      if(checkCreateUserRes){
        enqueueSnackbar(createUserRes?.status, {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          autoHideDuration: 5000,
        });
        formik1.handleReset();
        formik2.handleReset();
        setCheckPartner(false);

      }
    } catch (err) {
      console.log("err", err);
    } finally {
      hideLoader();
    }
  };

  const formik1 = useFormik({
    initialValues: initialValuesOne,
    validationSchema: validateOne,
    onSubmit: onSubmit1,
  });
  const formik2 = useFormik({
    initialValues: initialValuesTwo,
    validationSchema: validateTwo,
    onSubmit: onSubmit2,
  });

  const showVisibility = show ? (
    <Visibility sx={{ fontSize: 20 }} />
  ) : (
    <VisibilityOff sx={{ fontSize: 20 }} />
  );

  const checkCreatePartnerRes = /Success/.test(createPartnerRes?.status);
  const checkCreateUserRes = /Successfully/.test(createUserRes?.status);

  useEffect(() => {
    if (Object.keys(firstData).length > 0) {
      if (createUserStatus === "loading") {
        dispatch(openLoader());
      } else {
        dispatch(closeLoader());
        if (checkCreateUserRes) {
          enqueueSnackbar(createUserRes?.status, {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            autoHideDuration: 5000,
          });
          formik1.handleReset();
          formik2.handleReset();
          setCheckPartner(false);
        }
        if (!checkCreateUserRes) {
          enqueueSnackbar("User creation is not successful!", {
            variant: "info",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            autoHideDuration: 5000,
          });
        }
      }
    } else if (Object.keys(secondData).length > 0) {
      if (createPartnerStatus === "loading") {
        dispatch(openLoader());
      } else {
        dispatch(closeLoader());
        if (checkCreatePartnerRes) {
          enqueueSnackbar(createPartnerRes?.status, {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            autoHideDuration: 5000,
          });
          formik1.handleReset();
          formik2.handleReset();
          setCheckPartner(false);
        }
        if (!checkCreatePartnerRes) {
          enqueueSnackbar("Employer creation is not successful!", {
            variant: "info",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            autoHideDuration: 5000,
          });
        }
      }
    }
  }, [createPartnerRes, createPartnerStatus, createUserStatus, createUserRes]);

  useEffect(() => {
    if (Object.keys(firstData).length > 0) {
      dispatch(userCreation(firstData));
    }
    if (Object.keys(secondData).length > 0) {
      dispatch(partnerCreation(secondData));
    }
  }, [firstData, secondData]);

  return (
    <Stack
      sx={{
        width: "100%",
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onClick={() => router.push("/")}
      >
        <Image src={EazziMeLogo} alt="Eazzimelogo" width={100} height={75} />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "1rem 0 2rem 0",
        }}
      >
        <Typography
          sx={{ fontSize: "1em", textAlign: { sm: "center", xs: "center" } }}
        >
          Already have an account?{" "}
          <span
            style={{
              margin: "0 0 0 0.2rem",
              fontWeight: "600",
              color: "#C86B4D",
              cursor: "pointer",
            }}
            onClick={() => router.push("/login", undefined, { replace: true })}
          >
            Login here
          </span>
        </Typography>
      </Box>
      <Paper
        elevation={2}
        sx={{
          width: { lg: "70%", md: "70%", sm: "100%", xs: "100%" },
          justifyContent: "center",
          alignItems: "center",
          background: "#F5F5F5",
          padding: "2rem",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            padding: "0 0 1rem 0",
          }}
        >
          <Typography sx={{ fontWeight: "700", fontSize: "1.3em" }}>
            Sign Up
          </Typography>
        </Box>

        <Box sx={{ width: "100%", padding: "1rem 0 0 0" }}>
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Grid item xs={12} sm={12} md={6} lg={8}>
              <Typography
                sx={{
                  textAlign: {
                    sm: "center",
                    xs: "center",
                    md: "left",
                    lg: "left",
                  },
                }}
              >
                Please <span style={{ fontWeight: "700" }}>check the box</span>{" "}
                if your company is already an EazziMe partner?
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              sx={{
                display: "flex",
                justifyContent: { sm: "center", xs: "center" },
              }}
            >
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  value={checkPartner}
                  control={<Checkbox checked={checkPartner} />}
                  labelPlacement="start"
                  sx={{ margin: "0 1rem 0 0" }}
                  name="partner"
                  onChange={handleCheckPartner}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Typography sx={{ fontSize: "0.8em", color: "#F2825D" }}>
                Please note that all fields marked with
                <span
                  style={{
                    fontSize: "1.5em",
                    color: "#C86B4D",
                    fontWeight: "700",
                    margin: "0 0 0 0.2rem",
                  }}
                >
                  *
                </span>{" "}
                are required{" "}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ width: "100%", padding: "1rem 0 0 0" }}>
          {checkPartner && (
            <Grid
              container
              spacing={2}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <ControlledSelect
                  options={companyOptions}
                  name="employer_key"
                  label="Kindly select the name of your organization below"
                  formik={formik1}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <ControlledTextField
                  name="firstname"
                  label="First Name"
                  formik={formik1}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <ControlledTextField
                  name="middleware"
                  label="Middle Name"
                  formik={formik1}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <ControlledTextField
                  name="lastname"
                  label="Last Name"
                  formik={formik1}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <ControlledTextField
                  name="email"
                  label="Email"
                  formik={formik1}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <ControlledPhoneInput
                  name="phone_no"
                  label="Phone Number"
                  formik={formik1}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <ControlledTextField
                  name="dateofbirth"
                  label="Date of birth"
                  type="date"
                  formik={formik1}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <ControlledPasswordField
                  name="password"
                  formik={formik1}
                  label="Password"
                  type={show ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowPassword}
                        edge="end"
                      >
                        {showVisibility}
                      </IconButton>
                    </InputAdornment>
                  }
                  // sx={{ width: "70%" }}
                />
              </Grid>
            </Grid>
          )}

          {!checkPartner && (
            <Grid
              container
              spacing={2}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <ControlledTextField
                  name="employername"
                  label="Kindly tell us the name of your organization"
                  formik={formik2}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <ControlledTextField
                  name="employeremail"
                  label="Company's Email"
                  formik={formik2}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <ControlledPhoneInput
                  name="companyphone_no"
                  label="Company's Phone Number"
                  formik={formik2}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <ControlledTextField
                  name="contactperson"
                  label="Company's Contact Person"
                  formik={formik2}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6}>
                <ControlledTextField
                  name="referralname"
                  label="Referrer's Name"
                  formik={formik2}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <ControlledTextField
                  name="referralemail"
                  label="Referrer's Email"
                  formik={formik2}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <ControlledPhoneInput
                  name="referralphone"
                  label="Referrer's Phone Number"
                  formik={formik2}
                />
              </Grid>
            </Grid>
          )}
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            padding: "3rem 0 1rem 0",
          }}
        >
          <Button
            sx={{
              backgroundColor: "#0D2B36",
              width: "100px",
              color: "#fff",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#0D2B36",
                color: "#fff",
              },
            }}
            onClick={checkPartner ? formik1.handleSubmit : formik2.handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Stack>
  );
};

export default SignupContainer;
