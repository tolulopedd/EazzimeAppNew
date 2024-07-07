"use client";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#26AAE0",
    },
    secondary: {
      main: "#F2825D",
      contrastText: "#fff",
    },
    buttonColor:{
        main:"#076085",
    },
    background: {
      default: "#fff",
      paper: "#fff",
      contrastText: "#3D3D3D",
    },
    olive: {
      main: "#82850C",
    },
    green:{
        main: "#42E673",
    },
    black: {
      main: "#0D2B36",
    },
    paleOrange: {
      main: "#F2B49F",
      contrastText: "#3D3D3D",
    },
  },
  components: {
    MuiListItemButton: {
      defaultProps: {
        disableTouchRipple: true,
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#FFF",
          color: "#3D3D3D",
          boxShadow:"none"
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: "#FFFFFF",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          background: "#F5F5F5",
        },
      },
    },
    MUIDataTableBodyCell: {
      styleOverrides: {
        root: {
          fontWeight: "400",
          fontSize: "0.756rem",
          lineHeight: 1.4,
        },
      },
    },
  },

  typography: {
    fontFamily: "Raleway",
    h1: {
      fontWeight: 600,
      fontSize: "3rem",
      lineHeight: 1.5,
      fontFamily: "Raleway, sans-serif",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2.25rem",
      lineHeight: 1.5,
      fontFamily: "Raleway, sans-serif",
    },
    h3: {
      fontWeight: 600,
      fontSize: "2rem",
      lineHeight: 1.5,
      fontFamily: "Raleway, sans-serif",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.5,
      fontFamily: "Raleway, sans-serif",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.125rem",
      lineHeight: 1.5,
      fontFamily: "Raleway, sans-serif",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: 1.5,
      fontFamily: "Raleway, sans-serif",
    },
    body1: {
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.5,
      fontFamily: "Raleway, sans-serif",
    },
    body2: {
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.6,
      fontFamily: "Raleway, sans-serif",
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: "1rem",
      lineHeight: 1.75,
      fontFamily: "Raleway, sans-serif",
      letterSpacing: 0,
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.75,
      fontFamily: "Raleway, sans-serif",
      letterSpacing: 0,
    },
    subtitle3: {
      fontWeight: "bold",
      fontSize: "1.1rem",
      lineHeight: 1.75,
      fontFamily: "Raleway, sans-serif",
      letterSpacing: 0,
    },
    subtitle2lg: {
      fontWeight: 500,
      fontSize: "1rem",
      lineHeight: 1.75,
      fontFamily: "Raleway, sans-serif",
      letterSpacing: 0,
    },
    caption: {
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 1.6,
      fontFamily: "Raleway, sans-serif",
      letterSpacing: 0,
    },
    overline: {
      fontWeight: 600,
      fontSize: "0.75rem",
      lineHeight: 2.46,
      fontFamily: "Raleway, sans-serif",
      letterSpacing: "1px",
      textTransform: "uppercase",
    },
    button: {
      textTransform: "none",
    },
  },
});
