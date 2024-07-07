"use client";
import React from "react";
import {
  TextField,
  Stack,
  Typography,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { get } from "lodash-es";
const NewControlledTextField = ({
  loading,
  formik,
  sx,
  InputProps,
  disableOnChange,
  label,
  name,
  type,
  inFieldLabel,
  inputProps,
  onFileSelect,
  prioritizeError,
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
        <Typography fontWeight={500} fontSize={"0.85rem"} color="#fff">
          {label}
        </Typography>
      )}
      <TextField
        fullWidth={false}
        id={name}
        disabled={false}
        name={name}
        size="small"
        autoComplete="off"
        variant="outlined"
        label={inFieldLabel && label}
        type={type || "text"}
        value={props.value || get(formik.values, name)}
        onChange={onChange}
        error={
          prioritizeError ||
          (get(formik.touched, name) && Boolean(get(formik.errors, name)))
        }
        InputProps={{
          endAdornment: loading ? (
            <InputAdornment position="end">
              <CircularProgress size={20} />
            </InputAdornment>
          ) : undefined,
          ...InputProps,
        }}
        helperText={
          prioritizeError ||
          (get(formik.touched, name) && get(formik.errors, name)) ||
          " "
        }
        inputProps={inputProps}
        {...props}
      />
    </Stack>
  );
};

export default NewControlledTextField;
