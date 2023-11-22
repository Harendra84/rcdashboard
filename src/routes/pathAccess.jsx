import {BsGridFill, BsPersonAdd } from "react-icons/bs";

export const AdminAccess = [
  {
    name: "Dashboard",
    link: "/admin-dashboard",
    iconName: <BsGridFill className='icon' />
  },
  {
    name: "User",
    link: "/admin-dashboard/user",
    iconName: <BsPersonAdd className='icon' />
  },
  {
    name: "Rc Center",
    link: "/admin-dashboard/rccenter",
    iconName: <BsPersonAdd className='icon' />
  },
  {
    name: "Publications Type",
    link: "/admin-dashboard/publicationstype",
    iconName: <BsPersonAdd className='icon' />
  },
]
export const CeoAccess = [
  {
    name: "Dashboard",
    link: "/ceo-dashboard",
    iconName: <BsGridFill className='icon' />
  },
  {
    name: "Publications",
    link: "/ceo-dashboard/publications",
    iconName: <BsGridFill className='icon' />
  },
]
export const CoordinatorAccess = [
  {
    name: "DashBoard",
    link: "/coordinator-dashboard",
    iconName: <BsGridFill className='icon' />
  },
  {
    name: "Publications",
    link: "/coordinator-dashboard/publications",
    iconName: <BsGridFill className='icon' />
  },
]
