"use client";
import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import ControlledTextField from "@/components/ControlledComponents/ControlledTextField";
import ControlledAmountField from "@/components/ControlledComponents/ControlledAmountField";
import MUIDataTable from "mui-datatables";
import { useFormik } from "formik";
import * as yup from "yup";
import transactionData from "@/helpers/sampleTransactionList.json";
import { FaRegEye } from "react-icons/fa";
import { fetchBankDetails } from "@/lib/features/userSlices/employeebankdetailsSlice";
import {
  openLoader,
  closeLoader,
} from "@/lib/features/loaderSlice/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { formatAmount } from "@/helpers/utils";
import {
  fundRequest,
  resetRequestFundFields,
} from "@/lib/features/userSlices/requestfundSlice";
import { enqueueSnackbar } from "notistack";
import { fetchTransactions } from "@/lib/features/userSlices/gettransactiondetailsSlice";
import dayjs from "dayjs";

const FundRequest = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [isClient, setIsClient] = useState(false);
  const userData = useSelector((state) => state.userLoginDetails?.details);
  const transactionDetailsStatus = useSelector(
    (state) => state.getTransactionDetails.status
  );
  const transactionDetailsRes = useSelector(
    (state) => state.getTransactionDetails.details
  );
  const requestFundStatus = useSelector(
    (state) => state.requestFundDetails.status
  );
  const requestFundRes = useSelector(
    (state) => state.requestFundDetails.details
  );
  const getUserInfoRes = useSelector(
    (state) => state.loggedInUserDetails.details
  );

  const dashboardInfoRes = useSelector(
    (state) => state.getUserDashboardInfo.details
  );
  const employeeBankDetailsStatus = useSelector(
    (state) => state.getEmployeeBankDetails.status
  );
  const employeeBankDetailsRes = useSelector(
    (state) => state.getEmployeeBankDetails.details
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
    if (employeeBankDetailsStatus === "loading") {
      dispatch(openLoader());
    } else {
      dispatch(closeLoader());
      if (employeeBankDetailsStatus === "success") {
        console.log("success");
      } else if (employeeBankDetailsStatus !== "success") {
        console.log("failed");
      }
    }
  }, [employeeBankDetailsStatus]);

  useEffect(() => {
    const payload = {
      token: userData?.token,
      account_key: getUserInfoRes?.userDetails?.accountid,
    };
    dispatch(fetchBankDetails(payload));
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const validationSchema = yup.object({
    amount: yup.string().required("This field is required"),
  });

  const onSubmit = async (values) => {
    console.log("values", values);
    setData(values);
  };

  const { setFieldValue, ...formik } = useFormik({
    initialValues: {
      amount: "0.00",
      bank_account: "",
      bank: "",
    },
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    if (getUserInfoRes?.userDetails?.accountid !== "") {
      const payloadTrans = {
        token: userData.token,
        accountId: getUserInfoRes?.userDetails?.accountid,
      };
      dispatch(fetchTransactions(payloadTrans));
    }
  }, [userData, getUserInfoRes]);

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

  const checkRequestFundRes = /successfully/.test(requestFundRes?.status);

  useEffect(() => {
    const payloadTrans = {
      token: userData.token,
      accountId: getUserInfoRes?.userDetails?.accountid,
    };
    if (requestFundStatus === "loading") {
      dispatch(openLoader());
    } else {
      dispatch(closeLoader());
      if (checkRequestFundRes) {
        enqueueSnackbar(requestFundRes?.status, {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          autoHideDuration: 5000,
        });
        setFieldValue("amount", "0.00");
        dispatch(resetRequestFundFields());
        dispatch(fetchTransactions(payloadTrans));
      }
      if (formik.values.amount !== "0.00" && !checkRequestFundRes) {
        enqueueSnackbar("Fund Request is not successful!", {
          variant: "info",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          autoHideDuration: 5000,
        });
      }
    }
  }, [requestFundStatus, checkRequestFundRes]);

  useEffect(() => {
    if (data?.amount) {
      const payloadData = {
        account_key: getUserInfoRes?.userDetails?.accountid,
        requestFundAmount: `${data?.amount}`,
        token: userData?.token,
      };
      dispatch(fundRequest(payloadData));
    }
  }, [data]);

  useEffect(() => {
    setFieldValue("bank", employeeBankDetailsRes?.detailAccount[0].bank);
    setFieldValue(
      "bank_account",
      employeeBankDetailsRes?.detailAccount[0].bank_account
    );
  }, [employeeBankDetailsRes]);

  const amountAvailable = dashboardInfoRes?.detailAccount[0]?.available_balance;

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
              {`How much do you need today ${getUserInfoRes?.userDetails?.firstname}?`}
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
                {formatAmount(amountAvailable)}
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
            data={transactionDetailsRes?.detailAccount}
          />
        </Grid>
      </Box>
    </Box>
  );
};

export default FundRequest;
