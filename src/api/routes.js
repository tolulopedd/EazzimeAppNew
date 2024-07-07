export const routes = {
    getInTouchDemo:"employer",
    userLogin:"auth/login",
    getUserDetails:"user/usr",//get method and append user email
    signup:"user",//put method
    passwordReset:"user",//post method
    getListOfEmployers:"employer",//get method
    createEmployer:"employer",//put method
    updateDashboardInfo:"dashboard/putdashboardinfo",//put method append number
    getDashboardInfo:"dashboard",//get method append user id
    getPartnerDashboardInfo:"partnerDashboard",//get method append user id
    getEmployeeBankDetails:"dashboard/eBankDtls",//get method
    employeeRequestFund:"fundTransfer",//post method
    getTransactionDetails:"fundTransfer",//get method --- append transactionId
}