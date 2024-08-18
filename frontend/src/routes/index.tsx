import { createBrowserRouter } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes.tsx';
import AdminRoutes from './AdminRoutes.tsx';

import createRoutesPrivate from '../middlewares/createRoutesPrivate.tsx';


// ==============================|| ROUTING RENDER ||============================== //
const router = createBrowserRouter([MainRoutes, createRoutesPrivate(AdminRoutes)]);

export default router;
