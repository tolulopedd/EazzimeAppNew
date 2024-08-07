import { ServiceApi, routes } from "./config";

export const authLogin = async (body) =>
  ServiceApi.post(routes.userLogin, body);

export const userSignup = async (body) => ServiceApi.put(routes.signup, body);

export const ResetPassword = async (body) =>
  ServiceApi.post(routes.passwordReset, body);

export const fetchUserDetails = async (body) =>
  ServiceApi.post(routes.getUserDetails, body);

export const fetchEmployerList = async () =>
  ServiceApi.get(routes.getListOfEmployers);

export const contactUs = async (body) =>
  ServiceApi.post(routes.getInTouchDemo, body);

export const EmployerCreation = async (body) =>
  ServiceApi.put(routes.createEmployer, body);

export const dashboardUpdateDetails = async (body) =>
  ServiceApi.put(routes.updateDashboardInfo, body);

export const fetchEmployeeBankDetails = async (body) =>
  ServiceApi.post(routes.getEmployeeBankDetails, body);

export const fetchDashboardDetails = async (userId) =>
  ServiceApi.get(`${routes.getDashboardInfo}/${userId}`);

export const fetchPartnerDashboardDetails = async (userId) =>
  ServiceApi.get(`${routes.getPartnerDashboardInfo}/${userId}`);

export const requestEmployeeFunding = async (body) =>
  ServiceApi.post(routes.employeeRequestFund, body);

export const fetchTransactionDetails = async (accountId) =>
  ServiceApi.get(`${routes.getTransactionDetails}/${accountId}`);

export const fetchListOfEmployees = async () =>
  ServiceApi.get(routes.getListOfEmployees);


//Admin APIs

export const fetchAdminDashboard = async (body) =>
  ServiceApi.post(routes.getAdminDashoardInfo, body);

export const fetchListOfFundRequests = async (body) =>
  ServiceApi.post(routes.getAllFundRequestByAdmin, body);
export const fundRequestApproval = async (body) =>
  ServiceApi.post(routes.approveFundTransferByAdmin, body);

export const fetchEmployerListForAdmin = async (userId) =>
  ServiceApi.get(`${routes.getEmployerListForAdmin}/${userId}`);

export const employerInfoUpdate = async (body) =>
  ServiceApi.put(routes.updateEmployerInfoByAdmin, body);

export const fetchAllTransactionForAdmin = async (body) =>
  ServiceApi.post(routes.getAllTransactions, body);
