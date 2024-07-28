import React from 'react'
import { TextField, Stack, Typography, useTheme } from '@mui/material'
import { withStyles } from '@mui/styles'
import ReactPhoneInput from 'react-phone-input-material-ui';
import { get } from 'lodash-es'

const styles = (theme) => ({
  field: {
    // margin: '10px 0',
    height: '100%',
  },
  countryList: {
    // ...theme.typography.body1,
  },
})

const ControlledPhoneInput = ({
  formik,
  sx,
  classes,
  disableOnChange,
  label,
  name,
  type,
  inFieldLabel,
  inputProps,
  prioritizeError,
  ...props
}) => {
  const theme = useTheme()
  const handleChange = (value) => {
    formik.handleChange({
      target: {
        name,
        value,
      },
    })
  }

  return (
    <Stack
      sx={{
        justifyContent: 'center',
        width:"100%",
        // minWidth: 230,
        // m: 1,
        flexDirection: 'column',
        ...sx,
      }}
      spacing={0.5}
    >
      {!inFieldLabel && (
        <Typography fontWeight={500} fontSize={'0.85rem'}>
          {label}
        </Typography>
      )}
      <ReactPhoneInput
        component={TextField}
        inputProps={{
          variant: 'outlined',
          label: undefined,
          size: 'small',
          id: name,
          name,
          fullWidth: true,
          autoComplete: 'new-password',
          error:
            Boolean(prioritizeError) ||
            (Boolean(get(formik.touched, name)) && Boolean(get(formik.errors, name))),
          helperText:
            prioritizeError ||
            (get(formik.touched, name) && get(formik.errors, name)) ||
            ' ',
          sx: {
            'MuiOutlinedInput-input *': {
              bgcolor: 'red!important',
            },
            '&.form-control': {
              height: '40px!important',
              width: '100%!important',
              // paddingLeft: '39px!important',
              '& .MuiOutlinedInput-input': {
                boxSizing: 'content-box !important',
              },
            },
          },
        }}
        placeholder={''}
        defaultCountry={'ng'}
        // dropdownClass={classes.countryList}
        inputClass={classes.field}
        value={props.value || get(formik.values, name)}
        onChange={disableOnChange ? undefined : handleChange}
        defaultMask={'... .... .... ...'}
        {...props}
      />
    </Stack>
  )
}

export default withStyles(styles)(ControlledPhoneInput)