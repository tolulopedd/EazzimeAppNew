"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const openModalSlice = createSlice({
  name: "openModals",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isClose = false;
    },
  },
});

export const { openModal, closeModal } = openModalSlice.actions;

export default openModalSlice.reducer;
