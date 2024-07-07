import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineBarChart } from "react-icons/ai";
import { FaUserCog } from "react-icons/fa";

const partnerPathList = [
  {
    title: "Dashboard",
    icon: <MdOutlineDashboard/>,
    path: "/partner/dashboard",
  },

  {
    title: "Manage Employees",
    icon: <FaUserCog/>,
    path: "/partner/manage-employees",
  },

  {
    title: "Transactions",
    icon: <AiOutlineBarChart/>,
    path: "/partner/transactions",
  },
];

export default partnerPathList;
