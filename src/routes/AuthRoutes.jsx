import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import AuthGuard from "../guards/AuthGuards";
import Error from "../error/Error";

import { AdminAccess, CeoAccess, CoordinatorAccess, ManagerAccess } from './pathAccess';
import Layout from "@/layout/Layout";
import AdminDashboard from "@/views/admin/Dashboard/AdminDashboard";
import AdminUser from "@/views/admin/User/AdminUser";
import UpdateViewAdminUser from "@/views/admin/User/updateview/UpdateViewAdminUser";
import AdminRcCenter from "@/views/admin/RcCenter/AdminRcCenter";
import UpdateViewAdminRcCenter from "@/views/admin/RcCenter/updateview/UpdateViewAdminRcCenter";
import AdminPublicationsType from "@/views/admin/PublicationsType/AdminPublicationsType";
import UpdateViewAdminPublicationsType from "@/views/admin/PublicationsType/updateview/UpdateViewAdminPublicationsType";

import CeoDashboard from "@/views/ceo/Dashboard/CeoDashboard";
import CeoPublications from "@/views/ceo/Publications/CeoPublications";
import UpdateViewCeoPublications from "@/views/ceo/Publications/updateview/UpdateViewCeoPublications";

import CoordinatorDashboard from "@/views/coordinator/Dashboard/CoordinatorDashboard";
import CoordinatorPublications from "@/views/coordinator/Publications/CoordinatorPublications";
import UpdateViewCoordinatorPublications from "@/views/coordinator/Publications/updateview/UpdateViewCoordinatorPublications";

import ManagerDashboard from "@/views/Manager/Dashboard/ManagerDashboard";
import ManagerPublicationsType from "@/views/Manager/PublicationType/ManagerPublicationsType";
import ManagerPublications from "@/views/Manager/Publications/ManagerPublications";
import Profile from "@/components/Profile";

const AuthRoutes = [

  <Route key="Dashboard" path="/admin-dashboard/*" element={<AuthGuard component={
    <React.Fragment>
      <Layout accessRoutes={AdminAccess}>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/user" element={<AdminUser />} />
          <Route path="/user/manage/:userId" element={<UpdateViewAdminUser />} />
          <Route path="/rccenter" element={<AdminRcCenter />} />
          <Route path="/rccenter/manage/:rcCenterId" element={<UpdateViewAdminRcCenter />} />
          <Route path="/publicationstype" element={<AdminPublicationsType />} />
          <Route path="/publicationstype/manage/:publicationsTypeId" element={<UpdateViewAdminPublicationsType />} />
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </Layout>
    </React.Fragment>
  } />} />,

  <Route key="Ceo" path="/ceo-dashboard/*" element={<AuthGuard component={
    <React.Fragment>
      <Layout accessRoutes={CeoAccess}>
        <Routes>
          <Route path="/" element={<CeoDashboard />} />
          <Route path="/publications" element={<CeoPublications />} />
          <Route path="/publications/manage/:publicationsId" element={<UpdateViewCeoPublications />} />
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </Layout>
    </React.Fragment>
  } />} />,

  <Route key="Coordinator" path="/coordinator-dashboard/*" element={<AuthGuard component={
    <React.Fragment>
      <Layout accessRoutes={CoordinatorAccess}>
        <Routes>
          <Route path="/" element={<CoordinatorDashboard />} />
          <Route path="/publications" element={<CoordinatorPublications />} />
          <Route path="/publications/manage/:publicationsId" element={<UpdateViewCoordinatorPublications />} />
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </Layout>
    </React.Fragment>
  } />} />,

  <Route key="Manager" path="/manager-dashboard/*" element={<AuthGuard component={
    <React.Fragment>
      <Layout accessRoutes={ManagerAccess}>
        <Routes>
          <Route path="/" element={<ManagerDashboard />} />
          <Route path="/publicationstype" element={<ManagerPublicationsType />} />
          <Route path="/publications" element={<ManagerPublications />} />
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </Layout>
    </React.Fragment>
  } />} />,

  <Route key={"404"} path="*" element={<Error />} />
]
export default AuthRoutes;