import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineBarChart } from "react-icons/ai";
import { FaMoneyBill } from "react-icons/fa";

const employeePathList = [
  {
    title: "Dashboard",
    icon: <MdOutlineDashboard />,
    path: "/employee/dashboard",
  },

  {
    title: "Request Fund",
    icon: <FaMoneyBill />,
    path: "/employee/request-fund",
  },

  {
    title: "Transactions",
    icon: <AiOutlineBarChart />,
    path: "/employee/transaction-history",
  },
];

export default employeePathList;
