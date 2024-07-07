import React from 'react'
import {
  FormControl,
 
  Select,
  MenuItem,

  Stack,
  Typography,
} from '@mui/material'
import { get } from 'lodash-es';

const SelectComponent = ({formik, sx, items, name, disableOnChange, options, inFieldLabel, ...props}) => {
  return (
    <Stack sx={{
      justifyContent: 'center', 
      m: 1,
      minWidth: 100, 
      ...sx
      }}
      spacing={0}
      >
      {!inFieldLabel && <Typography fontWeight={500} fontSize={'0.85rem'}>{items}</Typography>}
      <FormControl 
        sx={{ minWidth: 100,  }} 
        variant="outlined"
        fullWidth
       // error={(get(formik.touched, name) && Boolean(get(formik.errors, name)))}
        {...props}
        >
          {inFieldLabel && <Typography fontWeight={500} fontSize={'0.85rem'}>{items}</Typography>}

          <Select
              name={name}
              size="small"
              id={name}
              value={props.value || get(formik.values, name)}
              onChange={!disableOnChange ? formik.handleChange : undefined}
          >
              {options.map(({value, label}) => <MenuItem value={value} key={value}>{label}</MenuItem>)}
              


          </Select>
      </FormControl>
    </Stack>
  )
}

export default SelectComponent