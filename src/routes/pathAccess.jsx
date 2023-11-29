import { PiChatCenteredText } from "react-icons/pi";
import { MdDashboard } from "react-icons/md";
import {BsPersonAdd } from "react-icons/bs";
import { FcSalesPerformance } from "react-icons/fc";
import { RiNumbersLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";

export const AdminAccess = [
  {
    name: "Dashboard",
    link: "/admin-dashboard",
    iconName: <MdDashboard  className='icon' />
  },
  {
    name: "User",
    link: "/admin-dashboard/user",
    iconName: <BsPersonAdd className='icon' />
  },
  {
    name: "RC Center",
    link: "/admin-dashboard/rccenter",
    iconName: <PiChatCenteredText  className='icon' />
  },
  {
    name: "Parameter",
    link: "/admin-dashboard/publicationstype",
    iconName: <RiNumbersLine className='icon' />
  },
  {
    name: "Profile",
    link: "/admin-dashboard/profile",
    iconName: <FaUserCircle className='icon' />
  },
]
export const CeoAccess = [
  {
    name: "Dashboard",
    link: "/ceo-dashboard",
    iconName: <MdDashboard  className='icon' />
  },
  {
    name: "Performance",
    link: "/ceo-dashboard/publications",
    iconName: <FcSalesPerformance className='icon' />
  },
  {
    name: "Profile",
    link: "/ceo-dashboard/profile",
    iconName: <FaUserCircle className='icon' />
  },
]
export const CoordinatorAccess = [
  {
    name: "Dashboard",
    link: "/coordinator-dashboard",
    iconName: <MdDashboard  className='icon' />
  },
  {
    name: "Performance",
    link: "/coordinator-dashboard/publications",
    iconName: <FcSalesPerformance  className='icon' />
  },
  {
    name: "Profile",
    link: "/coordinator-dashboard/profile",
    iconName: <FaUserCircle className='icon' />
  },
]
export const ManagerAccess = [
  {
    name: "Dashboard",
    link: "/manager-dashboard",
    iconName: <MdDashboard  className='icon' />
  },
  {
    name: "Parameter",
    link: "/manager-dashboard/publicationstype",
    iconName: <RiNumbersLine className='icon' />
  },
  {
    name: "Performance",
    link: "/manager-dashboard/publications",
    iconName: <FcSalesPerformance className='icon' />
  },
  {
    name: "Profile",
    link: "/manager-dashboard/profile",
    iconName: <FaUserCircle className='icon' />
  },
]
