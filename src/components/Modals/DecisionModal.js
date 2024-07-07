import { Stack, Box, Button, Typography } from "@mui/material";
import React from "react";
import BaseModal from "./BaseModal";
import { FaQuestion } from "react-icons/fa";

const DecisionModal = ({
  actionOnClose,
  title,
  message,
  open,
  onClose: onModalClose,
  nonGlobal,
  header,
  icons,
  onClickYes,
  onClickNo,
  actionObject,
  handleDataChange,
  data,
  errors,
  ...props
}) => {
  

  
  const onClose = () => {
    actionOnClose && actionOnClose();
    nonGlobal ? onModalClose() : hideModal();
  };

  

  return (
    <BaseModal
      onClose={onClose}
      open={open}
      nonGlobal={nonGlobal}
      {...props}
      header={header}
      icons={icons}
    >
      <Stack
        spacing={2}
        sx={{
          alignItems: "center",
          justifyContent: "center",
          padding: "2.5rem",
        }}
      >
        <FaQuestion size={50} color="#E21313"/>

        {message && (
          <Typography variant="h6" align="center">
            {message}
          </Typography>
        )}
        <Box sx={{ padding: "2rem", display: "flex" }}>
          <Button
            onClick={onClickNo}
            sx={{
              alignItems: "center",
              textAlign: "center",
              padding: ".5rem",
              background: "#D1041C",
              color: "white",
              width: "100%",
              borderRadius: "20px",
              marginRight: "1.2rem",
              "&:hover": {
                color: "#fff",
              },
            }}
            variant="contained"
          >
            No{" "}
          </Button>

          <Button
            onClick={onClickYes}
            sx={{
              alignItems: "center",
              textAlign: "center",
              padding: ".5rem",
              background: "#fff",
              color: "#D1041C",
              width: "100%",
              borderRadius: "20px",
              fontWeight: "bold",

              "&:hover": {
                color: "#fff",
              },
            }}
            variant="contained"
          >
            Yes{" "}
          </Button>
        </Box>
      </Stack>
    </BaseModal>
  );
};

export default DecisionModal;
