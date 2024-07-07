"use client";
import { useContext } from "react";
import {Context as NavToggleContext} from "../context/NavToggleContext"
export const useNavToggle = () => useContext(NavToggleContext)