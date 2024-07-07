"use client";
import { UiTriggersContext } from "../context/UiTriggersContext"
import { useContext } from "react"

export const useLoader = () => {
  const {displayLoader, hideLoader, toggleLoader, showLoader} = useContext(UiTriggersContext)
  return {displayLoader, hideLoader, toggleLoader, showLoader}
}