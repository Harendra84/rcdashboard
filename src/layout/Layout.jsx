import Header from "../components/Header";
import Sidebar from '../components/Sidebar';
import { useState } from "react";
import PropTypes from 'prop-types'
import Footer from "@/components/Footer";

const Layout = ({ accessRoutes, children }) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50/50">
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} accessRoutes={accessRoutes} />
        <div className="p-4 xl:ml-80">
          <Header OpenSidebar={OpenSidebar} openSidebarToggle={openSidebarToggle} />
          {children}
          <div className="fixed bottom-0 text-blue-gray-600">
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  accessRoutes: PropTypes.array.isRequired
}

export default Layout;
