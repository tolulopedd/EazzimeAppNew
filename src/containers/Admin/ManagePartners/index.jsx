"use client";
import React, { useEffect, useState } from "react";
import { Box, Grid, Button, Typography } from "@mui/material";
import partners from "@/helpers/listOfPartners.json";
import MUIDataTable from "mui-datatables";
import { FaRegEye } from "react-icons/fa";
import { useAuth, useDisclosure, useLoader } from "@/hooks";
import { fetchEmployerListForAdmin, fetchUserDetails } from "@/api";
import dayjs from "dayjs";
import UpdatePartnerModal from "@/components/Modals/UpdatePartnerModal";
import UpdatePartner from "./UpdatePartner";

const ManagePartners = () => {
  const { userData } = useAuth();
  const { displayLoader, hideLoader } = useLoader();
  const [partners, setPartners] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [details, setDetails] = useState({});

  useEffect(() => {
    const fetchUserInfo = async () => {
      const payload = {
        userEmail: userData?.email,
      };
      try {
        displayLoader();
        const res = await fetchUserDetails(payload);
        setUserInfo(res?.data?.userDetails);
      } catch (err) {
        console.log("err", err);
      } finally {
        hideLoader();
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (Object.keys(userInfo)?.length > 0) {
      const fetchPartnersList = async () => {
        try {
          const userId = "15";
          displayLoader();
          const partnersRes = await fetchEmployerListForAdmin(userId);
          setPartners(partnersRes?.data?.employerDetails);
        } catch (err) {
          console.log("err", err);
        } finally {
          hideLoader();
        }
      };
      fetchPartnersList();
    }
  }, [userInfo]);

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
      name: "employername",
      label: "Name Of Organization",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "numberofemployees",
      label: "No. Of Employees",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "employer_key",
      label: "Employer key",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "date_created",
      label: "Date Created",
      options: {
        filter: true,
        sort: false,
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
      name: "activestatus",
      label: "Active Status",
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
              const singleItem = partners[dataIndex];
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
        <MUIDataTable options={option} columns={columns} data={partners} />
      </Grid>

      <UpdatePartnerModal
        openPop={openModal}
        setOpenPop={setOpenModal}
      >
        <UpdatePartner details={details}/>
      </UpdatePartnerModal>
    </Box>
  );
};

export default ManagePartners;
