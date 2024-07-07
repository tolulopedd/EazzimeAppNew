import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  openLoader,
  closeLoader,
} from "@/lib/features/loaderSlice/loaderSlice";

const ShowLoader = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(openLoader());
    return () => {
      dispatch(closeLoader());
    };
  }, [dispatch]);

  return null;
};

export default ShowLoader;
