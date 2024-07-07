"use client";
import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import EazziMeLogo from "@/assets/eazzime-logo.png";

const pages = ["Partners", "About", "Contact"];
const secondPages = ["Partners", "About", "Contact", "Login", "Signup"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const TopNav = () => {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              padding: "1rem",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "30%",
                display: { lg: "flex", md: "flex" },
                cursor: "pointer",
              }}
              onClick={() => router.push("/")}
            >
              <Image
                src={EazziMeLogo}
                alt="eazzime logo"
                width={100}
                height={50}
              />
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none", lg: "none", sm: "flex" },
                justifyContent: { sm: "flex-end", xs: "flex-end" },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {secondPages.map((secondPage) => (
                  <MenuItem
                    key={secondPage}
                    onClick={() => router.push(`/${secondPage.toLowerCase()}`)}
                  >
                    <Typography textAlign="center">{secondPage}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* <Image src={EazziMeLogo} alt="eazzime logo" width={100} height={50} /> */}
            <Box
              sx={{
                width: "35%",
                display: { xs: "none", md: "flex", sm: "none", lg: "flex" },
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => router.push(`/${page.toLowerCase()}`)}
                  sx={{
                    my: 2,
                    color: "buttonColor.main",
                    display: "block",
                    fontWeight: "600",
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box
              sx={{
                display: { md: "flex", lg: "flex", xs: "none", sm: "none" },
                flexDirection: "column",
                width: "35%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  padding: "0 0 1rem 0",
                }}
              >
                <Typography sx={{ margin: "0 1rem 0 0" }}>
                  Already have an account?
                </Typography>
                <Button
                  variant="outline"
                  sx={{
                    color: "buttonColor.main",
                    border: "2px solid #076085",
                    fontWeight: "600",
                  }}
                  onClick={() =>
                    router.push("/login", undefined, { replace: true })
                  }
                >
                  Login
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ margin: "0 1rem 0 0" }}>
                  Not yet a member?
                </Typography>
                <Button
                  sx={{ color: "buttonColor.main", fontWeight: "600" }}
                  onClick={() =>
                    router.push("/signup", undefined, { replace: true })
                  }
                >
                  Sign up here
                </Button>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default TopNav;
