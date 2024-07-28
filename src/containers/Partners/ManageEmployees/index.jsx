"use client";
import React, {useEffect, useState} from "react";
import { Box, Grid, Button } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { FaRegEye } from "react-icons/fa";
import listOfEmployees from "@/helpers/listOfEmployees.json";
import { openLoader, closeLoader } from "@/lib/features/loaderSlice/loaderSlice";
import { fetchEmployeeList } from "@/lib/features/employeeSlices/employeelistSlice";
import { useDispatch, useSelector } from "react-redux";

const ManageEmployees = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userLoginDetails?.details);
  const employeeListStatus = useSelector((state) => state.employeeListDetails.status);
  const employeeListRes = useSelector((state) => state.employeeListDetails.details);

  useEffect(() => {
    if (employeeListStatus === "loading") {
      dispatch(openLoader());
    } else {
      dispatch(closeLoader());
      if (employeeListStatus === "success") {
        console.log("success", employeeListRes);
      } else {
        console.log("failed");
      }
    }
  }, [employeeListStatus, employeeListRes]);

  useEffect(() => {
    const payloadTwo = {
      token: userData?.token,
    };
    dispatch(fetchEmployeeList(payloadTwo));
  }, [userData]);

  console.log("employeeListRes", employeeListRes);
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
