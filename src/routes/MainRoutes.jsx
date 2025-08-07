import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import { Navigate } from 'react-router-dom';

// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/dashboard',
  element: <DashboardLayout />,
  children: [
    { path: '', element: <Navigate to="/dashboard/default" replace /> },
    { path: 'default', element: <DashboardDefault /> }
  ]
};

export default MainRoutes;
