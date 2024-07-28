import axios from "axios";

export const ServiceApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASEURL}`, //for https deployment
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export const authorizeServiceApi = (token) => {
  const modifiedToken = `"${token}"`
  ServiceApi.defaults.headers.common["Authorization"] = `Bearer ${modifiedToken}`;
};

export const unauthorizeServiceApi = () => {
  ServiceApi.defaults.headers.common["Authorization"] = undefined;
};

export const routes = {
  getInTouchDemo: "employer",
  userLogin: "auth/login",
  getUserDetails: "user/usr", //get method and append user email
  signup: "user", //put method
  passwordReset: "user", //post method
  getListOfEmployers: "employer", //get method
  createEmployer: "employer", //put method
  updateDashboardInfo: "dashboard/putdashboardinfo", //put method append number
  getDashboardInfo: "dashboard", //get method append user id
  getPartnerDashboardInfo: "partnerDashboard", //get method append user id
  getEmployeeBankDetails: "dashboard/eBankDtls", //get method
  employeeRequestFund: "fundTransfer", //post method
  getTransactionDetails: "fundTransfer",
  getListOfEmployees: "partnerDashboard",
  getAdminDashoardInfo:"dashboard", //post method
  getAllFundRequestByAdmin:"fundTransfer/admin",
  approveFundTransferByAdmin:"fundTransfer/approve/ftr", //post method
  getEmployerListForAdmin:"superAdmin",//append id --get
  updateEmployerInfoByAdmin: "superAdmin", //put
  getAllTransactions:"superAdmin/admin" //get
};
