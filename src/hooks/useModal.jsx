"use client";
import { UiTriggersContext } from "../context/UiTriggersContext"
import { useContext } from "react"

export const useModal = () => {
  const {displayModal, hideModal, toggleModal, showModal} = useContext(UiTriggersContext)
  return {displayModal, hideModal, toggleModal, showModal}
}