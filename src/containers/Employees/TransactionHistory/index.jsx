"use client";
import React, { useEffect, useState } from "react";
import { Box, Grid, Button, Typography } from "@mui/material";
import ControlledTextField from "@/components/ControlledComponents/ControlledTextField";
import { useFormik } from "formik";
import MUIDataTable from "mui-datatables";
import { FaRegEye } from "react-icons/fa";
import transactionData from "@/helpers/sampleTransactionList.json";
import ControlledSelect from "@/components/ControlledComponents/ControlledSelect";
import { fetchTransactions } from "@/lib/features/userSlices/gettransactiondetailsSlice";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { formatAmount } from "@/helpers/utils";
import {
  closeLoader,
  openLoader,
} from "@/lib/features/loaderSlice/loaderSlice";

const TransactionHistory = () => {
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const userData = useSelector((state) => state.userLoginDetails?.details);
  const getUserInfoRes = useSelector(
    (state) => state.loggedInUserDetails.details
  );
  const transactionDetailsStatus = useSelector(
    (state) => state.getTransactionDetails.status
  );
  const transactionDetailsRes = useSelector(
    (state) => state.getTransactionDetails.details
  );

  useEffect(() => {
    if (transactionDetailsStatus === "loading") {
      dispatch(openLoader());
    } else {
      dispatch(closeLoader());
      if (transactionDetailsStatus === "success") {
        console.log("success");
      } else if (transactionDetailsStatus !== "success") {
        console.log("failed");
      }
    }
  }, [transactionDetailsStatus]);

  useEffect(() => {
    if (getUserInfoRes?.userDetails?.accountid !== "") {
      const payloadTrans = {
        token: userData.token,
        accountId: getUserInfoRes?.userDetails?.accountid,
      };
      dispatch(fetchTransactions(payloadTrans));
    }
  }, [userData, getUserInfoRes]);
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
          data={transactionDetailsRes?.detailAccount}
        />
      </Grid>
    </Box>
  );
};

export default TransactionHistory;
