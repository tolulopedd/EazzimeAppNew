"use client";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  authorizeServiceApi,
  unauthorizeServiceApi,
} from "../api/config";
import dayjs from "dayjs";
import ShowLoader from "@/components/Loader/ShowLoader";
import SessionTimeoutModal from "@/components/Modals/SessionTimeoutModal";
import secureLocalStorage from "react-secure-storage";
import { useLoader, useDisclosure } from "@/hooks";
import { fetchUserDetails } from "@/api";
const TOKEN_VALIDITY_PERIOD = 76000;
const UNAUTH_ROUTES = ["/", "/login", "/signup", "/forgot-password"];

export const AuthContext = React.createContext({});

const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const { displayLoader, hideLoader } = useLoader();
  const [enumTypes, setEnumTypes] = useState([]);
  const [counter, setCounter] = useState(0);

  const {
    isOpen: isOpenSessionTimeoutModal,
    onOpen: onOpenSessionTimeoutModal,
    onClose: onCloseSessionTimeoutModal,
  } = useDisclosure();

  const router = useRouter();
  const pathname = usePathname();

  const signIn = useCallback(
    async (authData) => {
      const payload ={
        userEmail:authData?.data?.email
      }
      displayLoader();
      const auth = {
        ...authData,
        token: authData?.data?.token,
        expires: dayjs().add(TOKEN_VALIDITY_PERIOD, "s").toISOString(),
      };
      const res = await fetchUserDetails(payload);
      setUserDetails(res?.data?.userDetails)
      sessionStorage.setItem("auth", btoa(JSON.stringify(auth)));
      authorizeServiceApi(authData?.data?.token);
      setUserData(auth);
      setIsSignedIn(true);
      secureLocalStorage.setItem("lunas", auth);
      if(authData?.data?.role === 1){
        router.push("/employee/dashboard", undefined, { replace: true });

      }else if(authData?.data?.role === 2){
        router.push("/partner/dashboard", undefined, { replace: true });
      }else if(authData?.data?.role === 3){
        router.push("/admin/dashboard", undefined, { replace: true });
      }
      setLoading(false);
      hideLoader();
    },
    [displayLoader, hideLoader, router]
  );



  const signOut = useCallback(() => {
    sessionStorage.removeItem("auth");
    secureLocalStorage.removeItem("lunas");
    unauthorizeServiceApi();
    setUserData(null);
    setUserDetails(null);
    setIsSignedIn(false);
    setLoading(false);
    setCounter(0);
  }, []);


  const checkIfPreviousAuth = useCallback(() => {
    const authValue = secureLocalStorage.getItem("lunas");
    if (authValue) {
      const auth = authValue;
      const tokenExpires = dayjs(auth.expires);
      if (tokenExpires.isAfter(dayjs()) && auth.token) {
        authorizeServiceApi(auth.token);
        setUserData(auth);
        setIsSignedIn(true);
        setLoading(false);
        return;
      } else {
        signOut();
      }
    }
    setIsSignedIn(false);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!isSignedIn && !loading && !UNAUTH_ROUTES.includes(pathname)) {
      router.push("/", undefined, { replace: true });
    }
  }, [isSignedIn]);

  useEffect(() => {
    checkIfPreviousAuth();
  }, [checkIfPreviousAuth]);

  useEffect(() => {
    if (isSignedIn) {
      const checkSessionExpired = () => {
        const tokenExpires = dayjs(userData.expires);
        if (tokenExpires.isBefore(dayjs())) {
          onOpenSessionTimeoutModal();
        }
      };
      const interval = setInterval(checkSessionExpired, 30000);
      return () => clearInterval(interval);
    }
  }, [userData]);

  // useEffect(() => {
  //   if (!isSignedIn) return;
  //   const idleDuration = 300 * 1000;
  //   let timeout;
  //   timeout = setTimeout(() => {
  //     onOpenSessionTimeoutModal();
  //   }, idleDuration);
  //   const resetTimeout = () => {
  //     clearTimeout(timeout);
  //     timeout = setTimeout(() => {
  //       onOpenSessionTimeoutModal();
  //     }, idleDuration);
  //   };
  //   window.addEventListener("scroll", resetTimeout);
  //   window.addEventListener("click", resetTimeout);
  //   window.addEventListener("load", resetTimeout);
  //   return () => {
  //     window.removeEventListener("scroll", resetTimeout);
  //     window.removeEventListener("click", resetTimeout);
  //     window.removeEventListener("load", resetTimeout);
  //     if (timeout > -1) {
  //       clearTimeout(timeout);
  //     }
  //   };
  // }, [isSignedIn, signOut]);



  // useEffect(() => {
  //   if (counter > 6) {
  //     userLogout();
  //     signOut();
  //   }
  // }, [counter]);

  const authValues = useMemo(() => {
    return { isSignedIn, loading, signIn, signOut, enumTypes, userData, userDetails };
  }, [isSignedIn, loading, signIn, signOut, enumTypes, userData, userDetails]);

  return (
    <>
      <AuthContext.Provider value={authValues}>
        {loading ? (
          <ShowLoader />
        ) : (
          (isSignedIn || UNAUTH_ROUTES.includes(pathname)) && children
        )}
      </AuthContext.Provider>

      {/* <SessionTimeoutModal
        nonGlobal
        open={isOpenSessionTimeoutModal}
        onClose={onCloseSessionTimeoutModal}
        data={userData}
        message="Sorry, your session has expired. Kindly login to continue."
        onClickDone={() => {
          onCloseSessionTimeoutModal();
          signOut();
        }}
      /> */}
    </>
  );
};

export default AuthContextProvider;
