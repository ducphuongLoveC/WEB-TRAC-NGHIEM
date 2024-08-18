import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../header/index.tsx";
import Sidebar from "../Sidebar/index.tsx";
import './DefaultAdmin.css';
import Breadcrumbs from "../../../components/Breadcrumbs/index.tsx";
const DefaultAdmin: React.FC = () => {
    return (
        <>
            <Header />
            <div className="main-content">
                <Sidebar />
                <div style={{ width: '100%', background: '#fbfcfd'}}>
                <   Breadcrumbs/>
                    <Outlet />
                </div>
            </div>
        </>
    )
}
export default DefaultAdmin;