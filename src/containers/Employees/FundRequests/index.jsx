"use client";
import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import ControlledTextField from "@/components/ControlledComponents/ControlledTextField";
import ControlledAmountField from "@/components/ControlledComponents/ControlledAmountField";
import MUIDataTable from "mui-datatables";
import { useFormik } from "formik";
import * as yup from "yup";
import { FaRegEye } from "react-icons/fa";
import { formatAmount } from "@/helpers/utils";
import { enqueueSnackbar } from "notistack";
import dayjs from "dayjs";
import { useAuth, useLoader } from "@/hooks";
import {
  fetchDashboardDetails,
  fetchEmployeeBankDetails,
  fetchTransactionDetails,
  requestEmployeeFunding,
} from "@/api";

const FundRequest = () => {
  const { userDetails } = useAuth();
  const { displayLoader, hideLoader } = useLoader();
  const [isClient, setIsClient] = useState(false);
  const [dashData, setDashData] = useState({});
  const [bankInfo, setBankInfo] = useState({});
  const [transac, setTransac] = useState([]);

  const getBankDetails = async () => {
    const payload = {
      account_key: userDetails?.accountid,
    };
    try {
      displayLoader();
      const bankRes = await fetchEmployeeBankDetails(payload);
      setBankInfo(bankRes?.data?.detailAccount?.[0]);
    } catch (err) {
      console.log(err);
    } finally {
      hideLoader();
    }
  };

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

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        displayLoader();
        const dashRes = await fetchDashboardDetails(userDetails?.accountid);
        setDashData(dashRes?.data.detailAccount?.[0]);
      } catch (err) {
        console.log(err);
      } finally {
        hideLoader();
      }
    };

    getDashboardData();
    getBankDetails();
    getTransactions();
  }, [userDetails]);

  const amountAvailable = dashData?.available_balance;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const validationSchema = yup.object({
    amount: yup
      .number()
      .required("This field is required")
      .min(1000, "The minimum fund you can request is 1000 Naira ")
      .max(
        Number(amountAvailable),
        "You cannot request an amount that is above your available fund"
      ),
  });

  const onSubmit = async (values) => {
    const payload = {
      account_key: userDetails?.accountid,
      requestFundAmount: values?.amount,
    };
    try {
      displayLoader();
      const requestRes = await requestEmployeeFunding(payload);
      enqueueSnackbar(requestRes?.data?.status, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
        autoHideDuration: 5000,
      });
      setFieldValue("amount", "0.00");
      getTransactions();
    } catch (err) {
      console.log(err);
    } finally {
      hideLoader();
    }
  };

  const { setFieldValue, ...formik } = useFormik({
    initialValues: {
      amount: "",
      bank_account: "",
      bank: "",
    },
    validationSchema,
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

  useEffect(() => {
    setFieldValue("bank", bankInfo?.bank);
    setFieldValue("bank_account", bankInfo?.bank_account);
  }, [userDetails, bankInfo]);

  const option = {
    rowsPerPageOptions: [5, 10, 20],
    selectableRows: "none",
  };

  if (!isClient) {
    return null;
  }

  return (
    <Box sx={{ width: "100%", padding: "1rem 2rem 0 2rem" }}>
      <Box>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            sx={{ display: "flex", justifyContent: "flex-start" }}
          >
            <Typography sx={{ fontWeight: "500", fontSize: "1em" }}>
              {`How much do you need today ${
                userDetails?.firstname ? userDetails?.firstname : ""
              }?`}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <Typography sx={{ fontSize: "0.7em", fontWeight: "500" }}>
                Available Fund
              </Typography>
              <Typography
                sx={{
                  background: "#fff",
                  padding: "0.5rem 1rem 0.5rem 1rem",
                  borderRadius: "5px",
                  color: "green.main",
                  fontWeight: "600",
                }}
              >
                {amountAvailable
                  ? formatAmount(amountAvailable)
                  : formatAmount(0)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{
            padding: "2rem 0 0 0",
            display: "flex",
          }}
        >
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <ControlledTextField
              name="amount"
              formik={formik}
              label="Amount"
              size="small"
              type="number"
              placeholder="0.00"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <ControlledTextField
              name="bank_account"
              formik={formik}
              label="Account Number"
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <ControlledTextField
              name="bank"
              formik={formik}
              label="Bank"
              disabled
            />
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            width: "100%",
            padding: "0 0 0 0.5rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid item xs={12} sm={12} md={3} lg={3}>
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
              onClick={formik.handleSubmit}
            >
              Submit
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
            // data={transactionDetailsRes?.detailAccount}
          />
        </Grid>
      </Box>
    </Box>
  );
};

export default FundRequest;
