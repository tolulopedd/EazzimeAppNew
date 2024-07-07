import React from "react";
import { Stack, Button, Typography, Box, Grid } from "@mui/material";
import BaseModal from "./BaseModal";
import { MdOutlineInfo } from "react-icons/md";
import { useModal } from "@/hooks";
import { userLogout } from "@/helpers/LogUserOut";

const SessionTimeoutModal = ({
  actionOnClose,
  title,
  message,
  open,
  onClose: onModalClose,
  nonGlobal,
  header,
  icons,
  onClickDone,
  data,
  ...props
}) => {
  const { hideModal } = useModal();

  const onClose = () => {
    actionOnClose && actionOnClose();
    nonGlobal ? onModalClose() : hideModal();
  };

  return (
    <BaseModal
      onClose={onClose}
      open={open}
      nonGlobal={nonGlobal}
      disableBackdropClose
      {...props}
      header={header}
      icons={icons}
    >
      <Stack
        spacing={2}
        sx={{ alignItems: "center", marginTop: "2rem", padding: "1rem" }}
      >
        <MdOutlineInfo size={60} color="#E21313" fontWeight={500} />
        {message && (
          <Grid sx={{ width: "100%" }}>
            <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
              {message}
            </Typography>
          </Grid>
        )}
        <Box sx={{ padding: "2rem" }}>
          <Button
            onClick={() => {
              userLogout();
              onClickDone();
            }}
            variant="contained"
            sx={{
              alignItems: "center",
              textAlign: "center",
              padding: ".7rem",
              fontWeight: "500",
              background: "#D1041C",
              color: "white",
              width: "150px",
              borderRadius: "40px",
              cursor: "pointer",
              marginRight: "1.2rem",
              "&:hover": {
                color: "#fff",
              },
            }}
          >
            Okay{" "}
          </Button>
        </Box>
      </Stack>
    </BaseModal>
  );
};

export default SessionTimeoutModal;
