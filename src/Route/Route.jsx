import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login and Register/Login";
import Register from "../pages/Login and Register/Register";
import CreateShop from "../Component/CreateShop/CreateShop";
import ErrorPage from "../Component/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import Added from "../Layout/Dashbord/ShopManager/Added/Added";
import Dashboard from "../Layout/Dashbord/Dashboard";
import AddItem from "../Layout/Dashbord/ShopManager/Added/AddItem";
import Product from "../Layout/Dashbord/ShopManager/allProduct/Product";
import Update from "../Layout/Dashbord/ShopManager/updateProduct/Update";
import Product_Section from "../Layout/Dashbord/ShopManager/Sales-Collection/Product_Section";
import CheckOut from "../Layout/Dashbord/ShopManager/checkOut/CheckOut";
import Subscription from "../Layout/Dashbord/Subcribtion/Subscription";
import Payment from "../Layout/Dashbord/Subcribtion/PAyment/Payment";
import Summary from "../Layout/Dashbord/ShopManager/Sales Summary/Summary";
import Manage from "../Layout/Dashbord/Admin/Manage User/Manage";
import Admin_Summary from "../Layout/Dashbord/Admin/Summary/Admin_Summary";
import AdminRoute from "./AdminRoute";
import ShopAdminRoute from "./ShopAdminRoute";
import LiveChatRoom from "../Component/LiveChatRoom/LiveChatRoom";





const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home /> ,
        },
        {
          path: "/login",
          element: <Login /> ,
        },
        {
          path: "/register",
          element: <Register></Register> ,
        },
        {
          path: "/CreateShop",
          element: <PrivateRoute><CreateShop /></PrivateRoute>,
        },
      ],
    },
    
    // dashboard route
    {
      path:"/dashboard" ,
      element: <Dashboard />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/dashboard',
          element: <ShopAdminRoute><Added /></ShopAdminRoute>,
        },
        {
          path: '/dashboard/added',
          element: <ShopAdminRoute><AddItem /></ShopAdminRoute>,
        },
        {
          path: '/dashboard/product',
          element: <ShopAdminRoute><Product /></ShopAdminRoute>,
        },
        {
          path: `/dashboard/updateProduct/:id`,
          element: <ShopAdminRoute><Update /></ShopAdminRoute>,
        },
        {
          path: '/dashboard/Collection',
          element: <ShopAdminRoute><Product_Section /></ShopAdminRoute>,
        },
        {
          path: '/dashboard/checkOut',
          element: <ShopAdminRoute><CheckOut /></ShopAdminRoute>,
        },
        {
          path: '/dashboard/subscription',
          element: <ShopAdminRoute><Subscription /></ShopAdminRoute>,
        },
        {
          path: '/dashboard/subscription/:money',
          element: <ShopAdminRoute><Payment /></ShopAdminRoute> ,
        },
        {
          path: '/dashboard/Summary',
          element: <ShopAdminRoute><Summary /></ShopAdminRoute> ,
        },
        {
          path: '/dashboard/Room',
          element: <ShopAdminRoute><LiveChatRoom /></ShopAdminRoute> ,
        },
        
        // Admin section
        {
          path: '/dashboard/manage',
          element: <AdminRoute><Manage /></AdminRoute> ,
        },
        {
          path: '/dashboard/admin/Summary',
          element: <AdminRoute><Admin_Summary /></AdminRoute> ,
        },
        {
          path: '/dashboard/admin/Room',
          element: <AdminRoute><LiveChatRoom /></AdminRoute> ,
        },
       
      ]
    },
  ]);

  export default router ;