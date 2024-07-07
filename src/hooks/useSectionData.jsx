"use client";
import { useContext } from "react";
import { SectionContext } from "@/context/SectionContext";
export const useSectionData = () => {
  const { getPathList, switchSection, section, loadingSection } =
    useContext(SectionContext);
  return {
    getPathList,
    switchSection,
    section,
    loadingSection,
  };
};
