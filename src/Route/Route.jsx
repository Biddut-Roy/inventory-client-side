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





const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home></Home> ,
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
       
      ]
    },
  ]);

  export default router ;