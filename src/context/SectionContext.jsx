"use client";

import React, { useMemo, useState, useEffect } from "react";
import adminPathList from "../helpers/adminPathList";
import employeePathList from "@/helpers/employeePathList";
import partnerPathList from "@/helpers/partnerPathList";
import { usePathname, useRouter } from "next/navigation";

export const SectionContext = React.createContext({});

export const SectionProvider = ({ children }) => {
  const [section, setSection] = useState("");
  const [loadingSection, setLoadingSection] = useState(true);
  const router = useRouter();
  const path = usePathname();


  useEffect(() => {
    const splitUrl = path?.split("/");
    if (splitUrl?.[1] !== section) {
      setSection(splitUrl?.[1]);
    }
    setLoadingSection(false);
  }, [path, section]);


  const getPathList = useMemo(
    () => () => {
      switch (section) {
        case "admin":
          return adminPathList;
        case "employee":
          return employeePathList;
        case "partner":
          return partnerPathList;
        default:
          return employeePathList;
      }
    },
    [section]
  );

  const switchSection = (sectionName) => setSection(sectionName);

  const sectionValues = useMemo(() => {
    return { getPathList, switchSection, section, loadingSection };
  }, [getPathList, switchSection, section, loadingSection]);

  return (
    <SectionContext.Provider value={sectionValues}>
      {children}
    </SectionContext.Provider>
  );
};
