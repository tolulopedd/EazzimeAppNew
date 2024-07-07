import React from "react";
import Image from "next/image";
import { Box, Button, Grid, Typography } from "@mui/material";
import HandShake from "@/assets/handshake-icon.png";

const PartnerWithUs = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: {
          lg: "2rem 2rem 5rem 2rem",
          md: "2rem 2rem 5rem 2rem",
          sm: "2rem 1rem 5rem 1rem",
          xs: "2rem 1rem 5rem 1rem",
        },
      }}
    >
      <Box
        sx={{
          width: { lg: "80%", md: "80%", sm: "90%", xs: "90%" },
          background: "#26AAE0",
          borderRadius: "40px",
          padding: { lg: "3rem", md: "2rem", sm: "1.5rem", xs: "1.5rem" },
        }}
      >
        <Box sx={{ padding: "0 0 3rem 0" }}>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Image src={HandShake} alt="hand-shake" width={70} height={50} />
          </Box>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Typography
              sx={{
                fontSize: "1.5em",
                fontWeight: "500",
                textAlign: "center",
                color: "#fff",
              }}
            >
              Partner with us
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            padding: "0 0 3rem 0",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "0.8em",
              color: "#fff",
              width: { lg: "75%", md: "80%", sm: "90%", xs: "90%" },
            }}
          >
            Implementing an on-demand pay system can streamline payroll
            processes for employers. Rather than adhering to rigid pay
            schedules, employers can adopt more flexible payment systems that
            align with employees&apos; preferences. This can reduce administrative
            burdens associated with payroll processing and potentially lower
            overhead costs for the organization.
          </Typography>
        </Box>

        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{
              padding: "0.5rem 1rem 0.5rem 1rem ",
              backgroundColor: "secondary.main",
              color: "#fff",
            }}
          >
            Request for a demo
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PartnerWithUs;
