import { persistor, store } from "./store";
import { resetGetInTouchFields } from "./features/getintouchdemoSlice";
import { logout } from "./features/authSlices/userloginSlice";
import { resetGetUserInfo } from "./features/userSlices/getuserdetailsSlice";
import { resetCreatePartnerFields } from "./features/signupSlices/createpartnerSlice";
import { resetCreateUserFields } from "./features/signupSlices/usersignupSlice";
import { resetBankDataFields } from "./features/userSlices/employeebankdetailsSlice";
import { resetDashboardInfoFields } from "./features/dasbhoardSlices.js/getuserdashboardinfoSlice";
import { resetDashboardUpdateFields } from "./features/dasbhoardSlices.js/updatedashboardSlice";
import { resetRequestFundFields } from "./features/userSlices/requestfundSlice";
import { resetTransactionDetails } from "./features/userSlices/gettransactiondetailsSlice";
import { resetPasswordFields } from "./features/passwordresetSlice/passwordresetSlice";
import { resetPartnerDashboardInfoFields } from "./features/dasbhoardSlices.js/getpartnerdashboardinfoSlice";

const clearLocalStorage = () => {
  return sessionStorage.removeItem("persist:root");
};

const resetstore = async () => {
  await persistor.purge();
  store.dispatch(resetGetInTouchFields());
  store.dispatch(resetGetUserInfo());
  store.dispatch(resetCreatePartnerFields());
  store.dispatch(resetCreateUserFields());
  store.dispatch(resetBankDataFields());
  store.dispatch(resetDashboardInfoFields());
  store.dispatch(resetDashboardUpdateFields());
  store.dispatch(resetRequestFundFields());
  store.dispatch(resetTransactionDetails());
  store.dispatch(resetPasswordFields());
  store.dispatch(resetPartnerDashboardInfoFields());

  await persistor.flush();
  clearLocalStorage();
  store.dispatch(logout());
};

export default resetstore;
