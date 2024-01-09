import {createBrowserRouter, createRoutesFromElements, Route,} from "react-router-dom";
import Home from "../landing/Home";
import Login from "../account/features/auth/features/login/Login";
import MainLayout from "./features/layout/components/main_layout/MainLayout";
import ErrorPage from "./components/ErrorPage";
import AuthLayout from "./features/layout/components/main_layout/layouts/auth_layout/AuthLayout";
import Register from "../account/features/auth/features/register/Register";
import Activation from "../account/features/auth/features/activation/Activation";
import Account from "../account/Account";
import ProtectedRoute from "./components/ProtectedRoute";
import AccountSettings from "../account/features/content/features/settings/AccountSettings";
import AccountCommissions from "../account/features/content/features/commissions/AccountCommissions";
import AccountAdmin from "../account/features/content/features/admin/AccountAdmin";
import AccountPersonal from "../account/features/content/features/personal/AccountPersonal";
import AddCommission from "../account/features/content/features/adding_commission/AddCommission";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout/>} errorElement={<ErrorPage/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="/auth" element={<AuthLayout/>}>
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="activation" element={<Activation/>}/>
            </Route>
            <Route path="account"
                   element={
                       <ProtectedRoute>
                           <Account/>
                       </ProtectedRoute>
                   }>
                <Route path={""} element={<AccountSettings/>}/>
                <Route path={"settings"} element={<AccountSettings/>}/>
                <Route path={"personal"} element={<AccountPersonal/>}/>
                <Route path={"commissions"} element={<AccountCommissions/>}/>
                <Route path={"administrator"} element={<AccountAdmin/>}/>
                <Route path={"add_commission"} element={<AddCommission/>}/>
            </Route>
        </Route>,
    ),
);

export default router;