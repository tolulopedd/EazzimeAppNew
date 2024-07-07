import * as React from "react";
import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";
import { Box, Input, InputLabel, TextField, FormControl } from "@mui/material";

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      // onValueChange={(formattedValue) => {
      //   onChange({
      //     target: {
      //       name: props.name,
      //       value: formattedValue.value,
      //     },
      //   });
      // }}
      onValueChange={({ formattedValue }) => {
        onChange({
          target: {
            name: props.name,
            value: formattedValue.values,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      allowNegative={false}
      thousandsGroupStyle="thousand"
      inputMode="numeric"
      decimalSeparator="."
      decimalScale={2}
      fixedDecimalScale={true}
    />
  );
});

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default NumericFormatCustom;
