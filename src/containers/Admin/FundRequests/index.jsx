"use client";
import React, { useEffect, useState } from "react";
import { Box, Grid, Button, Typography } from "@mui/material";
import transactionData from "@/helpers/sampleTransactionList.json";
import MUIDataTable from "mui-datatables";
import { FaRegEye } from "react-icons/fa";
import { useAuth, useLoader } from "@/hooks";
import { fetchAllTransactionForAdmin, fetchListOfFundRequests } from "@/api";
import dayjs from "dayjs";
import _ from "lodash";
import ApproveFundRequestModal from "@/components/Modals/ApproveFundRequestModal";
import FundRequestDetails from "./FundRequestDetails";

const FundRequests = () => {
  const { userData } = useAuth();
  const { displayLoader, hideLoader } = useLoader();
  const [tableData, setTableData] = useState([]);
  const [details, setDetails] = useState({});
  const [openModal, setOpenModal] = useState(false);

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
        const pendingTransactions = sortedDataDesc.filter(
          (item) => item.transaction_status === "Pending"
        );
        setTableData(pendingTransactions);
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
              const singleItem = tableData[dataIndex];
              setDetails(singleItem);
              setOpenModal(true);
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
          padding: "3rem 0 0 1rem",
        }}
      >
        <MUIDataTable options={option} columns={columns} data={tableData} />
      </Grid>

      <ApproveFundRequestModal openPop={openModal} setOpenPop={setOpenModal}>
        <FundRequestDetails details={details} />
      </ApproveFundRequestModal>
    </Box>
  );
};

export default FundRequests;
