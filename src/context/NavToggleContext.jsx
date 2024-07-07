"use client";
import React, { useState, useCallback, useMemo } from "react";
import adminPathList from "../helpers/adminPathList";

const initialDropdownState = {};

adminPathList.forEach((path) => {
  if (path.dropdown) {
    initialDropdownState[path.label] = false;
  }
});

export const Context = React.createContext({});

export const NavToggleProvider = ({ children }) => {
  const [dropdowns, setDropdowns] = useState(initialDropdownState);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openNavDropdown = useCallback((label) => {
    setDropdowns((prev) => ({
      ...prev,
      [label]: true,
    }));
  }, []);

  const closeNavDropdown = useCallback((label) => {
    setDropdowns((prev) => ({
      ...prev,
      [label]: false,
    }));
  }, []);

  const toggleNavDropdown = useCallback((label) => {
    setDropdowns((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  }, []);

  const closeAllNavDropdowns = useCallback(() => {
    setDropdowns(initialDropdownState);
  }, []);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  const openSidebar = useCallback(() => setSidebarOpen(true), []);

  const toggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), []);

  const useNavToggleValues = useMemo(() => {
    return {
      openNavDropdown,
      closeNavDropdown,
      toggleNavDropdown,
      closeAllNavDropdowns,
      dropdowns,
      toggleSidebar,
      openSidebar,
      closeSidebar,
      sidebarOpen,
    };
  }, [
    openNavDropdown,
    closeNavDropdown,
    toggleNavDropdown,
    closeAllNavDropdowns,
    dropdowns,
    toggleSidebar,
    openSidebar,
    closeSidebar,
    sidebarOpen,
  ]);

  return <Context.Provider value={useNavToggleValues}>{children}</Context.Provider>;
};
