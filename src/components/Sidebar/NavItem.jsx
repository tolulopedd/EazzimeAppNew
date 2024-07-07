"use client";
import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ListItemButton, ListItemIcon, SvgIcon } from "@mui/material";
import { FaCircleNotch } from "react-icons/fa";

const NavItem = ({ path, icon, title }) => {
  const router = useRouter();
  const pathName = usePathname()
  const match = path?.split("/")[2] === pathName?.split("/")[2];

  const buttonStyle = {
    "&.MuiListItemButton-root": {
      width: "319px",
    },
    "&:hover": {
      bgcolor: "secondary.main",
      color: "primary.main",
    },
    "&. MuiListItemText-root": {
      border: "1px solid red",
      color: "#3d3d3d",
      fontSize: "1.3em",
      "&:hover": {
        color: "primary.main",
      },
    },
    "&.MuiListItemIcon-root": {
      color: "#3d3d3d",
      fontSize: "1.3em",
      "&:hover": {
        color: "primary.main",
      },
    },
    "&.Mui-selected": {
      bgcolor: "secondary.main",
      color: "primary.main",
      "&:hover": {
        bgcolor: "secondary.main",
        color: "primary.main",
      },
      "&.MuiListItemIcon-root": {
        color: "#3d3d3d",
        "&:hover": {
          color: "primary.main",
        },
      },
    },
  };

  return (
    <Link passHref href={path}>
      <ListItemButton
        sx={{
          color: "white",
          my: 2,
          py: 1.4,
          borderRadius:"5px",
          "&:hover": {
            bgcolor: "primary.dark",
          },
          "&.Mui-selected": {
            bgcolor: "secondary.main",
            color: "#fff",
            "&:hover": {
              bgcolor: "secondary.main",
              color: "#fff",
            },
            "&.MuiListItemIcon-root": {
              color: "#3d3d3d",
              "&:hover": {
                color: "primary.main",
              },
            },
          },
        }}
        selected={Boolean(match)}
      >
        <ListItemIcon
          sx={{
            color: "white",
            fontSize: "1em",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {icon || FaCircleNotch}
        </ListItemIcon>
        {title || ""}
      </ListItemButton>
    </Link>
  );
};

export default NavItem;
