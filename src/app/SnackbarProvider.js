"use client";
import React from 'react';
import { SnackbarProvider } from 'notistack';

const SnackbarProviders = ({children}) => {
  return (
    <SnackbarProvider>
      {children}
    </SnackbarProvider>
  )
}

export default SnackbarProviders
