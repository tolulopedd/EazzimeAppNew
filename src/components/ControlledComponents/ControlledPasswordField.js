import React from "react";
import {
  Stack,
  Typography,
  Input,
  FormHelperText,
  TextField,
  OutlinedInput
} from "@mui/material";
import { get } from "lodash-es";

const ControlledPasswordField = ({
  loading,
  formik,
  sx,
  disableOnChange,
  endAdornment,
  label,
  name,
  type,
  inFieldLabel,
  inputProps,
  onFileChange,
  prioritizeError,
  ...props
}) => {
  const handleFileChange = (e) => {
    const { files } = e.currentTarget;
    onFileChange(files);
    formik.handleChange(e);
  };
  return (
    <Stack
      sx={{
        justifyContent: "center",
        width:"100%",
        // minWidth: 230,
        m: 1,
        flexDirection: "column",
        ...sx,
      }}
      spacing={0.5}
    >
      {!inFieldLabel && (
        <Typography fontWeight={500} fontSize={"0.85rem"}>
          {label}
        </Typography>
      )}
      <OutlinedInput
        fullWidth={false}
        id={name}
        name={name}
        size="small"
        // variant="outlined"
        label={inFieldLabel && label}
        type={type || "text"}
        value={props.value || get(formik.values, name)}
        onChange= {(e) => {
          if(disableOnChange){
            console.log(null);
          }else{
            if(type === "file"){
              handleFileChange(e);
            }else{
              formik.handleChange(e);
            }
          }
        }}
        error={
          prioritizeError ||
          (get(formik.touched, name) && Boolean(get(formik.errors, name)))
        }
        inputProps={inputProps}
        endAdornment={endAdornment}
        {...props}
      />
      <FormHelperText id="outlined-weight-helper-text" sx={{color:"red"}}>
        {prioritizeError ||
          (get(formik.touched, name) && get(formik.errors, name)) ||
          " "}
      </FormHelperText>
    </Stack>
  );
};

export default ControlledPasswordField;
