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
          element: <Added />,
        },
        {
          path: '/dashboard/added',
          element: <AddItem />,
        },
        {
          path: '/dashboard/product',
          element: <Product />,
        },
        {
          path: `/dashboard/updateProduct/:id`,
          element: <Update />,
        },
        {
          path: '/dashboard/Collection',
          element: <Product_Section />,
        },
        {
          path: '/dashboard/checkOut',
          element: <CheckOut />,
        },
        {
          path: '/dashboard/subscription',
          element: <Subscription />,
        },
        {
          path: '/dashboard/subscription/:money',
          element: <Payment /> ,
        },
        {
          path: '/dashboard/Summary',
          element: <Summary /> ,
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
       
      ]
    },
  ]);

  export default router ;