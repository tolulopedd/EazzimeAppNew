import React from "react";
import { Dialog, DialogContent, Button, Grid, Typography } from "@mui/material";
import { MdOutlineClose } from "react-icons/md";

const ApproveFundRequestModal = ({ children, openPop, setOpenPop, reset }) => {
  return (
    <Dialog
      open={openPop}
      maxWidth={"lg"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <Grid
        container
        sx={{
          opacity: "0.9",
          padding: "2rem 0rem 2rem 2rem",
          width: "100%",
          height: "100%",
        }}
      >
        <Grid
          container
          //   spacing={2}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Grid
            item
            container
            sx={{ width: "80%", display: "flex", justifyContent: "flex-start" }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "#0D2B36",
                fontSize: { lg: "1em", md: "1em", sm: "0.7em", xs: "0.7em" },
                width: "100%",
              }}
            >
              Approve Fund Request
            </Typography>
          </Grid>
          <Grid
            item
            container
            sx={{ width: "20%", display: "flex", justifyContent: "flex-end" }}
          >
            <Button sx={{ width: "10%" }} onClick={() => {
              reset();
              setOpenPop(false)
              }}>
              <MdOutlineClose size={30} color="#0D2B36" />
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default ApproveFundRequestModal;
