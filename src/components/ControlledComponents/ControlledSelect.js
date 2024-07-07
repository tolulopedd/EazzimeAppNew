import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  Stack,
  Typography,
} from "@mui/material";
import { get } from "lodash-es";

const ControlledSelect = ({
  formik,
  sx,
  label,
  name,
  disableOnChange,
  options,
  inFieldLabel,
  ...props
}) => {
  return (
    <Stack
      sx={{
        justifyContent: "center",
        m: 1,
        width:"100%",
        // minWidth: 100,
        ...sx,
      }}
      spacing={0.5}
    >
      {!inFieldLabel && (
        <Typography fontWeight={500} fontSize={"0.85rem"}>
          {label}
        </Typography>
      )}
      <FormControl
        sx={{ width:"100%" }}
        variant="outlined"
        fullWidth
        disabled={false}
        error={get(formik.touched, name) && Boolean(get(formik.errors, name))}
        {...props}
      >
        {inFieldLabel && (
          <Typography fontWeight={500} fontSize={"0.85rem"}>
            {label}
          </Typography>
        )}

        <Select
          name={name}
          size="small"
          id={name}
          value={props.value || get(formik.values, name)}
          onChange={!disableOnChange ? formik.handleChange : undefined}
        >
          {options.map(({ value, items }) => (
            <MenuItem value={value} key={value}>
              {items}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {(get(formik.touched, name) && get(formik.errors, name)) || " "}
        </FormHelperText>
      </FormControl>
    </Stack>
  );
};

export default ControlledSelect;
