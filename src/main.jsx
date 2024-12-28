import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './Root';
import Home from './pages/Home';
import ServiceDetails from './pages/ServiceDetails';
import Checkout from './pages/Checkout';
import Authentication from './pages/Authentication';
import AuthProvider from './provider/AuthProvider';
import PrivateRoute from './provider/PrivateRoute';
import CartDetails from './pages/CartDetails';
import AllUserOrders from './pages/AllUserOrders';
import AdminRoute from './provider/AdminRoute';
import AddService from './pages/AddService';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/serviceDetails/:id",
        element: <PrivateRoute><ServiceDetails /></PrivateRoute>
      },
      {
        path: "/checkout/:id",
        element: <PrivateRoute><Checkout /></PrivateRoute>
      },
      {
        path: "/cartDetails",
        element: <PrivateRoute><CartDetails/></PrivateRoute>
      },
      
      {
        path: "/allUserOrders",
        element: <AdminRoute><AllUserOrders/></AdminRoute>
      },
      {
        path: "/addService",
        element: <AdminRoute><AddService/></AdminRoute>
      },
      

    ]
  },
  {
    path: '/auth',
    element: <Authentication />
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
