import React from 'react';
import Header from '../header/header.tsx';
import Footer from '../footer/footer.tsx';
import { Outlet, useLocation } from 'react-router-dom'; // Sử dụng useLocation ở đây

import './Default.css';

const Default: React.FC = () => {
    const location = useLocation(); // Sử dụng useLocation trong component này

    return (
        <div key={location.key}>
            <Header />
            <div className="container">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Default;
