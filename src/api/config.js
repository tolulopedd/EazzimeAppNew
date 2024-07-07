import axios from "axios";

export const ServiceApi = axios.create({
  baseURL: "https://teller-test.ubagroup.com:7010/v1/api/", //for https deployment
  headers: {
    "Content-Type": "application/json",
    "accept": "application/json",
    "CHANNELID": "ciim-admin",
    "SIGNATURE": "f2f876b4",
    "REQUESTID": "51a68eaa-3150-4445-b15d-71179f6a5c77",
    HOSTIP: `${process.env.NEXT_PUBLIC_HOST_ID}`,
  },
});

export const UserApi = axios.create({
  baseURL: "https://teller-test.ubagroup.com:7008/v1/api/", //for https deployment

  headers: {
    "Content-Type": "application/json",
    " accept": "application/json",
    " CHANNELID": "ciim-admin",
    "SIGNATURE": "f2f876b4",
    "REQUESTID": "51a68eaa-3150-4445-b15d-71179f6a5c77",
    HOSTIP: `${process.env.NEXT_PUBLIC_HOST_ID}`,
  },
});

export const AuthenticationApi = axios.create({
  baseURL: "https://teller-test.ubagroup.com:7013/v1/api/", //for https deployment

  headers: {
    "Content-Type": "application/json",
    "accept": "application/json",
    "CHANNELID": "ciim-admin",
    "SIGNATURE": "f2f876b4",
    "REQUESTID": "51a68eaa-3150-4445-b15d-71179f6a5c77",
    HOSTIP: `${process.env.NEXT_PUBLIC_HOST_ID}`,
  },
});


export const AuthenticateToken = axios.create({
  baseURL:"https://10.100.67.74:7007/api/",
  headers: {
    "Content-Type": "application/json",
    "accept": "application/json",
  },
});

export const authorizeServiceApi = (token) => {
  ServiceApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  AuthenticationApi.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${token}`;
  UserApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const unauthorizeServiceApi = () => {
  ServiceApi.defaults.headers.common["Authorization"] = undefined;
  AuthenticationApi.defaults.headers.common["Authorization"] = undefined;
  UserApi.defaults.headers.common["Authorization"] = undefined;
};

export const routes = {
  //Authentication
  login: "Access/login",
  refreshToken: "Access/refreshtoken",
  logout: "Access/logout",
  verifyOtp: "UserAccess/authenticateuserviatoken",
  terminateActiveSession: "Access/kill-session",
  allEnums: "Enum/card-approval-status",
  // Settings ,
  stockConfiguration: "Settings/stock-configuration",
  getStockConfiguration: "Settings/get-stock-configuration",
  editStockConfig: "Settings/edit-stock-configuration",
  bulkStockConfiguration: "Settings/bulk-stock-configuration",
  bulkEditStockConfiguration:"Settings/bulk-edit-stock-configuration",
  enrollSupplier: "Settings/enroll-supplier",
  viewEnrolledSupplier: "Settings/view-enrolled-supplier",
  cardCharge: "Settings/card-charge-setup",
  viewCharges: "Settings/view-charges",
  enrollVendors: "Settings/enroll-vendors",
  viewVendors: "Settings/view-vendors",
  getApprovalRequest: "Settings/get-authorization-request",
  approveUpdate: "Settings/updates-authorization",
  branchDetails: "Settings/get-branch-details",

  //   Report (get)
  branchReport: "Report/branch-report",
  cardDistributionByBranchCode: "Report/get-card-distributions-by-branchcode",
  getAllCardDistribution: "Report/get-all-card-distributions",
  cardInventory: "Report/card-inventory",
  cardInventoryByBatchNumber: "Report/card-inventory-by-batch-number",
  getTransactions: "CardRequest/get-transactions",
  // Card Request
  adminCardRequest: "CardRequest/admin-card-requests",
  adminCardRequestApproval: "CardRequest/admin-card-request-approval",
  adminCardRequestDispatch: "CardRequest/admin-card-request-dispatch",
  adminMakeCardRequest: "CardRequest/admin-make-cards-request",
  getCardRequestsByAdmin: "CardRequest/card-requests-by-admin",
  dashboard: "CardRequest/dashboard",
  //   Stock 
  getStocks: "Stock/stocks",
  adminAddStocks: "Stock/admin-add-stock",
  confirmSupplierStocks: "Stock/admin-confirm-stock",
  // TOKEN
  getToken: "Access/get-tellerworld-token", //Auth header
  // Suppliers Api
  getSuppliers: "Suppliers/get-suppliers", //UserApi
  addSupplier: "Suppliers/add-supplier",
  editSuplier: "Suppliers/update-suppliers",
  // CardTypesCreate Api
  getCardTypes: "CardType/get-card-types", //append branch code
  createCardTypes: "CardType/add-new-cardType",
  deleteCardType: "CardType/delete-cardType", //userApi
  updateCardType: "CardType/update-cardType",
  activateDeactivateCardType:"CardType/activate-deactivate-cardtype",
  // Card Issuers
  getIssuingVendors: "IssuingVendor/get-IssuingVendor",
  updateIssuingVendors: "IssuingVendor/update-IssuingVendor",
  addIssuingVendor: "IssuingVendor/add-IssuingVendor",
};
