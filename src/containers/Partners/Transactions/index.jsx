"use client";
import React from "react";
import { Box, Grid, Button } from "@mui/material";
import ControlledTextField from "@/components/ControlledComponents/ControlledTextField";
import { useFormik } from "formik";
import MUIDataTable from "mui-datatables";
import { FaRegEye } from "react-icons/fa";
import transactionData from "@/helpers/sampleTransactionList.json";
import ControlledSelect from "@/components/ControlledComponents/ControlledSelect";

const Transactions = () => {
  const onSubmit = async (values) => {
    try {
    } catch (err) {}
  };

  const { setFieldValue, ...formik } = useFormik({
    initialValues: {
      requestId: "",
      transactionStatus: "",
    },
    onSubmit,
  });

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
      name: "requestId",
      label: "Request ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "userId",
      label: "User ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "amount",
      label: "Amount",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "requestDate",
      label: "Request Date",
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

  const dropDownValues = [
    {
      id: 1,
      value: "Pending",
    },
    {
      id: 2,
      value: "Success",
    },
  ];

  const tansactionOptions = dropDownValues.map((item) => {
    return {
      items: item.value,
      value: item.value,
      id: item.id,
    };
  });

  return (
    <Box sx={{ width: "100%", padding: "1rem 2rem 0 2rem" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <ControlledTextField
            name="requestId"
            formik={formik}
            label="Request ID"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <ControlledSelect
            name="transactionStatus"
            formik={formik}
            label="Transaction Status"
            options={tansactionOptions}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          lg={3}
          sx={{ display: "flex", alignItems: "center", margin: "0 0 0 1rem" }}
        >
          <Button
            sx={{
              backgroundColor: "black.main",
              color: "#fff",
              width: "100px",
              "&:hover": {
                backgroundColor: "black.main",
                color: "#fff",
              },
            }}
          >
            Search
          </Button>
        </Grid>
      </Grid>

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
          data={transactionData}
        />
      </Grid>
    </Box>
  );
};

export default Transactions;
