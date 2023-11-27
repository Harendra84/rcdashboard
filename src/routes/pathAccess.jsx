import { BsGridFill, BsPersonAdd } from "react-icons/bs";

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
    name: "RcCenter",
    link: "/admin-dashboard/rccenter",
    iconName: <BsPersonAdd className='icon' />
  },
  {
    name: "Parameters",
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
    name: "Parameters",
    link: "/ceo-dashboard/publicationstype",
    iconName: <BsPersonAdd className='icon' />
  },
  {
    name: "Performances",
    link: "/ceo-dashboard/publications",
    iconName: <BsGridFill className='icon' />
  },
]
export const CoordinatorAccess = [
  {
    name: "Dashboard",
    link: "/coordinator-dashboard",
    iconName: <BsGridFill className='icon' />
  },
  {
    name: "Parameters",
    link: "/coordinator-dashboard/publicationstype",
    iconName: <BsPersonAdd className='icon' />
  },
  {
    name: "Performances",
    link: "/coordinator-dashboard/publications",
    iconName: <BsGridFill className='icon' />
  },
]
export const ManagerAccess = [
  {
    name: "Dashboard",
    link: "/manager-dashboard",
    iconName: <BsGridFill className='icon' />
  },
  {
    name: "Parameters",
    link: "/manager-dashboard/publicationstype",
    iconName: <BsPersonAdd className='icon' />
  },
  {
    name: "Performances",
    link: "/manager-dashboard/publications",
    iconName: <BsPersonAdd className='icon' />
  },
]
