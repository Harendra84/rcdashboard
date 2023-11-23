import { Navigate, Route } from "react-router-dom";
import UnAuthGuard from "../guards/UnAuthGuards";
import Login from "../login/Login";
import Forget from "@/login/forget";

const UnAuthRoutes = [
    <Route key="Redirect" path="/" element={<UnAuthGuard component={<Navigate to={'/login'} />} />} ></Route>,
    <Route key="Login" path="/login" element={<UnAuthGuard component={<Login />} />} ></Route>,
    <Route key="Forget" path="/forget" element={< UnAuthGuard component={<Forget/>} />}></Route>
]

export default UnAuthRoutes;