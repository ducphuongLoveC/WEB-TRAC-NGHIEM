// Import statements go first
import React from 'react';
import Loadable from '../ui-component/Loadable.jsx';
import { lazy } from 'react';
import DefaultAdmin from '../layout/admin/DefaultAdmin/index.tsx';
import { routesAdmin } from '../config/routeConfig.ts';

const UtilsTest = Loadable(lazy(() => import('../page/admin/Tests/index.tsx')));
const UtilsViewTests = Loadable(lazy(() => import('../page/admin/ViewsTests/index.tsx')));


const AdminRoutes = {
    path: '/admin',
    element: <DefaultAdmin />,
    children: [
        {
            path: '',
            element: <h2>Dashboard</h2> 
        },
        {
            path: routesAdmin.tests,
            element: <UtilsTest />
        },
        {
            path: routesAdmin.viewsTests,
            element: <UtilsViewTests />
        },
        {
            path: 'product',
            element: <h2>Admin Product</h2> 
        }
    ]
    
};

export default AdminRoutes;
