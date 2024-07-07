
import { SwipeableDrawer, Drawer, Box } from '@mui/material'
import { useNavToggle, useSectionData } from '@/hooks'
import NavList from './NavList'
import Image from 'next/image'
import NextLink from 'next/link'
import EazziMeLogo from "@/assets/eazzime-footer-logo.png";

const drawerWidth = 290

const Sidebar = ({ swipeable }) => {
  const { sidebarOpen, closeSidebar, openSidebar } = useNavToggle()
  const { section } = useSectionData()

  const DrawerComponent = swipeable ? SwipeableDrawer : Drawer
  const swipeableProps = {
    anchor: 'left',
    open: sidebarOpen,
    onClose: closeSidebar,
    onOpen: openSidebar,
  }
  const baseDrawerProps = {
    variant: 'permanent',
  }
  const drawerProps = swipeable ? swipeableProps : baseDrawerProps

  return (
    <>
      <DrawerComponent
        {...drawerProps}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            bgcolor: '#0D2B36',
            padding: '0 25px 0 50px',
          },
        }}
      >
        <NextLink passHref href={`/${section}`}>
          <Box
            sx={{
              width: 'fit-content',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: 2,
              borderRadius: 2,
              py: 1,
              my: 3.5,
              cursor: 'pointer',
            }}
          >
            <Image
              priority
              width={120}
              height={60}
              src={EazziMeLogo}
              alt="Logo"
            />
          </Box>
        </NextLink>
        <NavList />
      </DrawerComponent>
    </>
  )
}

export default Sidebar
