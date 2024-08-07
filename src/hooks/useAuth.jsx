import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const { isSignedIn, loading, signIn, signOut, enumTypes, userData, userDetails} =
    useContext(AuthContext);

  return {
    isSignedIn,
    loading,
    signIn,
    signOut,
    enumTypes,
    userData,
    userDetails
  };
};
