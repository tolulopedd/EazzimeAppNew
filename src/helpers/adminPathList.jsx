import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineBarChart } from "react-icons/ai";
import { FaMoneyBill, FaUserCog } from "react-icons/fa";
import { MdCloudUpload } from "react-icons/md";
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';

const adminPathList = [
  {
    title: "Dashboard",
    icon: <MdOutlineDashboard />,
    path: "/admin/dashboard",
  },

  {
    title: "Fund Requests",
    icon: <FaMoneyBill />,
    path: "/admin/fund-requests",
  },
  {
    title: "Manage Partners",
    icon: <FaUserCog />,
    path: "/admin/manage-partners",
  },
  {
    title: "Transaction History",
    icon: <AiOutlineBarChart />,
    path: "/admin/transaction-history",
  },
  {
    title: "Spent File Management",
    icon: <RequestQuoteOutlinedIcon />,
    path: "/admin/spent-file-management",
  },
  {
    title: "Upload Employee",
    icon: <MdCloudUpload />,
    path: "/admin/upload-employee",
  },
];

export default adminPathList;
