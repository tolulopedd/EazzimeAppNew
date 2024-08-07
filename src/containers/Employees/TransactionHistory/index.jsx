"use client";
import React, { useEffect, useState } from "react";
import { Box, Grid, Button, Typography } from "@mui/material";
import ControlledTextField from "@/components/ControlledComponents/ControlledTextField";
import { useFormik } from "formik";
import MUIDataTable from "mui-datatables";
import { FaRegEye } from "react-icons/fa";
import ControlledSelect from "@/components/ControlledComponents/ControlledSelect";
import dayjs from "dayjs";

import { formatAmount } from "@/helpers/utils";

import { useAuth, useLoader } from "@/hooks";
import { fetchTransactionDetails } from "@/api";

const TransactionHistory = () => {
  const { userDetails } = useAuth();
  const { displayLoader, hideLoader } = useLoader();
  const [transac, setTransac] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onSubmit = async (values) => {
    try {
    } catch (err) {}
  };

  useEffect(() => {
    const getTransactions = async () => {
      try {
        displayLoader();
        const transRes = await fetchTransactionDetails(userDetails?.accountid);
        setTransac(transRes?.data?.detailAccount);
      } catch (err) {
        console.log(err);
      } finally {
        hideLoader();
      }
    };
    getTransactions();
  }, [userDetails]);

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
      name: "transaction_date",
      label: "Request Date",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return (
            <Typography>
              {dayjs(value).format("DD/MM/YYYY HH:mm:ss")}
            </Typography>
          );
        },
      },
    },
    {
      name: "transid",
      label: "Trannsaction ID",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "trans_type",
      label: "Transaction Type",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "transaction_amount",
      label: "Amount",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return <Typography>{formatAmount(value)}</Typography>;
        },
      },
    },
    {
      name: "transaction_status",
      label: "Status",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return (
            <Typography
              sx={{
                color: value === "Pending" ? "#EBD40A" : "#43C515",
                fontSize: "0.9em",
              }}
            >
              {value}
            </Typography>
          );
        },
      },
    },
    // {
    //   name: "id",
    //   label: "Action",
    //   options: {
    //     filter: true,
    //     sort: false,
    //     customBodyRenderLite: (dataIndex) => (
    //       <Button
    //         onClick={() => {
    //           // const viewItems = allUsers.find((user) => user.id=== id);
    //           const singleItem = transactionData[dataIndex];
    //           setDetails(singleItem);
    //           //   onOpenUserDetailsModal();
    //         }}
    //       >
    //         <FaRegEye size={15} color="black" />{" "}
    //       </Button>
    //     ),
    //   },
    // },
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

  if (!isClient) {
    return null;
  }

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
          data={transac ? transac : []}
        />
      </Grid>
    </Box>
  );
};

export default TransactionHistory;
