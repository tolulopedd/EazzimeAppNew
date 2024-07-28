"use client";
import React, { useEffect, useState } from "react";
import { Box, Grid, Button, Typography } from "@mui/material";
import ControlledTextField from "@/components/ControlledComponents/ControlledTextField";
import { useFormik } from "formik";
import MUIDataTable from "mui-datatables";
import { FaRegEye } from "react-icons/fa";
import transactionData from "@/helpers/sampleTransactionList.json";
import dayjs from "dayjs";
import { fetchListOfFundRequests } from "@/api";
import { useAuth, useLoader } from "@/hooks";
import _ from "lodash";

const TransactionHistory = () => {
  const { userData } = useAuth();
  const { displayLoader, hideLoader } = useLoader();
  const [tableData, setTableData] = useState([]);

  const { setFieldValue, ...formik } = useFormik({
    initialValues: {
      companyName: "",
      startDate: "",
      endDate: "",
    },
  });

  useEffect(() => {
    const getFundRequestTransaction = async () => {
      const payload = {
        requester_user_key: "15",
      };
      try {
        displayLoader();
        const requestRes = await fetchListOfFundRequests(payload);
        const sortedDataDesc = _.orderBy(
          requestRes?.data?.detailFTAccount,
          ["transaction_date"],
          ["desc"]
        );
        setTableData(sortedDataDesc);
      } catch (err) {
        console.log("errr", err?.response?.data?.status);
      } finally {
        hideLoader();
      }
    };
    getFundRequestTransaction();
  }, []);

  const columns = [
    {
      name: "s/n",
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
      label: "Date",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return (
            <Typography>
              {dayjs(value).format("YYYY-MM-DD HH:mm:ss")}
            </Typography>
          );
        },
      },
    },
    {
      name: "transid",
      label: "Transaction ID",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "trans_type",
      label: "Type",
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
      },
    },
    {
      name: "transaction_status",
      label: "Status",
      options: {
        filter: true,
        sort: false,
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
    //           const singleItem = tableData[dataIndex];
    //           setDetails(singleItem);
    //           setOpenModal(true);
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


  return (
    <Box sx={{ width: "100%", padding: "1rem 2rem 0 2rem" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={3} lg={4}>
          <ControlledTextField
            name="companyName"
            formik={formik}
            label="Name of Organization"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <ControlledTextField
            name="startDate"
            formik={formik}
            label="Start Date"
            type="date"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <ControlledTextField
            name="endDate"
            formik={formik}
            label="End Date"
            type="date"
          />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "2rem 0 0 0",
        }}
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

      <Grid
        container
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "3rem 0 0 1rem",
        }}
      >
        <MUIDataTable options={option} columns={columns} data={tableData} />
      </Grid>
    </Box>
  );
};

export default TransactionHistory;
