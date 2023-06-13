import { Route, Routes, Navigate } from 'react-router-dom'
import { useContext } from 'react';


import EximDashboardPage from './Pages/DashboardPages/EximDashboard/EximDashboardPage';
import Importer from "./Pages/DashboardPages/EximDashboard/Components/Importer/Importer"


import LoginPage from './Pages/LoginPage/LoginPage';
import AuthContext, { UserTypes } from './Context/auth-context';
import PagesPath from './Constants/PagesPath';

const RouterComponent = () => {
    const ctx = useContext(AuthContext)
    let currentDashboardPage = null
    console.log(ctx.userType);
    switch (ctx.userType) {
        case UserTypes.CNCUSER:
            currentDashboardPage = <EximDashboardPage />
            break;
       
        default:
            currentDashboardPage = <InvalidUser />
    }

    return (
        <Routes>

            <Route path={PagesPath.HomePage} element={
                ctx.isLoggedIn ? <Navigate to={PagesPath.DashboardPage} /> : <Navigate to={PagesPath.LoginPage} />}
            />

            <Route path={PagesPath.LoginPage} element={
                ctx.isLoggedIn ? <Navigate to={PagesPath.DashboardPage} /> : <LoginPage />}
            />

            <Route path={PagesPath.DashboardPage} element={
                ctx.isLoggedIn ? currentDashboardPage : <Navigate to={PagesPath.LoginPage} />}
            />

        </Routes>
    )
}

const InvalidUser = () => {

    return <EximDashboardPage />
}

export default RouterComponent;