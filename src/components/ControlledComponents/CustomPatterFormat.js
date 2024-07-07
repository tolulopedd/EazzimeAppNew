import * as React from "react";
import { PatternFormat } from "react-number-format";
import { useMediaQuery } from "@mui/material";

import PropTypes from "prop-types";

const CustomPatternFormat = React.forwardRef(function CustomPatternFormat(
  props,
  ref
) {
  const { onChange, ...other } = props;

  const matches = useMediaQuery("(max-width:800px)");

  return (
    <PatternFormat
      {...other}
      getInputRef={ref}
      inputMode="numeric"
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      format="####  -  ####  -  ####  -  ####  -  ####"
      mask="_"
      style={{
        fontWeight: "500",
        fontSize: matches ? "0.7em" : "1em",
        color: "#A1A9BB",
        width: "100%",
      }}
    />
  );
});

CustomPatternFormat.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomPatternFormat;
