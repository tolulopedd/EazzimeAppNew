"use client";
import React from "react";
import { Button, ListItemIcon, Menu, MenuItem } from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks";

const OptionsMenu = ({ anchorEl, open, onClose }) => {
  const {signOut} = useAuth()
  const router = useRouter();
  const logOutUser = async () => {
    router.push("/");
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={onClose}
        onClick={onClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiList-root": {
              pt: 0,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <ListItemIcon>
            <LogoutIcon color="primary" />
          </ListItemIcon>
          <Button underline="none" onClick={signOut}>
            Logout
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
};

export default OptionsMenu;
