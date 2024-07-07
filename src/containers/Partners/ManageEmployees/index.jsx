"use client";
import React from "react";
import { Box, Grid, Button } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { FaRegEye } from "react-icons/fa";
import listOfEmployees from "@/helpers/listOfEmployees.json";

const ManageEmployees = () => {
  const columns = [
    {
      name: "sn",
      label: "S/N",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, meta) => {
          return meta.rowIndex + 1;
        },
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "date",
      label: "Date Created",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "id",
      label: "Action",
      options: {
        filter: true,
        sort: false,
        customBodyRenderLite: (dataIndex) => (
          <Button
            onClick={() => {
              // const viewItems = allUsers.find((user) => user.id=== id);
              const singleItem = listOfEmployees[dataIndex];
              setDetails(singleItem);
              //   onOpenUserDetailsModal();
            }}
          >
            <FaRegEye size={15} color="black" />{" "}
          </Button>
        ),
      },
    },
  ];

  const option = {
    rowsPerPageOptions: [5, 10, 20],
    selectableRows: "none",
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Grid
        container
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          //   padding: "3rem 0 0 1rem",
        }}
      >
        <MUIDataTable
          options={option}
          columns={columns}
          data={listOfEmployees}
        />
      </Grid>
    </Box>
  );
};

export default ManageEmployees;
