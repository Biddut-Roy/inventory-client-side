import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login and Register/Login";
import Register from "../pages/Login and Register/Register";
import CreateShop from "../Component/CreateShop/CreateShop";





const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
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
          element: <CreateShop></CreateShop> ,
        },

      ],
    },
  ]);

  export default router ;