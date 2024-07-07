import React from "react";
import Viewport from "@/components/ViewPort/ViewPort";
import TransactionHistory from "@/containers/Employees/TransactionHistory";

const EmployeeDashboardPage = () => {
  return (
    <Viewport>
      <TransactionHistory />
    </Viewport>
  );
};

export default EmployeeDashboardPage;
