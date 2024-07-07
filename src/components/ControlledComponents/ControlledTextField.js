"use client";
import React from "react";
import {
  TextField,
  Stack,
  Typography,
  InputAdornment,
  CircularProgress,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import { get } from "lodash-es";
const ControlledTextField = ({
  loading,
  formik,
  sx,
  // InputProps,
  disableOnChange,
  label,
  name,
  type,
  inFieldLabel,
  inputProps,
  onFileSelect,
  prioritizeError,
  variant,
  ...props
}) => {
  const onChange = (e) => {
    if (disableOnChange) {
      return;
    }
    if (type === "file") {
      onFileSelect(e?.target?.files);
    }
    formik.handleChange(e);
  };
  return (
    <Stack
      sx={{
        justifyContent: "center",
        width: "100%",
        m: 1,
        flexDirection: "column",
        ...sx,
      }}
      spacing={0.5}
    >
      {!inFieldLabel && (
        <Typography fontWeight={500} fontSize={"0.85rem"} color="#000">
          {label}
        </Typography>
      )}
      <OutlinedInput
        fullWidth={false}
        id={name}
        disabled={false}
        name={name}
        size="small"
        autoComplete="off"
        variant={variant || "outlined"}
        label={inFieldLabel && label}
        type={type || "text"}
        value={props.value || get(formik.values, name)}
        onChange={onChange}
        error={
          prioritizeError ||
          (get(formik.touched, name) && Boolean(get(formik.errors, name)))
        }
        // InputProps={{
        //   endAdornment: loading ? (
        //     <InputAdornment position="end">
        //       <CircularProgress size={20} />
        //     </InputAdornment>
        //   ) : undefined,
        //   ...InputProps,
        // }}
        // helperText={
        //   prioritizeError ||
        //   (get(formik.touched, name) && get(formik.errors, name)) ||
        //   " "
        // }
        inputProps={inputProps}
        {...props}
      />
      <FormHelperText
        id="outlined-weight-helper-text"
        sx={{ color: "red" }}
      >
        {prioritizeError ||
          (get(formik.touched, name) && get(formik.errors, name)) ||
          " "}
      </FormHelperText>
    </Stack>
  );
};

export default ControlledTextField;
