import React from 'react'
import { Box, List } from '@mui/material'
import NavItem from './NavItem'
// import pathList from '../../helpers/customerPathList'
import { useSectionData } from '../../hooks/useSectionData'

const NavList = () => {
  const { getPathList } = useSectionData()
  const pathList = getPathList()
  return (
    <Box
      sx={{
        minHeight: '100px',
        width: '100%',
      }}
    >
      <List>
        {pathList.map((props) => (
          <NavItem {...props} key={props.path} />
        ))}
      </List>
    </Box>
  )
}

export default NavList;
