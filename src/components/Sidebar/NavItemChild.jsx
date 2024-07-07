import { ListItemText, ListItemButton } from "@mui/material";
import { MdCircle } from "react-icons/md";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NavItemChild = ({
  title,
  path,
  disabled,
  childClick,
}) => {
  const pathname = usePathname();


  if (disabled) return null;
  return (
    <Link passHref href={path}>
      <ListItemButton
        disableRipple
        selected={pathname === path ? true : false}
        sx={{
          color: "#3d3d3d",
          textIndent: 4,
          paddingLeft:"2rem",
          "&:hover": {
            textDecoration: "underline",
          },
          "&.Mui-selected": {
            color: "primary.main",
            textDecoration: "underline",
          },
        }}
        onClick={childClick}
      >
        <ListItemText
          primaryTypographyProps={{
            variant: "subtitle2",
            sx: {
              alignItems: "center",
              display: "flex",
              marginLeft: "0",
            },
          }}
        >
          <MdCircle size={7} /> {title}
        </ListItemText>
      </ListItemButton>
    </Link>
  );
};

export default NavItemChild;
