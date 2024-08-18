import { useLocation } from 'react-router-dom';
import { lazy } from 'react';
import Loadable from '../ui-component/Loadable.jsx';

// ==============================|| MAIN ROUTING ||============================== //

import Default from '../layout/client/Default/Default.tsx';

const UtilsHome = Loadable(lazy(() => import('../page/Home/Home.tsx')));
const UtilsSubject = Loadable(lazy(() => import('../page/Subject/index.tsx')));
const UtilsExam = Loadable(lazy(() => import('../page/Exam/index.tsx')));
const UtilsTest = Loadable(lazy(() => import('../page/Test/index.tsx')));

const MainRoutes = {

    path: '/', element: <Default />,
    children: [
        {
            path: '/', element: <UtilsHome />
        },
        {
            path: 'subject/:slug', element: <UtilsSubject />
        },
        {
            path: 'exam/:slug/:slug', element: <UtilsExam />
        },
        {
            path: 'test/', element: <UtilsTest />
        }
    ]
};

export default MainRoutes;
