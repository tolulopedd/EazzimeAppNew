import React from 'react'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'

const MiniLoader = ({size}) => {
  return (
    <Stack minHeight={200} alignItems="center" justifyContent="center">
      <CircularProgress size={size || 60}/> 
    </Stack>
  )
}

export default MiniLoader