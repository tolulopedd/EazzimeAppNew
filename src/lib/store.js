import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import getintouchdemoSlice from "./features/getintouchdemoSlice";
import loaderSlice from "./features/loaderSlice/loaderSlice";
import modalSlice from "./features/modalSlice/modalSlice";
import userloginSlice from "./features/authSlices/userloginSlice";
import getuserdetailsSlice from "./features/userSlices/getuserdetailsSlice";
import createpartnerSlice from "./features/signupSlices/createpartnerSlice";
import usersignupSlice from "./features/signupSlices/usersignupSlice";
import employeebankdetailsSlice from "./features/userSlices/employeebankdetailsSlice";
import getuserdashboardinfoSlice from "./features/dasbhoardSlices.js/getuserdashboardinfoSlice";
import updatedashboardSlice from "./features/dasbhoardSlices.js/updatedashboardSlice";
import requestfundSlice from "./features/userSlices/requestfundSlice";
import gettransactiondetailsSlice from "./features/userSlices/gettransactiondetailsSlice";
import passwordresetSlice from "./features/passwordresetSlice/passwordresetSlice";
import getpartnerdashboardinfoSlice from "./features/dasbhoardSlices.js/getpartnerdashboardinfoSlice";
import employeelistSlice from "./features/employeeSlices/employeelistSlice";
const persistConfig = {
  key: "root",
  storage,
  whiteLists: ["userLoginDetails", "loggedInUserDetails", "getUserDashboardInfo"],
};

const reducers = combineReducers({
    contactUsDetails: getintouchdemoSlice,
    userLoginDetails: userloginSlice,
    updatePasswordDetails: passwordresetSlice,
    loggedInUserDetails: getuserdetailsSlice,
    createPartnerDetails:createpartnerSlice,
    createUserDetails:usersignupSlice,
    getEmployeeBankDetails:employeebankdetailsSlice,
    getUserDashboardInfo:getuserdashboardinfoSlice,
    dashUpdateDetails:updatedashboardSlice,
    requestFundDetails:requestfundSlice,
    getTransactionDetails:gettransactiondetailsSlice,
    getPartnerDashboardInfoDetails:getpartnerdashboardinfoSlice,
    employeeListDetails:employeelistSlice,
    loader:loaderSlice,
    modal:modalSlice
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
