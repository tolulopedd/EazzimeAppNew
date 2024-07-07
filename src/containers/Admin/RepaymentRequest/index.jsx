"use client";
import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import RepaymentList from "@/helpers/repaymentRequestList.json";
import MUIDataTable from "mui-datatables";
import { FaRegEye } from "react-icons/fa";

const RepaymentRequest = () => {
  const [details, setDetails] = useState({});
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
      label: "Employee Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "batchNo",
      label: "Batch Number",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "totalRepaymentAmount",
      label: "Total Repayment Amount",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "date",
      label: "Date",
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
              const singleItem = transactionData[dataIndex];
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
      <Box>
        <Grid
          container
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            padding: "3rem 0 0 1rem",
          }}
        >
          <MUIDataTable
            options={option}
            columns={columns}
            data={RepaymentList}
          />
        </Grid>
      </Box>
    </Box>
  );
};

export default RepaymentRequest;
